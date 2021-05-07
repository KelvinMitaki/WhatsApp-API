import mongoose, { SchemaTypeOpts } from "mongoose";

export interface GroupAttrs {
  name: string;
  description?: string;
  groupProfilePhoto?: string;
  admin: string;
  participants: string[];
  message?: string;
}

export interface GroupDoc extends mongoose.Document {
  name: string;
  description?: string;
  groupProfilePhoto?: string;
  admin: string;
  participants: string[];
  message?: string;
}

export interface GroupModel extends mongoose.Model<GroupDoc> {
  build: (attrs: GroupAttrs) => GroupDoc;
}

const GroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: null
    },
    groupProfilePhoto: {
      type: String,
      default: null
    },
    admin: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User"
    },
    message: {
      type: mongoose.Types.ObjectId,
      ref: "GroupMsg"
    },
    participants: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User"
      }
    ]
  } as { [key in keyof GroupAttrs]: SchemaTypeOpts<any> | SchemaTypeOpts<any>[] },
  { timestamps: true }
);

GroupSchema.statics.build = (grpAttrs: GroupAttrs): GroupDoc => {
  return new Group(grpAttrs);
};

const Group = mongoose.model<GroupDoc, GroupModel>("Group", GroupSchema);

export { Group };
