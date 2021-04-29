import { auth } from "../../middlewares/UserValidation";
import { Message } from "../../models/Message";
import { Resolver } from "../queries/UserQuery";

export const MessageMutation: Resolver = {
  async addNewMessage(prt, args: { recipient: string; message: string }, { req }) {
    const id = auth(req) as string;
    const message = Message.build({ ...args, sender: id, read: false });
    await message.save();
    return message;
  }
};
