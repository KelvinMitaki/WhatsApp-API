import { Context } from "../../schema/schema";

export type Resolver = {
  [key: string]: (
    prt: any,
    args: any,
    context: Context
  ) => { [key: string]: string } | Promise<{ [key: string]: string }>;
};

export const UserQuery: Resolver = {
  hello(prt, args, ctx) {
    return {
      world: "hello world"
    };
  }
};
