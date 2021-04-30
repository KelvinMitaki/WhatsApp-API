import mongoose, { SchemaTypeOpts } from "mongoose";

interface LastMsgAttrs {
  sender: string;
  receiver: string;
  message: string;
}

export interface LastMsgDoc extends mongoose.Document {
  sender: string;
  receiver: string;
  message: string;
}

interface LastMsgModel extends mongoose.Model<LastMsgDoc> {
  build: (lastMsgAttrs: LastMsgAttrs) => LastMsgDoc;
}

const LastMsgSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User"
    },
    receiver: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User"
    },
    message: {
      type: String,
      required: true
    }
  } as { [key in keyof LastMsgAttrs]: SchemaTypeOpts<any> },
  { timestamps: true }
);

const LastMsg = mongoose.model<LastMsgDoc, LastMsgModel>("LastMsg", LastMsgSchema);

export { LastMsg };
