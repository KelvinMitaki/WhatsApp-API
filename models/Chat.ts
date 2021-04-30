import mongoose, { SchemaTypeOpts } from "mongoose";

interface ChatAttrs {
  sender: string;
  recipient: string;
  message: string;
}

export interface ChatDoc extends mongoose.Document {
  sender: string;
  recipient: string;
  message: string;
}

interface ChatModel extends mongoose.Model<ChatDoc> {
  build: (ChatAttrs: ChatAttrs) => ChatDoc;
}

const ChatSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User"
    },
    recipient: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User"
    },
    message: {
      type: String,
      required: true
    }
  } as { [key in keyof ChatAttrs]: SchemaTypeOpts<any> },
  { timestamps: true }
);

const Chat = mongoose.model<ChatDoc, ChatModel>("Chat", ChatSchema);

export { Chat };
