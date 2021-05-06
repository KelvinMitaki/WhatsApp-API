import { gql } from "apollo-server";
import { Request, Response } from "express";

const typeDefs = gql`
  type User {
    _id: String!
    name: String!
    about: String!
    phoneNumber: Int!
    countryCode: String!
    profilePhoto: String
    groups: [Group!]!
    createdAt: String!
  }
  type Message {
    _id: String!
    sender: String!
    recipient: String!
    message: String!
    read: Boolean!
    createdAt: String!
    deleted: Boolean
  }
  type Group {
    _id: String!
    name: String!
    description: String
    groupProfilePhoto: String
    admin: String!
    message: GroupMsg
    participants: [String!]!
    createdAt: String!
  }
  type GroupWithParticipants {
    _id: String!
    name: String!
    description: String
    groupProfilePhoto: String
    admin: String!
    participants: [User!]!
    createdAt: String!
  }
  type Chat {
    _id: String!
    sender: User!
    recipient: User!
    message: String!
    type: String!
    unread: Int!
    createdAt: String!
    updatedAt: String!
  }
  type GroupMsg {
    _id: String!
    sender: User!
    message: String!
    group: String!
    read: [String!]!
    deleted: Boolean
    received: [String!]!
    createdAt: String!
  }
  type Token {
    token: String!
  }
  type Count {
    count: Int!
  }
  input RegisterUserInput {
    name: String!
    about: String!
    phoneNumber: Int!
    countryCode: String!
    profilePhoto: String
    groups: [String!]!
  }

  type Query {
    fetchUsers: [User!]!
    fetchGroups: [Group!]!
    fetchGroup(groupID: String!): GroupWithParticipants!
    fetchMessages(recipient: String!, offset: Int!, limit: Int!, messageCount: Int!): [Message!]!
    fetchMessageCount(recipient: String!): Count!
    fetchGroupMsgs(groupID: String!): [GroupMsg!]!
    fetchChats: [Chat!]!
    fetchCurrentUser: User!
  }
  type Mutation {
    registerUser(values: RegisterUserInput!): Token!
    addNewMessage(recipient: String!, message: String!): Message!
    addNewGroup(name: String!, participants: [String!]!): Group!
    addNewGroupMsg(group: String!, message: String!): GroupMsg
    deleteMessage(messageID: String!): Message
    deleteGroupMsg(messageID: String!): GroupMsg
    updateUser(name: String, about: String, profilePhoto: String): User!
    updateReadMessages(messageIDs: [String!]!, chatID: String!): [Message!]!
    updateGroupMessagesRead(messageIDs: [String!]!): [GroupMsg!]!
  }
  type Subscription {
    addNewMessage(sender: String!, recipient: String!): Message!
    addNewGroup(userID: String!): Group!
    addNewChat(userID: String!): Chat!
    addNewGroupMsg(groupID: String!): GroupMsg!
    deleteMessage: Message!
    deleteGroupMsg: GroupMsg!
  }
`;
export default typeDefs;
export interface Context {
  req: Request;
  res: Response;
}
