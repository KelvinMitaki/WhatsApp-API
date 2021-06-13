import mongoose from 'mongoose'
import { ForbiddenError } from 'apollo-server-errors'
import { auth } from '../../middlewares/UserValidation'
import { Group, GroupDoc } from '../../models/Group'
import { GroupMsg } from '../../models/GroupMsg'
import {
  Group as GroupInterface,
  GroupMsg as GroupMsgInterface,
  GroupWithParticipants,
  QueryResolvers,
  ResolverTypeWrapper,
} from '../../generated/graphql'

export const GroupQuery: QueryResolvers = {
  async fetchGroups(prt, args, { req }) {
    const id = auth(req)
    const groups = await Group.find({ $or: [{ participants: id }, { admin: id }] })
      .populate({
        path: 'message',
        populate: {
          path: 'sender',
        },
      })
      .sort({ updatedAt: -1 })
      .limit(10)
    return groups as unknown as ResolverTypeWrapper<GroupInterface>[]
  },
  async fetchGroup(prt, args, { req }) {
    const id = auth(req)
    const group = await Group.findOne({ _id: args.groupID, participants: id }).populate(
      'participants'
    )
    if (!group) {
      throw new ForbiddenError("You are not allowed to view this group's info")
    }
    return group as unknown as Promise<ResolverTypeWrapper<GroupWithParticipants>>
  },
  async fetchGroupMsgs(prt, args, { req }) {
    const id = auth(req)
    const isParticipant = await Group.exists({
      _id: args.groupID,
      $or: [{ participants: id }, { admin: id }],
    })
    if (!isParticipant) {
      throw new ForbiddenError('You are not allowed to read messages from this group')
    }
    const skip = args.messageCount - (args.offset + args.limit)
    return GroupMsg.find({ group: args.groupID })
      .populate('sender')
      .skip(skip < 0 ? 0 : skip)
      .limit(args.limit) as unknown as Promise<ResolverTypeWrapper<GroupMsgInterface>[]>
  },
  async fetchUnreadGroupMsgs(prt, args, { req }) {
    const id = auth(req)
    let groups = await Group.find({ participants: id }).select({ _id: 1 })
    groups = groups.map((g) => g._id) as unknown as GroupDoc[]
    return GroupMsg.aggregate([
      {
        $match: {
          group: { $in: groups },
          read: { $nin: [mongoose.Types.ObjectId(id)] },
          sender: { $ne: mongoose.Types.ObjectId(id) },
        },
      },
      { $group: { _id: { group: '$group' }, messageCount: { $sum: 1 } } },
      { $project: { group: '$_id.group', _id: 0, messageCount: 1 } },
    ])
  },
  async fetchGroupMessageCount(prt, args, { req }) {
    auth(req)
    return {
      count: await GroupMsg.countDocuments({ group: args.groupID }),
    }
  },
  async fetchGroupMessagesCount(_, __, { req }) {
    const id = auth(req)
    const groups = await Group.find({ participants: id }).select('_id')
    return GroupMsg.aggregate([
      { $match: { group: { $in: groups.map((g) => g._id) } } },
      {
        $group: { _id: { groupID: '$group' }, messageCount: { $sum: 1 } },
      },
      { $project: { groupID: '$_id.groupID', _id: 0, messageCount: 1 } },
    ])
  },
}
