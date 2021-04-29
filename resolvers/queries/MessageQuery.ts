import { auth } from "../../middlewares/UserValidation";
import { Message } from "../../models/Message";
import { Resolver } from "./UserQuery";

export const MessageQuery: Resolver = {
  async fetchMessages(prt, args: { recipient: string }, { req }) {
    const id = auth(req);
    return Message.find({ sender: id, recipient: args.recipient }).limit(50);
  }
};
