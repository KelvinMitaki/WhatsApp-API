import mongoose from "mongoose";
import { auth } from "../../middlewares/UserValidation";
import { Chat } from "../../models/Chat";
import { GroupMsg } from "../../models/GroupMsg";
import { Message } from "../../models/Message";
import { User } from "../../models/User";
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
      groupMsgs: await GroupMsg.find({ starredBy }).populate("sender group")
    };
  },
  async test(prt, args, { req }) {
    const id = auth(req);
    const userIds = (await User.find()).filter(us => us._id.toString() !== id).map(us => us._id);
    const data = await Message.aggregate([
      {
        $match: {
          $or: [
            {
              sender: mongoose.Types.ObjectId(id),
              recipient: { $in: userIds.map(id => mongoose.Types.ObjectId(id)) }
            },
            {
              recipient: mongoose.Types.ObjectId(id),
              sender: { $in: userIds.map(id => mongoose.Types.ObjectId(id)) }
            }
          ]
        }
      },
      {
        $group: {
          _id: {
            chatID: "$chatID"
          },
          count: { $sum: 1 }
        }
      }
    ]);

    console.log(JSON.stringify(data, null, 4));
    return {
      token: "ok"
    };
  }
};
