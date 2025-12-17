import { GetUserImpl } from "../../../src/application/useCase/get-user.usecase";
import { MongoDB, User, Cache, WithId } from "../../../src/domain/interfaces";
import { NotFoundError } from "../../../src/domain/errors";

describe("GetUserImpl", () => {
  let userRepositoryMock: jest.Mocked<MongoDB<User>>;
  let cacheRepositoryMock: jest.Mocked<Cache>;
  let getUser: GetUserImpl;

  beforeEach(() => {
    userRepositoryMock = {
      insertOne: jest.fn(),
      findMany: jest.fn(),
      findOne: jest.fn(),
      updateOne: jest.fn(),
      deleteOne: jest.fn(),
    } as jest.Mocked<MongoDB<User>>;

    cacheRepositoryMock = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
    } as jest.Mocked<Cache>;

    getUser = new GetUserImpl(userRepositoryMock, cacheRepositoryMock);
  });

  it("should return the user from cache when cache exists", async () => {
    const userId = "user-id-123";

    const cachedUser: WithId<User> = {
      name: "Rodrigo Souza",
      email: "rodrigo@email.com",
      birthDate: "15/03/2001",
    } as WithId<User>;

    cacheRepositoryMock.get.mockResolvedValueOnce(
      JSON.stringify(cachedUser),
    );

    const result = await getUser.execute(userId);

    expect(cacheRepositoryMock.get).toHaveBeenCalledTimes(1);
    expect(cacheRepositoryMock.get).toHaveBeenCalledWith(`get-user:${userId}`);

    expect(userRepositoryMock.findOne).not.toHaveBeenCalled();
    expect(cacheRepositoryMock.set).not.toHaveBeenCalled();

    expect(result).toEqual(cachedUser);
  });

  it("should get the user from repository and cache it when cache does not exist", async () => {
    const userId = "user-id-456";

    const userFromDb: WithId<User> = {
      name: "Rodrigo Souza",
      email: "rodrigo@email.com",
      birthDate: "15/03/2001",
    } as WithId<User>;

    cacheRepositoryMock.get.mockResolvedValueOnce(null);
    userRepositoryMock.findOne.mockResolvedValueOnce(userFromDb);

    const result = await getUser.execute(userId);

    expect(cacheRepositoryMock.get).toHaveBeenCalledTimes(1);
    expect(cacheRepositoryMock.get).toHaveBeenCalledWith(`get-user:${userId}`);

    expect(userRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.findOne).toHaveBeenCalledWith({ _id: userId });

    expect(cacheRepositoryMock.set).toHaveBeenCalledTimes(1);
    expect(cacheRepositoryMock.set).toHaveBeenCalledWith(
      `get-user:${userId}`,
      JSON.stringify(userFromDb),
    );

    expect(result).toEqual(userFromDb);
  });

  it("should throw NotFoundError when user does not exist", async () => {
    const userId = "non-existing-user";

    cacheRepositoryMock.get.mockResolvedValueOnce(null);
    userRepositoryMock.findOne.mockResolvedValueOnce(null);

    const promise = getUser.execute(userId);

    await expect(promise).rejects.toBeInstanceOf(NotFoundError);
    await expect(promise).rejects.toThrow("User not found");

    expect(cacheRepositoryMock.set).not.toHaveBeenCalled();
  });
});
