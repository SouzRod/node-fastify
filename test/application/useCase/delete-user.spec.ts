import { DeleteUserImpl } from "../../../src/application/useCase/delete-user.usecase";
import { MongoDB, User, WithId } from "../../../src/domain/interfaces";
import { NotFoundError } from "../../../src/domain/errors";

describe("DeleteUserImpl", () => {
  let userRepositoryMock: jest.Mocked<MongoDB<User>>;
  let deleteUser: DeleteUserImpl;

  beforeEach(() => {
    userRepositoryMock = {
      insertOne: jest.fn(),
      findMany: jest.fn(),
      findOne: jest.fn(),
      updateOne: jest.fn(),
      deleteOne: jest.fn(),
    } as jest.Mocked<MongoDB<User>>;

    deleteUser = new DeleteUserImpl(userRepositoryMock);
  });

  it("should delete the user when it exists", async () => {
    const userId = "user-id-123";

    userRepositoryMock.findOne.mockResolvedValueOnce({
      name: "string",
      email: "user@example.com",
      birthDate: "string"
    } as WithId<User>);
    const result = await deleteUser.execute(userId);

    expect(userRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.findOne).toHaveBeenCalledWith({ _id: userId });

    expect(userRepositoryMock.deleteOne).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.deleteOne).toHaveBeenCalledWith({ _id: userId });

    expect(result).toEqual({
      message: "User deleted successfully",
    });
  });

  it("should throw NotFoundError when user does not exist", async () => {
    const userId = "non-existing-user";

    userRepositoryMock.findOne.mockResolvedValueOnce(null);

    const promise = deleteUser.execute(userId);

    await expect(promise).rejects.toBeInstanceOf(NotFoundError);
    await expect(promise).rejects.toThrow("User not found");

    expect(userRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.findOne).toHaveBeenCalledWith({ _id: userId });

    expect(userRepositoryMock.deleteOne).not.toHaveBeenCalled();
  });
});
