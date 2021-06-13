import { gql } from 'apollo-server'
import { Request, Response } from 'express'

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
    deleted: Boolean!
    received: Boolean!
    starredBy: [String!]
    createdAt: String!
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
  type MessagePopulated {
    _id: String!
    sender: User!
    recipient: User!
    message: String!
    read: Boolean!
    deleted: Boolean!
    received: Boolean!
    createdAt: String!
  }
  type GroupMsgPopulated {
    _id: String!
    sender: User!
    message: String!
    group: Group!
    read: [String!]!
    deleted: Boolean
    received: [String!]!
    createdAt: String!
  }
  type StarredMsgs {
    messages: [MessagePopulated!]!
    groupMsgs: [GroupMsgPopulated!]!
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
  type MessageCount {
    messageCount: Int!
    chatID: String!
  }
  type GroupMessageCount {
    messageCount: Int!
    groupID: String!
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
    fetchGroupMessageCount(groupID: String!): Count!
    fetchGroupMsgs(groupID: String!, offset: Int!, limit: Int!, messageCount: Int!): [GroupMsg!]!
    fetchUnreadGroupMsgs: [UnreadGroupMsg!]!
    fetchChats: [Chat!]!
    fetchCurrentUser: User!
    fetchStarredMsgs: StarredMsgs!
    fetchMessagesCount(userIDs: [String!]!): [MessageCount!]!
    fetchGroupMessagesCount: [GroupMessageCount!]!
  }
  type Mutation {
    registerUser(values: RegisterUserInput!): Token!
    addNewMessage(recipient: String!, message: String!): Message!
    addNewGroup(name: String!, participants: [String!]!): Group!
    addNewGroupMsg(group: String!, message: String!): GroupMsg
    deleteMessage(messageID: String!): Message
    deleteGroupMsg(messageID: String!): GroupMsg
    updateUser(name: String, about: String, profilePhoto: String): User
    updateReadMessages(messageIDs: [String!]!, chatID: String!): [Message!]!
    updateGroupMessagesRead(messageIDs: [String!]!, groupID: String!): [GroupMsg!]!
    deleteAll: Token!
    updateUserTyping(typing: Boolean!, chatID: String!, typingUserID: String!): UserTyping!
    updateGroupTyping(typing: Boolean!, groupID: String!, typingUserID: String!): GroupTyping!
    updateUserOnline(online: Boolean!): UserOnline!
    addStarredMessages(messageIDs: [String!]!): [Message!]!
    removeStarredMessages(messageIDs: [String!]!): [Message!]!
    addStarredGroupMessages(groupMsgIDs: [String!]!): [GroupMsg!]!
    removeStarredGroupMessages(groupMsgIDs: [String!]!): [GroupMsg!]!
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
    updateReadMessages(sender: String!, recipient: String!): [Message!]!
  }
`
export default typeDefs
export interface Context {
  req: Request
  res: Response
}
