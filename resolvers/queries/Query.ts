import { Context } from "../../schema/schema";

export type Resolver = {
  [key: string]: (prt: any, args: any, context: Context) => { [key: string]: string };
};

export const Query: Resolver = {
  hello(prt, args, ctx) {
    return {
      world: "hello world"
    };
  }
};
