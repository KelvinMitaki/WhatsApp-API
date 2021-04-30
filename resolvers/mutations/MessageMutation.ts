import { auth } from "../../middlewares/UserValidation";
import { Chat, ChatDoc } from "../../models/Chat";
import { Message } from "../../models/Message";
import { Resolver } from "../queries/UserQuery";
import { pubsub, SubscriptionEnum } from "../subscriptions/MessageSubscription";

export const MessageMutation: Resolver = {
  async addNewMessage(prt, args: { recipient: string; message: string }, { req }) {
    const id = auth(req) as string;
    let chat: ChatDoc | null;
    chat = await Chat.findOne({
      $or: [
        { sender: id, recepient: args.recipient },
        { sender: args.recipient, recepient: id }
      ]
    });
    if (!chat) {
      chat = Chat.build({ ...args, sender: id });
      await chat.save();
    } else {
      chat.sender = id;
      chat.recipient = args.recipient;
      chat.message = args.message;
      await chat.save();
    }
    pubsub.publish(SubscriptionEnum.ADD_NEW_CHAT, { addNewChat: chat });
    const message = Message.build({ ...args, sender: id, read: false, chatID: chat._id });
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
      return message;
    }
    return {};
  }
};
