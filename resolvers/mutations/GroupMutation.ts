import { auth } from "../../middlewares/UserValidation";
import { Group } from "../../models/Group";
import { GroupMsg } from "../../models/GroupMsg";
import { Resolver } from "../queries/UserQuery";
import { pubsub, SubscriptionEnum } from "../subscriptions/MessageSubscription";

export const GroupMutation: Resolver = {
  async addNewGroup(prt, args: { name: string }, { req }) {
    const id = auth(req);
    const group = Group.build({ ...args, admin: id });
    await group.save();
    pubsub.publish(SubscriptionEnum.ADD_NEW_GROUP, { addNewGroup: group });
    return group;
  },
  async addNewGroupMsg(prt, args: { group: string; message: string }, { req }) {
    const id = auth(req);
    const group = await Group.findById(args.group);
    if (group) {
      const message = GroupMsg.build({ ...args, sender: id, read: [], received: [] });
      await message.save();
      group.message = message._id;
      await group.save();
      pubsub.publish(SubscriptionEnum.ADD_NEW_GROUP, { addNewGroup: group });
      return message;
    }
    return {};
  }
};
