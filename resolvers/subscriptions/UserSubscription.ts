import { withFilter } from 'graphql-subscriptions'
import { SubscriptionResolvers } from '../../generated/graphql'
import { pubsub, SubscriptionEnum } from './MessageSubscription'

export const UserSubscription: SubscriptionResolvers = {
  updateUserTyping: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(SubscriptionEnum.UPDATE_USER_TYPING),
      (payload, variables: { chatID: string }) => {
        const { chatID } = payload.updateUserTyping
        return chatID.toString() === variables.chatID.toString()
      }
    ),
  },
  updateUserOnline: {
    subscribe: () => pubsub.asyncIterator(SubscriptionEnum.UPDATE_USER_ONLINE),
  },
}
