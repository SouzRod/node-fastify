import { CacheRepository, UserRepository } from "@/infrastructure/repository";
import { GetUserImpl } from "@/application/useCase";

const cacheRepository = new CacheRepository();
const userRepository = new UserRepository();

export const getUserRouter = {
  url: "/users/:id",
  method: "GET",
  handler: (request: any, reply: any) => {
    const getUserUseCase = new GetUserImpl(userRepository, cacheRepository);
    return getUserUseCase.execute(request.params.id);
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