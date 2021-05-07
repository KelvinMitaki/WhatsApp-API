import { ValidationError } from "apollo-server-errors";
import { auth } from "../../middlewares/UserValidation";
import { Group } from "../../models/Group";
import { GroupMsg } from "../../models/GroupMsg";
import { User } from "../../models/User";
import { Resolver } from "../queries/UserQuery";
import { pubsub, SubscriptionEnum } from "../subscriptions/MessageSubscription";

export const GroupMutation: Resolver = {
  async addNewGroup(prt, args: { name: string; participants: string[] }, { req }) {
    if (args.participants.length > 256) {
      throw new ValidationError("You cannot add more than 256 participants");
    }
    if (!args.participants.length) {
      throw new ValidationError("Participants required");
    }
    const id = auth(req);
    const group = Group.build({ ...args, participants: [id, ...args.participants], admin: id });
    await group.save();
    pubsub.publish(SubscriptionEnum.ADD_NEW_GROUP, { addNewGroup: group });
    await User.updateMany(
      { _id: { $in: [id, ...args.participants] } },
      { $push: { groups: group } }
    );
    return group;
  },
  async addNewGroupMsg(prt, args: { group: string; message: string }, { req }) {
    const id = auth(req);
    const group = await Group.findById(args.group);
    if (group) {
      let message = GroupMsg.build({ ...args, sender: id, read: [], received: [] });
      await message.save();
      message = await message.populate("sender").execPopulate();
      pubsub.publish(SubscriptionEnum.ADD_NEW_GROUP_MSG, { addNewGroupMsg: message });
      group.message = message._id;
      pubsub.publish(SubscriptionEnum.ADD_NEW_GROUP, {
        addNewGroup: { ...group.toObject(), message: null }
      });
      await group.save();
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
  },
  async updateGroupMessagesRead(prt, args: { messageIDs: string[] }, { req }) {
    const id = auth(req);
    await GroupMsg.updateMany(
      { _id: { $in: args.messageIDs }, sender: { $ne: id } },
      { $push: { read: id } }
    );
    return GroupMsg.find({ _id: { $in: args.messageIDs } });
  }
};
