import { auth } from "../../middlewares/UserValidation";
import { Group } from "../../models/Group";
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
  }
};
