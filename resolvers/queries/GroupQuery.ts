import { ForbiddenError } from "apollo-server-errors";
import { auth } from "../../middlewares/UserValidation";
import { Group } from "../../models/Group";
import { GroupMsg } from "../../models/GroupMsg";
import { Resolver } from "./UserQuery";

export const GroupQuery: Resolver = {
  async fetchGroups(prt, args, { req }) {
    const id = auth(req);
    const groups = await Group.find({ $or: [{ participants: id }, { admin: id }] })
      .populate({
        path: "message",
        populate: {
          path: "sender"
        }
      })
      .sort({ createdAt: -1 })
      .limit(10);
    return groups;
  },
  async fetchGroupMsgs(prt, args: { groupID: string }, { req }) {
    const id = auth(req);
    const isParticipant = await Group.exists({
      _id: id,
      $or: [{ participants: id }, { admin: id }]
    });
    if (!isParticipant) {
      throw new ForbiddenError("You are not allowed to read messages from this group");
    }
    return GroupMsg.find({ group: args.groupID }).populate("sender");
  }
};
