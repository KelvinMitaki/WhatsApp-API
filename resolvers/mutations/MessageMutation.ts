import { Resolver } from "../queries/UserQuery";

export const MessageMutation: Resolver = {
  addNewMessage(prt, args: { recipient: string; message: string }, { req }) {
    return {};
  }
};
