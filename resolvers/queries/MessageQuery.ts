import { auth } from "../../middlewares/UserValidation";
import { Chat } from "../../models/Chat";
import { GroupMsg } from "../../models/GroupMsg";
import { Message } from "../../models/Message";
import { Resolver } from "./UserQuery";

export const MessageQuery: Resolver = {
  async fetchMessages(
    prt,
    args: { recipient: string; offset: number; limit: number; messageCount: number },
    { req }
  ) {
    const id = auth(req);
    const skip = args.messageCount - (args.offset + args.limit);
    return Message.find({
      $or: [
        { sender: id, recipient: args.recipient },
        { sender: args.recipient, recipient: id }
      ]
    })
      .skip(skip < 0 ? 0 : skip)
      .limit(args.limit);
  },
  async fetchChats(prt, args, { req }) {
    const id = auth(req);
    return Chat.find({ $or: [{ sender: id }, { recipient: id }] })
      .sort({ updatedAt: -1 })
      .populate("sender recipient");
  },
  async fetchMessageCount(prt, args: { recipient: string }, { req }) {
    const id = auth(req);
    return {
      count: await Message.countDocuments({
        $or: [
          { sender: id, recipient: args.recipient },
          { sender: args.recipient, recipient: id }
        ]
      })
    };
  },
  async fetchStarredMsgs(prt, args, { req }) {
    const starredBy = auth(req);
    return {
      messages: await Message.find({ starredBy }).populate("sender recipient"),
      groupMsgs: await GroupMsg.find({ starredBy }).populate("group")
    };
  }
};
