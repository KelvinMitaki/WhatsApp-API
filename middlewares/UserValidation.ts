import { AuthenticationError, UserInputError } from "apollo-server-errors";
import jwt from "jsonwebtoken";
import { Request } from "express";
import { UserAttrs } from "../models/User";

export const registerValidation = (usr: UserAttrs) => {
  const { about, countryCode, groups, name, phoneNumber } = usr;
  if (!about || (about && !about.trim().length)) {
    throw new UserInputError("about is required");
  }
  if (!countryCode || (countryCode && !countryCode.trim().length)) {
    throw new UserInputError("countryCode is required");
  }
  if (!Array.isArray(groups)) {
    throw new UserInputError("invalid groups type");
  }
  if (!name || (name && !name.trim().length)) {
    throw new UserInputError("name is required");
  }
  if (!phoneNumber) {
    throw new UserInputError("phone number is required");
  }
};

export const auth = (req: Request) => {
  const token = req.headers.authorization || null;
  if (!token) throw new AuthenticationError("Not Authenticated");
  try {
    const id = jwt.verify(process.env.JWT_KEY!, token.split(" ")[1]);
    return id;
  } catch (error) {
    throw new AuthenticationError("Not Authenticated");
  }
};
