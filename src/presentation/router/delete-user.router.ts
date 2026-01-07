import { UserRepository } from "@/infrastructure/repository";
import { DeleteUserImpl } from "@/application/useCase";

const userRepository = new UserRepository();

export const deleteUserRouter = {
  url: "/users/:id",
  method: "DELETE",
  handler: (request: any, reply: any) => {
    const deleteUserUseCase = new DeleteUserImpl(userRepository);
    return deleteUserUseCase.execute(request.params.id);
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