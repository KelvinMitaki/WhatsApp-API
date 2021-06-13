import mongoose, { SchemaTypeOpts } from 'mongoose'
export interface GroupMsgAttrs {
  sender: string
  message: string
  group: string
  read: string[]
  deleted?: boolean
  received: string[]
  starredBy?: string[]
}

export interface GroupMsgDoc extends mongoose.Document {
  sender: string
  message: string
  group: string
  read: string[]
  deleted?: boolean
  received: string[]
  starredBy?: string[]
  createdAt: string
  updatedAt: string
  _id: string
}

interface GroupMsgModel extends mongoose.Model<GroupMsgDoc> {
  build: (groupMsgAttrs: GroupMsgAttrs) => GroupMsgDoc
}

const GroupMsgSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    group: {
      type: mongoose.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
    read: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
    received: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    starredBy: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
  } as { [key in keyof GroupMsgAttrs]: SchemaTypeOpts<any> | SchemaTypeOpts<any>[] },
  { timestamps: true }
)

GroupMsgSchema.statics.build = (msgAttrs: GroupMsgAttrs): GroupMsgDoc => new GroupMsg(msgAttrs)

const GroupMsg = mongoose.model<GroupMsgDoc, GroupMsgModel>('GroupMsg', GroupMsgSchema)

export { GroupMsg }
