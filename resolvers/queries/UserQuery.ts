import { User } from "../../models/User";
import { Context } from "../../schema/schema";

export type Resolver = {
  [key: string]: (
    prt: any,
    args: any,
    context: Context
  ) => { [key: string]: any } | Promise<{ [key: string]: any }> | Promise<{ [key: string]: any }[]>;
};

export const UserQuery: Resolver = {
  fetchUsers(prt, args, ctx) {
    return User.find().limit(10);
  }
};
