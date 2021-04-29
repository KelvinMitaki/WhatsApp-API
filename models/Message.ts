import mongoose, { SchemaTypeOpts } from "mongoose";
export interface MessageAttrs {
  sender: string;
  recipient: string;
  message: string;
  read: boolean;
  deleted?: boolean;
}

export interface MessageDoc extends mongoose.Document {
  sender: string;
  recipient: string;
  message: string;
  read: boolean;
  deleted?: boolean;
}

interface MessageModel extends mongoose.Model<MessageDoc> {
  build: (messageAttrs: MessageAttrs) => MessageDoc;
}

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      required: true,
      ref: "User"
    },
    recipient: {
      type: String,
      required: true,
      ref: "User"
    },
    message: {
      type: String,
      required: true
    },
    read: {
      type: Boolean,
      required: true
    },
    deleted: {
      type: Boolean,
      default: false
    }
  } as { [key in keyof MessageAttrs]: SchemaTypeOpts<any> | SchemaTypeOpts<any>[] },
  { timestamps: true }
);

MessageSchema.statics.build = (messageAttrs: MessageAttrs): MessageDoc => {
  return new Message(messageAttrs);
};

const Message = mongoose.model<MessageDoc, MessageModel>("Message", MessageSchema);

export { Message };
