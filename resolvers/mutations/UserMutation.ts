import jwt from "jsonwebtoken";
import { auth, registerValidation } from "../../middlewares/UserValidation";
import { User, UserAttrs } from "../../models/User";
import { Resolver } from "../queries/UserQuery";

export const UserMutation: Resolver = {
  async registerUser(prt, args: { values: UserAttrs }, ctx) {
    registerValidation(args.values);
    const existingUser = await User.findOne({ phoneNumber: args.values.phoneNumber });
    let token;
    if (!existingUser) {
      const user = User.build(args.values);
      await user.save();
      token = jwt.sign({ _id: user._id }, process.env.JWT_KEY!);
    } else {
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
  }
};
