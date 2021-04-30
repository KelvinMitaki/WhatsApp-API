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
      pubsub.publish(SubscriptionEnum.ADD_NEW_GROUP_MSG, { addNewGroupMsg: message });
      group.message = message._id;
      await group.save();
      pubsub.publish(SubscriptionEnum.ADD_NEW_GROUP, { addNewGroup: group });
      return message;
    }
    return null;
  },
  async deleteGroupMsg(prt, args: { messageID: string }, { req }) {
    const id = auth(req);
    const message = await GroupMsg.findById(args.messageID);
    if (message?.sender.toString() === id) {
      message.deleted = true;
      await message.save();
      pubsub.publish(SubscriptionEnum.DELETE_GROUP_MSG, { deleteGroupMsg: message });
      return message;
    }
    return null;
  }
};
