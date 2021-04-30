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
    return User.findById(id).populate("groups");
  },
  fetchUsers(prt, args, { req }) {
    const id = auth(req);
    return User.find({ _id: { $ne: id } })
      .populate("groups")
      .limit(10);
  }
};
