import { ListUsersImpl } from "../../../src/application/useCase/list-users.usecase";
import { MongoDB, User, Cache, WithId } from "../../../src/domain/interfaces";

describe("ListUsersImpl", () => {
  let userRepositoryMock: jest.Mocked<MongoDB<User>>;
  let cacheRepositoryMock: jest.Mocked<Cache>;
  let listUsers: ListUsersImpl;

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

    listUsers = new ListUsersImpl(userRepositoryMock, cacheRepositoryMock);
  });

  it("should return users from cache when cache exists", async () => {
    const cachedUsers: WithId<User>[] = [
      {
        name: "Rodrigo Souza",
        email: "rodrigo@email.com",
        birthDate: "15/03/2001",
      },
      {
        name: "Maria Silva",
        email: "maria@email.com",
        birthDate: "20/08/1998",
      },
    ] as WithId<User>[];

    cacheRepositoryMock.get.mockResolvedValueOnce(
      JSON.stringify(cachedUsers),
    );

    const result = await listUsers.execute();

    expect(cacheRepositoryMock.get).toHaveBeenCalledTimes(1);
    expect(cacheRepositoryMock.get).toHaveBeenCalledWith("list-users");

    expect(userRepositoryMock.findMany).not.toHaveBeenCalled();
    expect(cacheRepositoryMock.set).not.toHaveBeenCalled();

    expect(result).toEqual(cachedUsers);
  });

  it("should get users from repository and cache them when cache does not exist", async () => {
    const usersFromDb: WithId<User>[] = [
      {
        name: "Rodrigo Souza",
        email: "rodrigo@email.com",
        birthDate: "15/03/2001",
      },
    ] as WithId<User>[];

    cacheRepositoryMock.get.mockResolvedValueOnce(null);
    userRepositoryMock.findMany.mockResolvedValueOnce(usersFromDb);

    const result = await listUsers.execute();

    expect(cacheRepositoryMock.get).toHaveBeenCalledTimes(1);
    expect(cacheRepositoryMock.get).toHaveBeenCalledWith("list-users");

    expect(userRepositoryMock.findMany).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.findMany).toHaveBeenCalledWith({});

    expect(cacheRepositoryMock.set).toHaveBeenCalledTimes(1);
    expect(cacheRepositoryMock.set).toHaveBeenCalledWith(
      "list-users",
      JSON.stringify(usersFromDb),
    );

    expect(result).toEqual(usersFromDb);
  });
});
