import { HttpStatus } from "@/domain/enum/http-status.enum";
import { GetUser } from "@/domain/interfaces";

export class GetUserController {
  constructor(
    private readonly getUserUseCase: GetUser,
  ) { }

  async handle(request: any, reply: any): Promise<any> {
    const { id } = request.params;
    const result = await this.getUserUseCase.execute(id);
    return reply.status(HttpStatus.OK).send(result);
  }
}