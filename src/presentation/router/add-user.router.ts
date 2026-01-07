import { UserRepository } from "@/infrastructure/repository";
import { AddUserImpl } from "@/application/useCase";

const userRepository = new UserRepository();

export const addUserRouter = {
  url: "/users",
  method: "POST",
  handler: (request: any, reply: any) => {
    const addUserUseCase = new AddUserImpl(userRepository);
    return addUserUseCase.execute(request.body)
  },
  schema: {
    description: 'Rota para adicionar um novo usuário',
    tags: ["Users"],
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