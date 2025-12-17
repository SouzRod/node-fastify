import { User } from "./user.interface";

export interface UpdateUser {
  execute(id: string, user: User): Promise<{ message: string }>;
}