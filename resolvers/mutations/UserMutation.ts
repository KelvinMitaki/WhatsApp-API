import jwt from "jsonwebtoken";
import { registerValidation } from "../../middlewares/UserValidation";
import { User, UserAttrs } from "../../models/User";
import { Resolver } from "../queries/UserQuery";

export const Mutation: Resolver = {
  async registerUser(prt, args: { values: UserAttrs }, ctx) {
    registerValidation(args.values);
    const user = User.build(args.values);
    await user.save();
    const token = jwt.sign(user._id, process.env.JWT_KEY!);
    return {
      token
    };
  }
};
