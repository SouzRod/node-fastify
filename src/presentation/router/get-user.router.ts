import { CacheRepository, UserRepository } from "@/infrastructure/repository";
import { GetUserController } from "../controller/get-user.controller";
import { GetUserImpl } from "@/application/useCase";

const cacheRepository = new CacheRepository();
const userRepository = new UserRepository();

export const getUserRouter = {
  url: "/users/:id",
  method: "GET",
  handler: (request: any, reply: any) => {
    const getUserUseCase = new GetUserImpl(userRepository, cacheRepository);
    return new GetUserController(getUserUseCase).handle(request, reply);
  },
  schema: {
    description: 'Rota para obter um usuário',
    tags: ["Users"],
    params: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
    },
  },
};