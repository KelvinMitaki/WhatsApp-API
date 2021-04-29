import mongoose from "mongoose";

export interface GroupAttrs {
  name: string;
  description?: string;
  groupProfilePhoto?: string;
  admin: string;
}
