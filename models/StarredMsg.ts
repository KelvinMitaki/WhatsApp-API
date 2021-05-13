import mongoose, { SchemaTypeOpts } from "mongoose";

export interface StarredMsgAttrs {
  starredBy: string;
  message?: string;
  groupMsg?: string;
}

export interface StarredMsgDoc extends mongoose.Document {
  starredBy: string;
  message?: string;
  groupMsg?: string;
}

interface StarredMsgModel extends mongoose.Model<StarredMsgDoc> {
  build: (attrs: StarredMsgAttrs) => StarredMsgDoc;
}

const StarredMsgSchema = new mongoose.Schema(
  {
    starredBy: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User"
    },
    message: {
      type: mongoose.Types.ObjectId,
      ref: "Message"
    },
    groupMsg: {
      type: mongoose.Types.ObjectId,
      ref: "GroupMsg"
    }
  } as { [key in keyof StarredMsgAttrs]: SchemaTypeOpts<any> | SchemaTypeOpts<any>[] },
  { timestamps: true }
);

StarredMsgSchema.statics.build = (attrs: StarredMsgAttrs): StarredMsgDoc => new StarredMsg(attrs);

const StarredMsg = mongoose.model<StarredMsgDoc, StarredMsgModel>("StarredMsg", StarredMsgSchema);

export { StarredMsg };
