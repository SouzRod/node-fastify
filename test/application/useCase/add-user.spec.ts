import { AddUserImpl } from "../../../src/application/useCase/add-user.usecase";
import { MongoDB, User } from "../../../src/domain/interfaces";

describe("AddUserImpl", () => {
  let userRepositoryMock: jest.Mocked<MongoDB<User>>;
  let addUser: AddUserImpl;

  beforeEach(() => {
    userRepositoryMock = {
      insertOne: jest.fn(),
      findMany: jest.fn(),
      findOne: jest.fn(),
      updateOne: jest.fn(),
      deleteOne: jest.fn(),
    } as jest.Mocked<MongoDB<User>>;

    addUser = new AddUserImpl(userRepositoryMock);
  });

  it("should insert a user into the repository", async () => {
    const user: User = {
      name: "Rodrigo Souza",
      email: "rodrigo@email.com",
      birthDate: "15/03/2001",
    } as User;

    await addUser.execute(user);

    expect(userRepositoryMock.insertOne).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.insertOne).toHaveBeenCalledWith(user);
  });

  it("should return a success message", async () => {
    const user = {} as User;

    const result = await addUser.execute(user);

    expect(result).toEqual({
      message: "User added successfully",
    });
  });
});
