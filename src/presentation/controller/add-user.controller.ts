import { HttpStatus } from "@/domain/enum/http-status.enum";
import { AddUser } from "@/domain/interfaces";

export class AddUserController {
  constructor(
    private readonly addUserUseCase: AddUser,
  ) { }

  async handle(request: any, reply: any): Promise<any> {
    const result = await this.addUserUseCase.execute(request.body);
    return reply.status(HttpStatus.CREATED).send(result);
  }
}