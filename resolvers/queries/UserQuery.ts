import { auth } from "../../middlewares/UserValidation";
import { User } from "../../models/User";
import { Context } from "../../schema/schema";
import { pubsub, SubscriptionEnum } from "../subscriptions/MessageSubscription";

export type Resolver = {
  [key: string]: (
    prt: any,
    args: any,
    context: Context
  ) =>
    | { [key: string]: any }
    | Promise<{ [key: string]: any }>
    | Promise<{ [key: string]: any }[]>
    | null;
};

export const UserQuery: Resolver = {
  async fetchCurrentUser(prt, args, { req }) {
    const id = auth(req);
    const user = await User.findById(id).populate("groups");
    if (user) {
      user.online = true;
      user.lastSeen = new Date().toString();
      await user.save();
    }
    const data = { userID: id, online: true };
    pubsub.publish(SubscriptionEnum.UPDATE_USER_ONLINE, { updateUserOnline: data });
    return user;
  },
  fetchUsers(prt, args, { req }) {
    const id = auth(req);
    return User.find({ _id: { $ne: id } })
      .populate("groups")
      .limit(10);
  }
};
