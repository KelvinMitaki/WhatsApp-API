import jwt from "jsonwebtoken";
import { auth, registerValidation } from "../../middlewares/UserValidation";
import { Chat } from "../../models/Chat";
import { Group } from "../../models/Group";
import { GroupMsg } from "../../models/GroupMsg";
import { User, UserAttrs } from "../../models/User";
import { Resolver } from "../queries/UserQuery";
import { pubsub, SubscriptionEnum } from "../subscriptions/MessageSubscription";

export const UserMutation: Resolver = {
  async registerUser(prt, args: { values: UserAttrs }, ctx) {
    registerValidation(args.values);
    const existingUser = await User.findOne({ phoneNumber: args.values.phoneNumber });
    let token;
    if (!existingUser) {
      const user = User.build({ ...args.values, online: true, lastSeen: new Date().toString() });
      await user.save();
      const data = { userID: user._id, online: user.online };
      pubsub.publish(SubscriptionEnum.UPDATE_USER_ONLINE, { updateUserOnline: data });
      token = jwt.sign({ _id: user._id }, process.env.JWT_KEY!);
    } else {
      existingUser.name = args.values.name;
      existingUser.online = true;
      existingUser.lastSeen = new Date().toString();
      await existingUser.save();
      const data = { userID: existingUser._id, online: existingUser.online };
      pubsub.publish(SubscriptionEnum.UPDATE_USER_ONLINE, { updateUserOnline: data });
      token = jwt.sign({ _id: existingUser._id }, process.env.JWT_KEY!);
    }
    return {
      token
    };
  },
  async updateUser(
    prt,
    args: {
      name?: string;
      about?: string;
      profilePhoto?: string;
    },
    { req }
  ) {
    const id = auth(req);
    const user = await User.findById(id);
    if (user) {
      for (let key in args) {
        // @ts-ignore
        user[key as keyof typeof args] = args[key as keyof typeof args];
      }
      await user.save();
      return user;
    }
    return {};
  },
  updateUserTyping(prt, args: { typing: boolean; chatID: string; typingUserID: string }, { req }) {
    auth(req);
    const data = args;
    pubsub.publish(SubscriptionEnum.UPDATE_USER_TYPING, { updateUserTyping: data });
    return data;
  },
  async updateUserOnline(prt, args: { online: boolean }, { req }) {
    const id = auth(req);
    const data = { userID: id, online: args.online };
    pubsub.publish(SubscriptionEnum.UPDATE_USER_ONLINE, { updateUserOnline: data });
    await User.updateOne({ _id: id }, { online: args.online, lastSeen: new Date().toString() });
    return data;
  },
  async deleteAll(_, __, { req }) {
    auth(req);
    await User.updateMany({}, { groups: [] });
    await Group.deleteMany({});
    await GroupMsg.deleteMany({});
    return {
      token: "ok"
    };
  }
};
