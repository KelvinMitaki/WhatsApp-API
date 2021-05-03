import { auth } from "../../middlewares/UserValidation";
import { Chat } from "../../models/Chat";
import { Message } from "../../models/Message";
import { Resolver } from "./UserQuery";

export const MessageQuery: Resolver = {
  async fetchMessages(
    prt,
    args: { recipient: string; offset: number; limit: number; messageCount: number },
    { req }
  ) {
    const id = auth(req);
    return Message.find({
      $or: [
        { sender: id, recipient: args.recipient },
        { sender: args.recipient, recipient: id }
      ]
    })
      .skip(args.messageCount - (args.offset + args.limit))
      .limit(args.limit);
  },
  async fetchChats(prt, args, { req }) {
    const id = auth(req);
    return Chat.find({ $or: [{ sender: id }, { recipient: id }] })
      .sort({ updatedAt: -1 })
      .populate("sender recipient");
  },
  fetchMessageCount(prt, args: { recipient: string }, { req }) {
    const id = auth(req);
    return Message.countDocuments({
      $or: [
        { sender: id, recipient: args.recipient },
        { sender: args.recipient, recipient: id }
      ]
    });
  }
};
