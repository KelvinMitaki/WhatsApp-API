import { auth } from "../../middlewares/UserValidation";
import { Group } from "../../models/Group";
import { Resolver } from "../queries/UserQuery";
import { pubsub, SubscriptionEnum } from "../subscriptions/MessageSubscription";

export const GroupMutation: Resolver = {
  async addNewGroup(prt, args: { name: string }, { req }) {
    const id = auth(req);
    const group = Group.build({ ...args, admin: id });
    await group.save();
    pubsub.publish(SubscriptionEnum.ADD_NEW_GROUP, { addNewGroup: group });
    return group;
  }
};
