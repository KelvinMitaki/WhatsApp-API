import mongoose, { SchemaTypeOpts } from "mongoose";

export interface UserAttrs {
  name: string;
  about: string;
  phoneNumber: number;
  countryCode: string;
  profilePhoto?: string;
  groups: string[];
}

export interface UserDoc extends mongoose.Document {
  name: string;
  about: string;
  phoneNumber: number;
  countryCode: string;
  profilePhoto?: string;
  groups: string[];
}

interface UserModel extends mongoose.Model<UserDoc> {
  build: (attrs: UserAttrs) => UserDoc;
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    about: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: Number,
      required: true
    },
    countryCode: {
      type: String,
      required: true
    },
    profilePhoto: {
      type: String
    },
    groups: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Group"
      }
    ]
  } as { [key: string]: SchemaTypeOpts<any> | SchemaTypeOpts<any>[] },
  { timestamps: true }
);

UserSchema.statics.build = (userAttrs: UserAttrs): UserDoc => {
  return new User(userAttrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", UserSchema);

export { User };
