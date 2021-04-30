import { auth } from "../../middlewares/UserValidation";
import { User } from "../../models/User";
import { Context } from "../../schema/schema";

export type Resolver = {
  [key: string]: (
    prt: any,
    args: any,
    context: Context
  ) =>
    | { [key: string]: any }
    | Promise<{ [key: string]: any }>
    | Promise<{ [key: string]: any }[]>
    | null;
};

export const UserQuery: Resolver = {
  fetchCurrentUser(prt, args, { req }) {
    const id = auth(req);
    return User.findById(id);
  },
  fetchUsers(prt, args, ctx) {
    return User.find().limit(10);
  }
};
