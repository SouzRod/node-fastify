import { AddUserImpl } from "../../../src/application/useCase/add-user.usecase";
import { MongoDB, User, UserInput } from "../../../src/domain/interfaces";

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
      birthDate: new Date("2001-01-01"),
    } as User;

    const userInput: UserInput = {
      name: "Rodrigo Souza",
      email: "rodrigo@email.com",
      birthDate: "2001-01-01T00:00:00.000Z",
    };

    await addUser.execute(userInput);

    expect(userRepositoryMock.insertOne).toHaveBeenCalledTimes(1);
  });

  it("should return a success message", async () => {
    const user = {} as UserInput;

    const result = await addUser.execute(user);

    expect(result).toEqual({
      message: "User added successfully",
    });
  });
});
