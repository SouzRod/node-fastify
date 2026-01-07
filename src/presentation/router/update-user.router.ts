import { UserRepository } from "@/infrastructure/repository";
import { UpdateUserImpl } from "@/application/useCase";

const userRepository = new UserRepository();

export const updateUserRouter = {
  url: "/v1/users/:id",
  method: "PUT",
  handler: (request: any, reply: any) => {
    const updateUserUseCase = new UpdateUserImpl(userRepository);
    return updateUserUseCase.execute(request.params.id, request.body);
  },
  schema: {
    description: 'Rota para atualizar um usuário',
    tags: ["Users"],
    params: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
    },
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string", format: "email" },
        birthDate: { type: "string", format: "date" },
      },
      required: ["name", "email", "birthDate"],
    },
  },
};