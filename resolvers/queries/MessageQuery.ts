import { auth } from "../../middlewares/UserValidation";
import { Chat } from "../../models/Chat";
import { Message } from "../../models/Message";
import { Resolver } from "./UserQuery";

export const MessageQuery: Resolver = {
  async fetchMessages(prt, args: { recipient: string }, { req }) {
    const id = auth(req);
    return Message.find({
      $or: [
        { sender: id, recipient: args.recipient },
        { sender: args.recipient, recipient: id }
      ]
    }).limit(50);
  },
  async fetchChats(prt, args, { req }) {
    const id = auth(req);
    return Chat.find({ $or: [{ sender: id }, { recipient: id }] }).populate("sender recipient");
  }
};
