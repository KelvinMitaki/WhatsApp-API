import mongoose, { SchemaTypeOpts } from "mongoose";

export interface UserAttrs {
  name: string;
  about: string;
  phoneNumber: number;
  countryCode: string;
  profilePhoto?: string;
  groups: string[];
  lastSeen: Date;
  typing: boolean;
}

export interface UserDoc extends mongoose.Document {
  name: string;
  about: string;
  phoneNumber: number;
  countryCode: string;
  profilePhoto?: string;
  groups: string[];
  lastSeen?: string;
  typing?: boolean;
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
      required: true,
      unique: true
    },
    countryCode: {
      type: String,
      required: true
    },
    profilePhoto: {
      type: String
    },
    lastSeen: {
      type: String,
      default: new Date().toString()
    },
    typing: {
      type: Boolean,
      default: false
    },
    groups: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Group"
      }
    ]
  } as { [key in keyof UserAttrs]: SchemaTypeOpts<any> | SchemaTypeOpts<any>[] },
  { timestamps: true }
);

UserSchema.statics.build = (userAttrs: UserAttrs): UserDoc => {
  return new User(userAttrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", UserSchema);

export { User };
