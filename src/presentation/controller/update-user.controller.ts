import { HttpStatus } from "@/domain/enum/http-status.enum";
import { UpdateUser } from "@/domain/interfaces";

export class UpdateUserController {
  constructor(
    private readonly updateUserUseCase: UpdateUser,
  ) { }

  async handle(request: any, reply: any): Promise<any> {
    const { id } = request.params;
    const user = request.body;
    const result = await this.updateUserUseCase.execute(id, user);
    return reply.status(HttpStatus.OK).send(result);
  }
}