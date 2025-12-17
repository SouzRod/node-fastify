import { HttpStatus } from "@/domain/enum/http-status.enum";
import { ListUsers } from "@/domain/interfaces";

export class ListUsersController {
  constructor(
    private readonly listUsersUseCase: ListUsers,
  ) { }

  async handle(request: any, reply: any): Promise<any> {
    const result = await this.listUsersUseCase.execute();
    return reply.status(HttpStatus.OK).send(result);
  }
}