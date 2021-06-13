import mongoose from 'mongoose'
import {
  Chat as ChatInterface,
  Message as MessageInterface,
  MessageCount,
  QueryResolvers,
  ResolverTypeWrapper,
  StarredMsgs,
} from '../../generated/graphql'
import { auth } from '../../middlewares/UserValidation'
import { Chat } from '../../models/Chat'
import { GroupMsg } from '../../models/GroupMsg'
import { Message } from '../../models/Message'
import { Context } from '../../schema/schema'

export const MessageQuery: QueryResolvers<Context> = {
  async fetchMessages(prt, args, { req }) {
    const id = auth(req)
    const skip = args.messageCount - (args.offset + args.limit)
    return Message.find({
      $or: [
        { sender: id, recipient: args.recipient },
        { sender: args.recipient, recipient: id },
      ],
    })
      .skip(skip < 0 ? 0 : skip)
      .limit(args.limit) as unknown as ResolverTypeWrapper<MessageInterface>[]
  },
  async fetchChats(prt, args, { req }) {
    const id = auth(req)
    return Chat.find({ $or: [{ sender: id }, { recipient: id }] })
      .sort({ updatedAt: -1 })
      .populate('sender recipient') as unknown as ResolverTypeWrapper<ChatInterface>[]
  },
  async fetchStarredMsgs(prt, args, { req }) {
    const starredBy = auth(req)
    return {
      messages: await Message.find({ starredBy }).populate('sender recipient'),
      groupMsgs: await GroupMsg.find({ starredBy }).populate('sender group'),
    } as unknown as Promise<ResolverTypeWrapper<StarredMsgs>>
  },
  fetchMessagesCount(prt, args, { req }) {
    const id = auth(req)
    const ids = args.userIDs.map((id) => mongoose.Types.ObjectId(id))
    return Message.aggregate([
      {
        $match: {
          $or: [
            { sender: mongoose.Types.ObjectId(id), recipient: { $in: ids } },
            { recipient: mongoose.Types.ObjectId(id), sender: { $in: ids } },
          ],
        },
      },
      { $group: { _id: { chatID: '$chatID' }, messageCount: { $sum: 1 } } },
      { $project: { chatID: '$_id.chatID', _id: 0, messageCount: 1 } },
    ]) as unknown as Promise<ResolverTypeWrapper<MessageCount>[]>
  },
}
