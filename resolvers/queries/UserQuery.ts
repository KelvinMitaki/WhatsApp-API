import { QueryResolvers, ResolverTypeWrapper, User as UserInterface } from '../../generated/graphql'
import { auth } from '../../middlewares/UserValidation'
import { User } from '../../models/User'
import { Context } from '../../schema/schema'
import { pubsub, SubscriptionEnum } from '../subscriptions/MessageSubscription'

export const UserQuery: QueryResolvers<Context> = {
  async fetchCurrentUser(prt, args, { req }) {
    const id = auth(req)
    const user = await User.findById(id).populate('groups')
    if (user) {
      user.online = true
      user.lastSeen = new Date().toString()
      await user.save()
    }
    const data = { userID: id, online: true }
    pubsub.publish(SubscriptionEnum.UPDATE_USER_ONLINE, { updateUserOnline: data })
    return user as unknown as UserInterface
  },
  fetchUsers(prt, args, { req }) {
    const id = auth(req)
    return User.find({ _id: { $ne: id } })
      .populate('groups')
      .limit(10) as unknown as ResolverTypeWrapper<UserInterface>[]
  },
}
