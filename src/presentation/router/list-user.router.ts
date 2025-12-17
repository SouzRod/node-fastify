import { CacheRepository, UserRepository } from "@/infrastructure/repository";
import { ListUsersController } from "../controller/list-users.controller";
import { ListUsersImpl } from "@/application/useCase";

const cacheRepository = new CacheRepository();
const userRepository = new UserRepository();

export const listUsersRouter = {
  url: "/users",
  method: "GET",
  handler: (request: any, reply: any) => {
    const listUsersUseCase = new ListUsersImpl(userRepository, cacheRepository);
    return new ListUsersController(listUsersUseCase).handle(request, reply);
  },
  schema: {
    description: 'Rota para obter uma lista de usuários',
    tags: ["Users"],
  },
};