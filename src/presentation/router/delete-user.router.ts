import { DeleteUserController } from "../controller/delete-user.controller";
import { UserRepository } from "@/infrastructure/repository";
import { DeleteUserImpl } from "@/application/useCase";

const userRepository = new UserRepository();

export const deleteUserRouter = {
  url: "/users/:id",
  method: "DELETE",
  handler: (request: any, reply: any) => {
    const deleteUserUseCase = new DeleteUserImpl(userRepository);
    return new DeleteUserController(deleteUserUseCase).handle(request, reply);
  },
  schema: {
    description: 'Rota para deletar um usuário',
    tags: ["Users"],
    params: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
    },
  },
};