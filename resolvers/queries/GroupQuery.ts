import { auth } from "../../middlewares/UserValidation";
import { Group } from "../../models/Group";
import { User } from "../../models/User";
import { Resolver } from "./UserQuery";

export const GroupQuery: Resolver = {
  async fetchGroups(prt, args, { req }) {
    const id = auth(req);
    const user = await User.findById(id).select({ groups: 1 });
    const groups = await Group.find({ _id: { $in: user?.groups } }).limit(10);

    return groups;
  }
};
