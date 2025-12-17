import { User } from "./user.interface";

export interface AddUser {
  execute(input: User): Promise<{ message: string }>;
}