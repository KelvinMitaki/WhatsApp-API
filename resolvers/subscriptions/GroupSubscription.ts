import { withFilter } from 'graphql-subscriptions'
import { SubscriptionResolvers } from '../../generated/graphql'
import { GroupDoc } from '../../models/Group'
import { GroupMsgDoc } from '../../models/GroupMsg'
import { pubsub, SubscriptionEnum } from './MessageSubscription'

export const GroupSubscription: SubscriptionResolvers = {
  addNewGroup: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(SubscriptionEnum.ADD_NEW_GROUP),
      (payload, variables) => {
        const { participants, admin }: GroupDoc = payload.addNewGroup
        return (
          participants.some((p) => p.toString() === variables.userID.toString()) ||
          admin.toString() === variables.userID.toString()
        )
      }
    ),
  },
  addNewGroupMsg: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(SubscriptionEnum.ADD_NEW_GROUP_MSG),
      (payload, variables: { groupID: string }) => {
        const { group }: GroupMsgDoc = payload.addNewGroupMsg
        return variables.groupID.toString() === group.toString()
      }
    ),
  },
  deleteGroupMsg: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(SubscriptionEnum.DELETE_GROUP_MSG),
      (payload, variables) => {
        console.log({ payload })
        console.log({ variables })
        return true
      }
    ),
  },
  updateGroupTyping: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(SubscriptionEnum.UPDATE_GROUP_TYPING),
      (payload, variables: { groupID: string }) => {
        const { groupID } = payload.updateGroupTyping
        return groupID.toString() === variables.groupID.toString()
      }
    ),
  },
}
