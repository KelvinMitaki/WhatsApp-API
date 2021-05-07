import { withFilter } from "graphql-subscriptions";
import { GroupDoc } from "../../models/Group";
import { GroupMsgDoc } from "../../models/GroupMsg";
import { pubsub, Subscription, SubscriptionEnum } from "./MessageSubscription";

export const GroupSubscription: Subscription = {
  addNewGroup: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(SubscriptionEnum.ADD_NEW_GROUP),
      (payload, variables: { userID: string }) => {
        const { participants, admin }: GroupDoc = payload.addNewGroup;
        return (
          participants.some(p => p.toString() === variables.userID.toString()) ||
          admin.toString() === variables.userID.toString()
        );
      }
    )
  },
  addNewGroupMsg: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(SubscriptionEnum.ADD_NEW_GROUP_MSG),
      (payload, variables: { groupID: string }) => {
        const { group }: GroupMsgDoc = payload.addNewGroupMsg;
        return variables.groupID.toString() === group.toString();
      }
    )
  },
  deleteGroupMsg: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(SubscriptionEnum.DELETE_GROUP_MSG),
      (payload, variables) => {
        console.log({ payload });
        console.log({ variables });
        return true;
      }
    )
  },
  updatedGroupRead: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(SubscriptionEnum.UPDATE_GROUP_READ),
      (payload, variables: { userID: string }) => {
        console.log({ payload });
        console.log({ variables });
        const userID = payload.updatedGroupRead.userID;
        return userID.toString() === variables.userID.toString();
      }
    )
  }
};
