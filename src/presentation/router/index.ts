import { addUserRouter } from "./add-user.router";
import { deleteUserRouter } from "./delete-user.router";
import { getUserRouter } from "./get-user.router";
import { listUsersRouter } from "./list-user.router";
import { updateUserRouter } from "./update-user.router";

const routes = [
  addUserRouter,
  deleteUserRouter,
  getUserRouter,
  listUsersRouter,
  updateUserRouter,
];

export default (fastify: any, _opts: any, done: () => void) => {
  routes.forEach((route) => fastify.route(route));
  done();
}