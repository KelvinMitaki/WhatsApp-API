import mongoose from 'mongoose'
import { ValidationError } from 'apollo-server-errors'
import { auth } from '../../middlewares/UserValidation'
import { Group } from '../../models/Group'
import { GroupMsg } from '../../models/GroupMsg'
import { User } from '../../models/User'
import { pubsub, SubscriptionEnum } from '../subscriptions/MessageSubscription'
import {
  Group as GroupInterface,
  GroupMsg as GroupMsgInterface,
  MutationResolvers,
  ResolverTypeWrapper,
} from '../../generated/graphql'
import { Context } from '../../schema/schema'

export const GroupMutation: MutationResolvers<Context> = {
  async addNewGroup(prt, args, { req }) {
    if (args.participants.length > 256) {
      throw new ValidationError('You cannot add more than 256 participants')
    }
    if (!args.participants.length) {
      throw new ValidationError('Participants required')
    }
    const id = auth(req)
    const group = Group.build({ ...args, participants: [id, ...args.participants], admin: id })
    await group.save()
    pubsub.publish(SubscriptionEnum.ADD_NEW_GROUP, { addNewGroup: group })
    await User.updateMany(
      { _id: { $in: [id, ...args.participants] } },
      { $push: { groups: group } }
    )

    return group as unknown as Promise<ResolverTypeWrapper<GroupInterface>>
  },
  async addNewGroupMsg(prt, args, { req }): Promise<GroupMsgInterface | null> {
    const id = auth(req)
    const group = await Group.findById(args.group)
    if (group) {
      let message = GroupMsg.build({ ...args, sender: id, read: [], received: [] })
      await message.save()
      message = await message.populate('sender').execPopulate()
      pubsub.publish(SubscriptionEnum.ADD_NEW_GROUP_MSG, { addNewGroupMsg: message })
      group.message = message._id
      pubsub.publish(SubscriptionEnum.ADD_NEW_GROUP, {
        addNewGroup: { ...group.toObject(), message },
      })
      await group.save()
      return message as unknown as GroupMsgInterface
    }
    return null
  },
  async deleteGroupMsg(prt, args, { req }): Promise<GroupMsgInterface | null> {
    const id = auth(req)
    const message = await GroupMsg.findById(args.messageID)
    if (message?.sender.toString() === id) {
      message.deleted = true
      await message.save()
      pubsub.publish(SubscriptionEnum.DELETE_GROUP_MSG, { deleteGroupMsg: message })
      return message as unknown as GroupMsgInterface
    }
    return null
  },
  async updateGroupMessagesRead(prt, args, { req }) {
    const id = auth(req)
    await GroupMsg.updateMany(
      { _id: { $in: args.messageIDs }, sender: { $ne: id } },
      { $push: { read: id } }
    )
    return GroupMsg.find({ _id: { $in: args.messageIDs } }).populate(
      'sender'
    ) as unknown as ResolverTypeWrapper<GroupMsgInterface>[]
  },
  updateGroupTyping(prt, args, { req }) {
    auth(req)
    pubsub.publish(SubscriptionEnum.UPDATE_GROUP_TYPING, { updateGroupTyping: args })
    return args
  },
  async addStarredGroupMessages(prt, args, { req }) {
    const starredBy = auth(req)
    await GroupMsg.updateMany({ _id: { $in: args.groupMsgIDs } }, { $addToSet: { starredBy } })
    return GroupMsg.find({ _id: { $in: args.groupMsgIDs } }).populate(
      'sender'
    ) as unknown as ResolverTypeWrapper<GroupMsgInterface>[]
  },
  async removeStarredGroupMessages(prt, args, { req }) {
    const starredBy = auth(req)
    await GroupMsg.updateMany({ _id: { $in: args.groupMsgIDs } }, { $pull: { starredBy } })
    return GroupMsg.find({ _id: { $in: args.groupMsgIDs } }).populate(
      'sender'
    ) as unknown as ResolverTypeWrapper<GroupMsgInterface>[]
  },
}
