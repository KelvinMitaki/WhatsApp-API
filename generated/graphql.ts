import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Chat = {
  __typename?: 'Chat';
  _id: Scalars['String'];
  sender: User;
  recipient: User;
  message: Scalars['String'];
  type: Scalars['String'];
  unread: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ChatWithMessage = {
  __typename?: 'ChatWithMessage';
  chat: Chat;
  message: Message;
};

export type Count = {
  __typename?: 'Count';
  count: Scalars['Int'];
};

export type Group = {
  __typename?: 'Group';
  _id: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  groupProfilePhoto?: Maybe<Scalars['String']>;
  admin: Scalars['String'];
  message?: Maybe<GroupMsg>;
  participants: Array<Scalars['String']>;
  createdAt: Scalars['String'];
};

export type GroupMessageCount = {
  __typename?: 'GroupMessageCount';
  messageCount: Scalars['Int'];
  groupID: Scalars['String'];
};

export type GroupMsg = {
  __typename?: 'GroupMsg';
  _id: Scalars['String'];
  sender: User;
  message: Scalars['String'];
  group: Scalars['String'];
  read: Array<Scalars['String']>;
  deleted?: Maybe<Scalars['Boolean']>;
  received: Array<Scalars['String']>;
  createdAt: Scalars['String'];
  starredBy?: Maybe<Array<Scalars['String']>>;
};

export type GroupMsgPopulated = {
  __typename?: 'GroupMsgPopulated';
  _id: Scalars['String'];
  sender: User;
  message: Scalars['String'];
  group: Group;
  read: Array<Scalars['String']>;
  deleted?: Maybe<Scalars['Boolean']>;
  received: Array<Scalars['String']>;
  createdAt: Scalars['String'];
};

export type GroupTyping = {
  __typename?: 'GroupTyping';
  groupID: Scalars['String'];
  typingUserID: Scalars['String'];
  typing: Scalars['Boolean'];
};

export type GroupWithParticipants = {
  __typename?: 'GroupWithParticipants';
  _id: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  groupProfilePhoto?: Maybe<Scalars['String']>;
  admin: Scalars['String'];
  participants: Array<User>;
  createdAt: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  _id: Scalars['String'];
  sender: Scalars['String'];
  recipient: Scalars['String'];
  message: Scalars['String'];
  read: Scalars['Boolean'];
  deleted: Scalars['Boolean'];
  received: Scalars['Boolean'];
  starredBy?: Maybe<Array<Scalars['String']>>;
  createdAt: Scalars['String'];
};

export type MessageCount = {
  __typename?: 'MessageCount';
  messageCount: Scalars['Int'];
  chatID: Scalars['String'];
};

export type MessagePopulated = {
  __typename?: 'MessagePopulated';
  _id: Scalars['String'];
  sender: User;
  recipient: User;
  message: Scalars['String'];
  read: Scalars['Boolean'];
  deleted: Scalars['Boolean'];
  received: Scalars['Boolean'];
  createdAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  registerUser: Token;
  addNewMessage: Message;
  addNewGroup: Group;
  addNewGroupMsg?: Maybe<GroupMsg>;
  deleteMessage?: Maybe<Message>;
  deleteGroupMsg?: Maybe<GroupMsg>;
  updateUser?: Maybe<User>;
  updateReadMessages: Array<Message>;
  updateGroupMessagesRead: Array<GroupMsg>;
  deleteAll: Token;
  updateUserTyping: UserTyping;
  updateGroupTyping: GroupTyping;
  updateUserOnline: UserOnline;
  addStarredMessages: Array<Message>;
  removeStarredMessages: Array<Message>;
  addStarredGroupMessages: Array<GroupMsg>;
  removeStarredGroupMessages: Array<GroupMsg>;
};


export type MutationRegisterUserArgs = {
  values: RegisterUserInput;
};


export type MutationAddNewMessageArgs = {
  recipient: Scalars['String'];
  message: Scalars['String'];
};


export type MutationAddNewGroupArgs = {
  name: Scalars['String'];
  participants: Array<Scalars['String']>;
};


export type MutationAddNewGroupMsgArgs = {
  group: Scalars['String'];
  message: Scalars['String'];
};


export type MutationDeleteMessageArgs = {
  messageID: Scalars['String'];
};


export type MutationDeleteGroupMsgArgs = {
  messageID: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  name?: Maybe<Scalars['String']>;
  about?: Maybe<Scalars['String']>;
  profilePhoto?: Maybe<Scalars['String']>;
};


export type MutationUpdateReadMessagesArgs = {
  messageIDs: Array<Scalars['String']>;
  chatID: Scalars['String'];
};


export type MutationUpdateGroupMessagesReadArgs = {
  messageIDs: Array<Scalars['String']>;
  groupID: Scalars['String'];
};


export type MutationUpdateUserTypingArgs = {
  typing: Scalars['Boolean'];
  chatID: Scalars['String'];
  typingUserID: Scalars['String'];
};


export type MutationUpdateGroupTypingArgs = {
  typing: Scalars['Boolean'];
  groupID: Scalars['String'];
  typingUserID: Scalars['String'];
};


export type MutationUpdateUserOnlineArgs = {
  online: Scalars['Boolean'];
};


export type MutationAddStarredMessagesArgs = {
  messageIDs: Array<Scalars['String']>;
};


export type MutationRemoveStarredMessagesArgs = {
  messageIDs: Array<Scalars['String']>;
};


export type MutationAddStarredGroupMessagesArgs = {
  groupMsgIDs: Array<Scalars['String']>;
};


export type MutationRemoveStarredGroupMessagesArgs = {
  groupMsgIDs: Array<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  fetchUsers: Array<User>;
  fetchGroups: Array<Group>;
  fetchGroup: GroupWithParticipants;
  fetchMessages: Array<Message>;
  fetchGroupMessageCount: Count;
  fetchGroupMsgs: Array<GroupMsg>;
  fetchUnreadGroupMsgs: Array<UnreadGroupMsg>;
  fetchChats: Array<Chat>;
  fetchCurrentUser: User;
  fetchStarredMsgs: StarredMsgs;
  fetchMessagesCount: Array<MessageCount>;
  fetchGroupMessagesCount: Array<GroupMessageCount>;
};


export type QueryFetchGroupArgs = {
  groupID: Scalars['String'];
};


export type QueryFetchMessagesArgs = {
  recipient: Scalars['String'];
  offset: Scalars['Int'];
  limit: Scalars['Int'];
  messageCount: Scalars['Int'];
};


export type QueryFetchGroupMessageCountArgs = {
  groupID: Scalars['String'];
};


export type QueryFetchGroupMsgsArgs = {
  groupID: Scalars['String'];
  offset: Scalars['Int'];
  limit: Scalars['Int'];
  messageCount: Scalars['Int'];
};


export type QueryFetchMessagesCountArgs = {
  userIDs: Array<Scalars['String']>;
};

export type RegisterUserInput = {
  name: Scalars['String'];
  about: Scalars['String'];
  phoneNumber: Scalars['Int'];
  countryCode: Scalars['String'];
  profilePhoto?: Maybe<Scalars['String']>;
  groups: Array<Scalars['String']>;
};

export type StarredMsgs = {
  __typename?: 'StarredMsgs';
  messages: Array<MessagePopulated>;
  groupMsgs: Array<GroupMsgPopulated>;
};

export type Subscription = {
  __typename?: 'Subscription';
  addNewMessage: Message;
  addNewGroup: Group;
  addNewChat: ChatWithMessage;
  addNewGroupMsg: GroupMsg;
  deleteMessage: Message;
  deleteGroupMsg: GroupMsg;
  updateUserTyping: UserTyping;
  updateGroupTyping: GroupTyping;
  updateUserOnline: UserOnline;
  updateReadMessages: Array<Message>;
};


export type SubscriptionAddNewMessageArgs = {
  sender: Scalars['String'];
  recipient: Scalars['String'];
};


export type SubscriptionAddNewGroupArgs = {
  userID: Scalars['String'];
};


export type SubscriptionAddNewChatArgs = {
  userID: Scalars['String'];
};


export type SubscriptionAddNewGroupMsgArgs = {
  groupID: Scalars['String'];
};


export type SubscriptionUpdateUserTypingArgs = {
  chatID: Scalars['String'];
};


export type SubscriptionUpdateGroupTypingArgs = {
  groupID: Scalars['String'];
};


export type SubscriptionUpdateReadMessagesArgs = {
  sender: Scalars['String'];
  recipient: Scalars['String'];
};

export type Token = {
  __typename?: 'Token';
  token: Scalars['String'];
};

export type UnreadGroupMsg = {
  __typename?: 'UnreadGroupMsg';
  messageCount: Scalars['Int'];
  group: Scalars['String'];
};

export type UpdatedGroupRead = {
  __typename?: 'UpdatedGroupRead';
  groupCount: UnreadGroupMsg;
  userID: Scalars['String'];
};


export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  name: Scalars['String'];
  about: Scalars['String'];
  phoneNumber: Scalars['Int'];
  countryCode: Scalars['String'];
  profilePhoto?: Maybe<Scalars['String']>;
  groups: Array<Group>;
  createdAt: Scalars['String'];
  typing: Scalars['Boolean'];
  online: Scalars['Boolean'];
  lastSeen: Scalars['String'];
};

