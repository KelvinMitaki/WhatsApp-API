import { ValidationError } from "apollo-server-errors";
import { auth } from "../../middlewares/UserValidation";
import { Chat, ChatDoc } from "../../models/Chat";
import { Message } from "../../models/Message";
import { StarredMsg } from "../../models/StarredMsg";
import { Resolver } from "../queries/UserQuery";
import { pubsub, SubscriptionEnum } from "../subscriptions/MessageSubscription";

export const MessageMutation: Resolver = {
  async addNewMessage(prt, args: { recipient: string; message: string }, { req }) {
    const id = auth(req) as string;
    let chat: ChatDoc | null;
    chat = await Chat.findOne({
      $or: [
        {
          sender: id,
          recipient: args.recipient
        },
        { sender: args.recipient, recipient: id }
      ]
    });
    if (!chat) {
      chat = Chat.build({ ...args, sender: id, unread: 1 });
      await chat.save();
    } else {
      chat.sender = id;
      chat.recipient = args.recipient;
      chat.message = args.message;
      chat.unread =
        (await Message.countDocuments({ sender: id, recipient: args.recipient, read: false })) + 1;
      await chat.save();
    }
    chat = await Chat.findById(chat._id).populate("sender recipient");
    pubsub.publish(SubscriptionEnum.ADD_NEW_CHAT, { addNewChat: chat });
    const message = Message.build({ ...args, sender: id, read: false, chatID: chat!._id });
    await message.save();
    pubsub.publish(SubscriptionEnum.ADD_NEW_MESSAGE, { addNewMessage: message });
    return message;
  },
  async deleteMessage(prt, args: { messageID: string }, { req }) {
    const id = auth(req);
    const message = await Message.findById(args.messageID);
    if (message?.sender.toString() === id) {
      message.deleted = true;
      await message.save();
      pubsub.publish(SubscriptionEnum.DELETE_MESSAGE, { deleteMessage: message });
      return message;
    }
    return null;
  },
  async updateReadMessages(prt, args: { messageIDs: string[]; chatID: string }, { req }) {
    const id = auth(req);
    await Message.updateMany({ recipient: id, _id: { $in: args.messageIDs } }, { read: true });
    const chat = await Chat.findByIdAndUpdate(args.chatID, { unread: 0 }, { new: true })
      .sort({ updatedAt: -1 })
      .populate("sender recipient");
    pubsub.publish(SubscriptionEnum.ADD_NEW_CHAT, { addNewChat: chat });
    return Message.find({ _id: { $in: args.messageIDs } });
  },
  async addStarredMessage(prt, args: { message?: string; groupMsg?: string }, { req }) {
    const id = auth(req);
    if (!args.message && !args.groupMsg) {
      throw new ValidationError("msg or groupMsg required");
    }
    const { message, groupMsg } = args;
    const starredMsg = StarredMsg.build({
      starredBy: id,
      ...(message && { message }),
      ...(groupMsg && { groupMsg })
    });
    await starredMsg.save();
    return starredMsg;
  }
};
