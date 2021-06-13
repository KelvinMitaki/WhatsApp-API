import jwt from 'jsonwebtoken'
import { MutationResolvers, User as UserInterface } from '../../generated/graphql'
import { auth, registerValidation } from '../../middlewares/UserValidation'
import { Group } from '../../models/Group'
import { GroupMsg } from '../../models/GroupMsg'
import { User } from '../../models/User'
import { pubsub, SubscriptionEnum } from '../subscriptions/MessageSubscription'

export const UserMutation: MutationResolvers = {
  async registerUser(prt, args, ctx) {
    registerValidation(args.values)
    const existingUser = await User.findOne({ phoneNumber: args.values.phoneNumber })
    let token
    if (!existingUser) {
      const user = User.build({
        ...args.values,
        online: true,
        lastSeen: new Date().toString(),
        profilePhoto: args.values.profilePhoto as unknown as string | undefined,
      })
      await user.save()
      const data = { userID: user._id, online: user.online }
      pubsub.publish(SubscriptionEnum.UPDATE_USER_ONLINE, { updateUserOnline: data })
      token = jwt.sign({ _id: user._id }, process.env.JWT_KEY!)
    } else {
      existingUser.name = args.values.name
      existingUser.online = true
      existingUser.lastSeen = new Date().toString()
      await existingUser.save()
      const data = { userID: existingUser._id, online: existingUser.online }
      pubsub.publish(SubscriptionEnum.UPDATE_USER_ONLINE, { updateUserOnline: data })
      token = jwt.sign({ _id: existingUser._id }, process.env.JWT_KEY!)
    }
    return {
      token,
    }
  },
  async updateUser(prt, args, { req }) {
    const id = auth(req)
    const user = await User.findById(id)
    if (user) {
      for (let key in args) {
        // @ts-ignore
        user[key as keyof typeof args] = args[key as keyof typeof args]
      }
      await user.save()
      return user as unknown as UserInterface
    }
    return null
  },
  updateUserTyping(prt, args, { req }) {
    auth(req)
    pubsub.publish(SubscriptionEnum.UPDATE_USER_TYPING, { updateUserTyping: args })
    return args
  },
  async updateUserOnline(prt, args, { req }) {
    const id = auth(req)
    const data = { userID: id, online: args.online }
    pubsub.publish(SubscriptionEnum.UPDATE_USER_ONLINE, { updateUserOnline: data })
    await User.updateOne({ _id: id }, { online: args.online, lastSeen: new Date().toString() })
    return data
  },
  async deleteAll(_, __, { req }) {
    auth(req)
    await User.updateMany({}, { groups: [] })
    await Group.deleteMany({})
    await GroupMsg.deleteMany({})
    return {
      token: 'ok',
    }
  },
}