export type UserOnline = {
  __typename?: 'UserOnline';
  userID: Scalars['String'];
  online: Scalars['Boolean'];
};

export type UserTyping = {
  __typename?: 'UserTyping';
  chatID: Scalars['String'];
  typingUserID: Scalars['String'];
  typing: Scalars['Boolean'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  CacheControlScope: CacheControlScope;
  Chat: ResolverTypeWrapper<Chat>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  ChatWithMessage: ResolverTypeWrapper<ChatWithMessage>;
  Count: ResolverTypeWrapper<Count>;
  Group: ResolverTypeWrapper<Group>;
  GroupMessageCount: ResolverTypeWrapper<GroupMessageCount>;
  GroupMsg: ResolverTypeWrapper<GroupMsg>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  GroupMsgPopulated: ResolverTypeWrapper<GroupMsgPopulated>;
  GroupTyping: ResolverTypeWrapper<GroupTyping>;
  GroupWithParticipants: ResolverTypeWrapper<GroupWithParticipants>;
  Message: ResolverTypeWrapper<Message>;
  MessageCount: ResolverTypeWrapper<MessageCount>;
  MessagePopulated: ResolverTypeWrapper<MessagePopulated>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RegisterUserInput: RegisterUserInput;
  StarredMsgs: ResolverTypeWrapper<StarredMsgs>;
  Subscription: ResolverTypeWrapper<{}>;
  Token: ResolverTypeWrapper<Token>;
  UnreadGroupMsg: ResolverTypeWrapper<UnreadGroupMsg>;
  UpdatedGroupRead: ResolverTypeWrapper<UpdatedGroupRead>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
  UserOnline: ResolverTypeWrapper<UserOnline>;
  UserTyping: ResolverTypeWrapper<UserTyping>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Chat: Chat;
  String: Scalars['String'];
  Int: Scalars['Int'];
  ChatWithMessage: ChatWithMessage;
  Count: Count;
  Group: Group;
  GroupMessageCount: GroupMessageCount;
  GroupMsg: GroupMsg;
  Boolean: Scalars['Boolean'];
  GroupMsgPopulated: GroupMsgPopulated;
  GroupTyping: GroupTyping;
  GroupWithParticipants: GroupWithParticipants;
  Message: Message;
  MessageCount: MessageCount;
  MessagePopulated: MessagePopulated;
  Mutation: {};
  Query: {};
  RegisterUserInput: RegisterUserInput;
  StarredMsgs: StarredMsgs;
  Subscription: {};
  Token: Token;
  UnreadGroupMsg: UnreadGroupMsg;
  UpdatedGroupRead: UpdatedGroupRead;
  Upload: Scalars['Upload'];
  User: User;
  UserOnline: UserOnline;
  UserTyping: UserTyping;
};

export type CacheControlDirectiveArgs = {   maxAge?: Maybe<Scalars['Int']>;
  scope?: Maybe<CacheControlScope>; };

export type CacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = CacheControlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ChatResolvers<ContextType = any, ParentType extends ResolversParentTypes['Chat'] = ResolversParentTypes['Chat']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  unread?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChatWithMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChatWithMessage'] = ResolversParentTypes['ChatWithMessage']> = {
  chat?: Resolver<ResolversTypes['Chat'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['Message'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountResolvers<ContextType = any, ParentType extends ResolversParentTypes['Count'] = ResolversParentTypes['Count']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['Group'] = ResolversParentTypes['Group']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  groupProfilePhoto?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  admin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['GroupMsg']>, ParentType, ContextType>;
  participants?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupMessageCountResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupMessageCount'] = ResolversParentTypes['GroupMessageCount']> = {
  messageCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  groupID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupMsgResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupMsg'] = ResolversParentTypes['GroupMsg']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  group?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  read?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  received?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  starredBy?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupMsgPopulatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupMsgPopulated'] = ResolversParentTypes['GroupMsgPopulated']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  group?: Resolver<ResolversTypes['Group'], ParentType, ContextType>;
  read?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  received?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupTypingResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupTyping'] = ResolversParentTypes['GroupTyping']> = {
  groupID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  typingUserID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  typing?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GroupWithParticipantsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GroupWithParticipants'] = ResolversParentTypes['GroupWithParticipants']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  groupProfilePhoto?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  admin?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  participants?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  received?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  starredBy?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageCountResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageCount'] = ResolversParentTypes['MessageCount']> = {
  messageCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  chatID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessagePopulatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessagePopulated'] = ResolversParentTypes['MessagePopulated']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  read?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  received?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  registerUser?: Resolver<ResolversTypes['Token'], ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'values'>>;
  addNewMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationAddNewMessageArgs, 'recipient' | 'message'>>;
  addNewGroup?: Resolver<ResolversTypes['Group'], ParentType, ContextType, RequireFields<MutationAddNewGroupArgs, 'name' | 'participants'>>;
  addNewGroupMsg?: Resolver<Maybe<ResolversTypes['GroupMsg']>, ParentType, ContextType, RequireFields<MutationAddNewGroupMsgArgs, 'group' | 'message'>>;
  deleteMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<MutationDeleteMessageArgs, 'messageID'>>;
  deleteGroupMsg?: Resolver<Maybe<ResolversTypes['GroupMsg']>, ParentType, ContextType, RequireFields<MutationDeleteGroupMsgArgs, 'messageID'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, never>>;
  updateReadMessages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<MutationUpdateReadMessagesArgs, 'messageIDs' | 'chatID'>>;
  updateGroupMessagesRead?: Resolver<Array<ResolversTypes['GroupMsg']>, ParentType, ContextType, RequireFields<MutationUpdateGroupMessagesReadArgs, 'messageIDs' | 'groupID'>>;
  deleteAll?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  updateUserTyping?: Resolver<ResolversTypes['UserTyping'], ParentType, ContextType, RequireFields<MutationUpdateUserTypingArgs, 'typing' | 'chatID' | 'typingUserID'>>;
  updateGroupTyping?: Resolver<ResolversTypes['GroupTyping'], ParentType, ContextType, RequireFields<MutationUpdateGroupTypingArgs, 'typing' | 'groupID' | 'typingUserID'>>;
  updateUserOnline?: Resolver<ResolversTypes['UserOnline'], ParentType, ContextType, RequireFields<MutationUpdateUserOnlineArgs, 'online'>>;
  addStarredMessages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<MutationAddStarredMessagesArgs, 'messageIDs'>>;
  removeStarredMessages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<MutationRemoveStarredMessagesArgs, 'messageIDs'>>;
  addStarredGroupMessages?: Resolver<Array<ResolversTypes['GroupMsg']>, ParentType, ContextType, RequireFields<MutationAddStarredGroupMessagesArgs, 'groupMsgIDs'>>;
  removeStarredGroupMessages?: Resolver<Array<ResolversTypes['GroupMsg']>, ParentType, ContextType, RequireFields<MutationRemoveStarredGroupMessagesArgs, 'groupMsgIDs'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  fetchUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  fetchGroups?: Resolver<Array<ResolversTypes['Group']>, ParentType, ContextType>;
  fetchGroup?: Resolver<ResolversTypes['GroupWithParticipants'], ParentType, ContextType, RequireFields<QueryFetchGroupArgs, 'groupID'>>;
  fetchMessages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<QueryFetchMessagesArgs, 'recipient' | 'offset' | 'limit' | 'messageCount'>>;
  fetchGroupMessageCount?: Resolver<ResolversTypes['Count'], ParentType, ContextType, RequireFields<QueryFetchGroupMessageCountArgs, 'groupID'>>;
  fetchGroupMsgs?: Resolver<Array<ResolversTypes['GroupMsg']>, ParentType, ContextType, RequireFields<QueryFetchGroupMsgsArgs, 'groupID' | 'offset' | 'limit' | 'messageCount'>>;
  fetchUnreadGroupMsgs?: Resolver<Array<ResolversTypes['UnreadGroupMsg']>, ParentType, ContextType>;
  fetchChats?: Resolver<Array<ResolversTypes['Chat']>, ParentType, ContextType>;
  fetchCurrentUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  fetchStarredMsgs?: Resolver<ResolversTypes['StarredMsgs'], ParentType, ContextType>;
  fetchMessagesCount?: Resolver<Array<ResolversTypes['MessageCount']>, ParentType, ContextType, RequireFields<QueryFetchMessagesCountArgs, 'userIDs'>>;
  fetchGroupMessagesCount?: Resolver<Array<ResolversTypes['GroupMessageCount']>, ParentType, ContextType>;
};

export type StarredMsgsResolvers<ContextType = any, ParentType extends ResolversParentTypes['StarredMsgs'] = ResolversParentTypes['StarredMsgs']> = {
  messages?: Resolver<Array<ResolversTypes['MessagePopulated']>, ParentType, ContextType>;
  groupMsgs?: Resolver<Array<ResolversTypes['GroupMsgPopulated']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  addNewMessage?: SubscriptionResolver<ResolversTypes['Message'], "addNewMessage", ParentType, ContextType, RequireFields<SubscriptionAddNewMessageArgs, 'sender' | 'recipient'>>;
  addNewGroup?: SubscriptionResolver<ResolversTypes['Group'], "addNewGroup", ParentType, ContextType, RequireFields<SubscriptionAddNewGroupArgs, 'userID'>>;
  addNewChat?: SubscriptionResolver<ResolversTypes['ChatWithMessage'], "addNewChat", ParentType, ContextType, RequireFields<SubscriptionAddNewChatArgs, 'userID'>>;
  addNewGroupMsg?: SubscriptionResolver<ResolversTypes['GroupMsg'], "addNewGroupMsg", ParentType, ContextType, RequireFields<SubscriptionAddNewGroupMsgArgs, 'groupID'>>;
  deleteMessage?: SubscriptionResolver<ResolversTypes['Message'], "deleteMessage", ParentType, ContextType>;
  deleteGroupMsg?: SubscriptionResolver<ResolversTypes['GroupMsg'], "deleteGroupMsg", ParentType, ContextType>;
  updateUserTyping?: SubscriptionResolver<ResolversTypes['UserTyping'], "updateUserTyping", ParentType, ContextType, RequireFields<SubscriptionUpdateUserTypingArgs, 'chatID'>>;
  updateGroupTyping?: SubscriptionResolver<ResolversTypes['GroupTyping'], "updateGroupTyping", ParentType, ContextType, RequireFields<SubscriptionUpdateGroupTypingArgs, 'groupID'>>;
  updateUserOnline?: SubscriptionResolver<ResolversTypes['UserOnline'], "updateUserOnline", ParentType, ContextType>;
  updateReadMessages?: SubscriptionResolver<Array<ResolversTypes['Message']>, "updateReadMessages", ParentType, ContextType, RequireFields<SubscriptionUpdateReadMessagesArgs, 'sender' | 'recipient'>>;
};

export type TokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnreadGroupMsgResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnreadGroupMsg'] = ResolversParentTypes['UnreadGroupMsg']> = {
  messageCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  group?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdatedGroupReadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdatedGroupRead'] = ResolversParentTypes['UpdatedGroupRead']> = {
  groupCount?: Resolver<ResolversTypes['UnreadGroupMsg'], ParentType, ContextType>;
  userID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  about?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  countryCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profilePhoto?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  groups?: Resolver<Array<ResolversTypes['Group']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  typing?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  online?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastSeen?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserOnlineResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserOnline'] = ResolversParentTypes['UserOnline']> = {
  userID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  online?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserTypingResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserTyping'] = ResolversParentTypes['UserTyping']> = {
  chatID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  typingUserID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  typing?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Chat?: ChatResolvers<ContextType>;
  ChatWithMessage?: ChatWithMessageResolvers<ContextType>;
  Count?: CountResolvers<ContextType>;
  Group?: GroupResolvers<ContextType>;
  GroupMessageCount?: GroupMessageCountResolvers<ContextType>;
  GroupMsg?: GroupMsgResolvers<ContextType>;
  GroupMsgPopulated?: GroupMsgPopulatedResolvers<ContextType>;
  GroupTyping?: GroupTypingResolvers<ContextType>;
  GroupWithParticipants?: GroupWithParticipantsResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  MessageCount?: MessageCountResolvers<ContextType>;
  MessagePopulated?: MessagePopulatedResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  StarredMsgs?: StarredMsgsResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  UnreadGroupMsg?: UnreadGroupMsgResolvers<ContextType>;
  UpdatedGroupRead?: UpdatedGroupReadResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserOnline?: UserOnlineResolvers<ContextType>;
  UserTyping?: UserTypingResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
};


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;