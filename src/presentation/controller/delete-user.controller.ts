import { HttpStatus } from "@/domain/enum/http-status.enum";
import { DeleteUser } from "@/domain/interfaces";

export class DeleteUserController {
  constructor(
    private readonly deleteUserUseCase: DeleteUser,
  ) { }

  async handle(request: any, reply: any): Promise<any> {
    const { id } = request.params;
    const result = await this.deleteUserUseCase.execute(id);
    return reply.status(HttpStatus.OK).send(result);
  }
}