import { UpdateUserImpl } from "../../../src/application/useCase/update-user.usecase";
import { MongoDB, User } from "../../../src/domain/interfaces";
import { NotFoundError } from "../../../src/domain/errors";
import { ObjectId } from "mongodb";

describe("UpdateUserImpl", () => {
  let userRepositoryMock: jest.Mocked<MongoDB<User>>;
  let updateUser: UpdateUserImpl;

  beforeEach(() => {
    userRepositoryMock = {
      insertOne: jest.fn(),
      findMany: jest.fn(),
      findOne: jest.fn(),
      updateOne: jest.fn(),
      deleteOne: jest.fn(),
    } as jest.Mocked<MongoDB<User>>;

    updateUser = new UpdateUserImpl(userRepositoryMock);
  });

  it("should update the user when it exists", async () => {
    const userId = "user-id-123";

    const existingUser: User = {
      name: "Rodrigo Souza",
      email: "rodrigo@email.com",
      birthDate: "15/03/2001",
    } as User;

    const updatedUser: User = {
      name: "Rodrigo Souza",
      email: "rodrigo.novo@email.com",
      birthDate: "15/03/2001",
    } as User;

    userRepositoryMock.findOne.mockResolvedValueOnce({ ...existingUser, _id: new ObjectId('69423f6adbefbba8a17c2ee0') });

    const result = await updateUser.execute(userId, updatedUser);

    expect(userRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.findOne).toHaveBeenCalledWith({ _id: userId });

    expect(userRepositoryMock.updateOne).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.updateOne).toHaveBeenCalledWith(
      { _id: userId },
      updatedUser,
    );

    expect(result).toEqual({
      message: "User updated successfully",
    });
  });

  it("should throw NotFoundError when user does not exist", async () => {
    const userId = "non-existing-user";

    const updatedUser = {} as User;

    userRepositoryMock.findOne.mockResolvedValueOnce(null);

    const promise = updateUser.execute(userId, updatedUser);

    await expect(promise).rejects.toBeInstanceOf(NotFoundError);
    await expect(promise).rejects.toThrow("User not found");

    expect(userRepositoryMock.updateOne).not.toHaveBeenCalled();
  });
});
