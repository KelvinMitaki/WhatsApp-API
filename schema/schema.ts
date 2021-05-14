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
    typing: Boolean!
    online: Boolean!
    lastSeen: String!
  }
  type Message {
    _id: String!
    sender: String!
    recipient: String!
    message: String!
    read: Boolean!
    createdAt: String!
    deleted: Boolean
    starredBy: [String!]
  }
  type MessagePopulated {
    _id: String!
    sender: User!
    recipient: User!
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
    starredBy: [String!]
  }
  type StarredMsgs {
    messages: [Message!]!
    groupMsgs: [groupMsgs!]!
  }
  type UnreadGroupMsg {
    messageCount: Int!
    group: String!
  }
  type UpdatedGroupRead {
    groupCount: UnreadGroupMsg!
    userID: String!
  }
  type UserTyping {
    chatID: String!
    typingUserID: String!
    typing: Boolean!
  }
  type GroupTyping {
    groupID: String!
    typingUserID: String!
    typing: Boolean!
  }
  type UserOnline {
    userID: String!
    online: Boolean!
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
    fetchGroupMessageCount(groupID: String!): Count!
    fetchGroupMsgs(groupID: String!, offset: Int!, limit: Int!, messageCount: Int!): [GroupMsg!]!
    fetchUnreadGroupMsgs: [UnreadGroupMsg!]!
    fetchChats: [Chat!]!
    fetchCurrentUser: User!
    fetchStarredMsgs: StarredMsgs!
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
    updateGroupMessagesRead(messageIDs: [String!]!, groupID: String!): [GroupMsg!]!
    deleteAll: Token!
    updateUserTyping(typing: Boolean!, chatID: String!, typingUserID: String!): UserTyping!
    updateGroupTyping(typing: Boolean!, groupID: String!, typingUserID: String!): GroupTyping!
    updateUserOnline(online: Boolean!): UserOnline!
    addStarredMessage(message: String, groupMsg: String): Message!
  }
  type Subscription {
    addNewMessage(sender: String!, recipient: String!): Message!
    addNewGroup(userID: String!): Group!
    addNewChat(userID: String!): Chat!
    addNewGroupMsg(groupID: String!): GroupMsg!
    deleteMessage: Message!
    deleteGroupMsg: GroupMsg!
    updateUserTyping(chatID: String!): UserTyping!
    updateGroupTyping(groupID: String!): GroupTyping!
    updateUserOnline: UserOnline!
  }
`;
export default typeDefs;
export interface Context {
  req: Request;
  res: Response;
}
