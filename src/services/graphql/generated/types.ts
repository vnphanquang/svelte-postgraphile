export type Maybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/**
 * The root query type which gives access points into the data universe.
 * @typedef {Object} Query
 * @property {Query} query - Exposes the root query type nested one level down. This is helpful for Relay 1
 * which can only query top level fields if they are in a particular form.
 * @property {string} nodeId - The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`.
 * @property {Node} [node] - Fetches an object given its globally unique `ID`.
 * @property {AccountsConnection} [accounts] - Reads and enables pagination through a set of `Account`.
 * @property {RoleScopesConnection} [roleScopes] - Reads and enables pagination through a set of `RoleScope`.
 * @property {Account} [account]
 * @property {Account} [accountByEmail]
 * @property {RoleScope} [roleScopeByRole]
 * @property {Account} [currentAccount] - Get current logged-in account identified by JWT
 * @property {Account} [accountByNodeId] - Reads a single `Account` using its globally unique `ID`.
 */

/**
 * An object with a globally unique `ID`.
 * @typedef {Object} Node
 * @property {string} nodeId - A globally unique identifier. Can be used in various places throughout the system to identify this single value.
 */

/**
 * A connection to a list of `Account` values.
 * @typedef {Object} AccountsConnection
 * @property {Array<Account>} nodes - A list of `Account` objects.
 * @property {Array<AccountsEdge>} edges - A list of edges which contains the `Account` and cursor to aid in pagination.
 * @property {PageInfo} pageInfo - Information to aid in pagination.
 * @property {number} totalCount - The count of *all* `Account` you could get from the connection.
 */

/**
 * A registered account
 * @typedef {Object} Account
 * @property {string} nodeId - A globally unique identifier. Can be used in various places throughout the system to identify this single value.
 * @property {UUID} id - Id of account
 * @property {Role} [role] - Role type associated with this account
 * @property {string} firstName - First name from an account
 * @property {string} [lastName] - Last name from an account
 * @property {string} email - Unique email of an account
 * @property {string} phone - Phone number of an account
 * @property {Datetime} [createdAt] - Timestamp of an account creation
 * @property {Datetime} [updatedAt] - Timestamp of an update to account
 * @property {Datetime} [deletedAt] - Timestamp of the soft deletion of account
 */

/**
 * A universally unique identifier as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122).
 * @typedef {*} UUID
 */

/**
 * @typedef {("USER"|"ADMIN")} Role
 */

/**
 * A point in time as described by the [ISO
 * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
 * @typedef {*} Datetime
 */

/**
 * A `Account` edge in the connection.
 * @typedef {Object} AccountsEdge
 * @property {Cursor} [cursor] - A cursor for use in pagination.
 * @property {Account} node - The `Account` at the end of the edge.
 */

/**
 * A location in a connection that can be used for resuming pagination.
 * @typedef {*} Cursor
 */

/**
 * Information about pagination in a connection.
 * @typedef {Object} PageInfo
 * @property {boolean} hasNextPage - When paginating forwards, are there more items?
 * @property {boolean} hasPreviousPage - When paginating backwards, are there more items?
 * @property {Cursor} [startCursor] - When paginating backwards, the cursor to continue.
 * @property {Cursor} [endCursor] - When paginating forwards, the cursor to continue.
 */

/**
 * Methods to use when ordering `Account`.
 * @typedef {("NATURAL"|"ID_ASC"|"ID_DESC"|"EMAIL_ASC"|"EMAIL_DESC"|"PRIMARY_KEY_ASC"|"PRIMARY_KEY_DESC")} AccountsOrderBy
 */

/**
 * A condition to be used against `Account` object types. All fields are tested for equality and combined with a logical ‘and.’
 * @typedef {Object} AccountCondition
 * @property {UUID} [id] - Checks for equality with the object’s `id` field.
 * @property {string} [email] - Checks for equality with the object’s `email` field.
 */

/**
 * A connection to a list of `RoleScope` values.
 * @typedef {Object} RoleScopesConnection
 * @property {Array<RoleScope>} nodes - A list of `RoleScope` objects.
 * @property {Array<RoleScopesEdge>} edges - A list of edges which contains the `RoleScope` and cursor to aid in pagination.
 * @property {PageInfo} pageInfo - Information to aid in pagination.
 * @property {number} totalCount - The count of *all* `RoleScope` you could get from the connection.
 */

/**
 * @typedef {Object} RoleScope
 * @property {Role} [role]
 * @property {Array<(Scope|null|undefined)>} [scopes]
 */

/**
 * @typedef {("VISITOR"|"MANAGER")} Scope
 */

/**
 * A `RoleScope` edge in the connection.
 * @typedef {Object} RoleScopesEdge
 * @property {Cursor} [cursor] - A cursor for use in pagination.
 * @property {RoleScope} node - The `RoleScope` at the end of the edge.
 */

/**
 * Methods to use when ordering `RoleScope`.
 * @typedef {("NATURAL"|"ROLE_ASC"|"ROLE_DESC")} RoleScopesOrderBy
 */

/**
 * A condition to be used against `RoleScope` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 * @typedef {Object} RoleScopeCondition
 * @property {Role} [role] - Checks for equality with the object’s `role` field.
 */

/**
 * The root mutation type which contains root level fields which mutate data.
 * @typedef {Object} Mutation
 * @property {CreateRoleScopePayload} [createRoleScope] - Creates a single `RoleScope`.
 * @property {UpdateAccountPayload} [updateAccountByNodeId] - Updates a single `Account` using its globally unique id and a patch.
 * @property {UpdateAccountPayload} [updateAccount] - Updates a single `Account` using a unique key and a patch.
 * @property {UpdateAccountPayload} [updateAccountByEmail] - Updates a single `Account` using a unique key and a patch.
 * @property {UpdateRoleScopePayload} [updateRoleScopeByRole] - Updates a single `RoleScope` using a unique key and a patch.
 * @property {DeleteAccountPayload} [deleteAccountByNodeId] - Deletes a single `Account` using its globally unique id.
 * @property {DeleteAccountPayload} [deleteAccount] - Deletes a single `Account` using a unique key.
 * @property {DeleteAccountPayload} [deleteAccountByEmail] - Deletes a single `Account` using a unique key.
 * @property {DeleteRoleScopePayload} [deleteRoleScopeByRole] - Deletes a single `RoleScope` using a unique key.
 * @property {AuthenticatePayload} [authenticate] - Create a JWT for account identification and authorization with email & password
 * @property {ChangePasswordPayload} [changePassword] - Change password of an existing account
 * @property {RegisterAccountPayload} [registerAccount] - Register a single account
 */

/**
 * The output of our create `RoleScope` mutation.
 * @typedef {Object} CreateRoleScopePayload
 * @property {string} [clientMutationId] - The exact same `clientMutationId` that was provided in the mutation input,
 * unchanged and unused. May be used by a client to track mutations.
 * @property {RoleScope} [roleScope] - The `RoleScope` that was created by this mutation.
 * @property {Query} [query] - Our root query field type. Allows us to run any query from our mutation payload.
 * @property {RoleScopesEdge} [roleScopeEdge] - An edge for our `RoleScope`. May be used by Relay 1.
 */

/**
 * All input for the create `RoleScope` mutation.
 * @typedef {Object} CreateRoleScopeInput
 * @property {string} [clientMutationId] - An arbitrary string value with no semantic meaning. Will be included in the
 * payload verbatim. May be used to track mutations by the client.
 * @property {RoleScopeInput} roleScope - The `RoleScope` to be created by this mutation.
 */

/**
 * An input for mutations affecting `RoleScope`
 * @typedef {Object} RoleScopeInput
 * @property {Role} [role]
 * @property {Array<(Scope|null|undefined)>} [scopes]
 */

/**
 * The output of our update `Account` mutation.
 * @typedef {Object} UpdateAccountPayload
 * @property {string} [clientMutationId] - The exact same `clientMutationId` that was provided in the mutation input,
 * unchanged and unused. May be used by a client to track mutations.
 * @property {Account} [account] - The `Account` that was updated by this mutation.
 * @property {Query} [query] - Our root query field type. Allows us to run any query from our mutation payload.
 * @property {AccountsEdge} [accountEdge] - An edge for our `Account`. May be used by Relay 1.
 */

/**
 * All input for the `updateAccountByNodeId` mutation.
 * @typedef {Object} UpdateAccountByNodeIdInput
 * @property {string} [clientMutationId] - An arbitrary string value with no semantic meaning. Will be included in the
 * payload verbatim. May be used to track mutations by the client.
 * @property {string} nodeId - The globally unique `ID` which will identify a single `Account` to be updated.
 * @property {AccountPatch} patch - An object where the defined keys will be set on the `Account` being updated.
 */

/**
 * Represents an update to a `Account`. Fields that are set will be updated.
 * @typedef {Object} AccountPatch
 * @property {string} [firstName] - First name from an account
 * @property {string} [lastName] - Last name from an account
 * @property {string} [email] - Unique email of an account
 * @property {string} [phone] - Phone number of an account
 * @property {Datetime} [deletedAt] - Timestamp of the soft deletion of account
 */

/**
 * All input for the `updateAccount` mutation.
 * @typedef {Object} UpdateAccountInput
 * @property {string} [clientMutationId] - An arbitrary string value with no semantic meaning. Will be included in the
 * payload verbatim. May be used to track mutations by the client.
 * @property {AccountPatch} patch - An object where the defined keys will be set on the `Account` being updated.
 * @property {UUID} id - Id of account
 */

/**
 * All input for the `updateAccountByEmail` mutation.
 * @typedef {Object} UpdateAccountByEmailInput
 * @property {string} [clientMutationId] - An arbitrary string value with no semantic meaning. Will be included in the
 * payload verbatim. May be used to track mutations by the client.
 * @property {AccountPatch} patch - An object where the defined keys will be set on the `Account` being updated.
 * @property {string} email - Unique email of an account
 */

/**
 * The output of our update `RoleScope` mutation.
 * @typedef {Object} UpdateRoleScopePayload
 * @property {string} [clientMutationId] - The exact same `clientMutationId` that was provided in the mutation input,
 * unchanged and unused. May be used by a client to track mutations.
 * @property {RoleScope} [roleScope] - The `RoleScope` that was updated by this mutation.
 * @property {Query} [query] - Our root query field type. Allows us to run any query from our mutation payload.
 * @property {RoleScopesEdge} [roleScopeEdge] - An edge for our `RoleScope`. May be used by Relay 1.
 */

/**
 * All input for the `updateRoleScopeByRole` mutation.
 * @typedef {Object} UpdateRoleScopeByRoleInput
 * @property {string} [clientMutationId] - An arbitrary string value with no semantic meaning. Will be included in the
 * payload verbatim. May be used to track mutations by the client.
 * @property {RoleScopePatch} patch - An object where the defined keys will be set on the `RoleScope` being updated.
 * @property {Role} role
 */

/**
 * Represents an update to a `RoleScope`. Fields that are set will be updated.
 * @typedef {Object} RoleScopePatch
 * @property {Role} [role]
 * @property {Array<(Scope|null|undefined)>} [scopes]
 */

/**
 * The output of our delete `Account` mutation.
 * @typedef {Object} DeleteAccountPayload
 * @property {string} [clientMutationId] - The exact same `clientMutationId` that was provided in the mutation input,
 * unchanged and unused. May be used by a client to track mutations.
 * @property {Account} [account] - The `Account` that was deleted by this mutation.
 * @property {string} [deletedAccountNodeId]
 * @property {Query} [query] - Our root query field type. Allows us to run any query from our mutation payload.
 * @property {AccountsEdge} [accountEdge] - An edge for our `Account`. May be used by Relay 1.
 */

/**
 * All input for the `deleteAccountByNodeId` mutation.
 * @typedef {Object} DeleteAccountByNodeIdInput
 * @property {string} [clientMutationId] - An arbitrary string value with no semantic meaning. Will be included in the
 * payload verbatim. May be used to track mutations by the client.
 * @property {string} nodeId - The globally unique `ID` which will identify a single `Account` to be deleted.
 */

/**
 * All input for the `deleteAccount` mutation.
 * @typedef {Object} DeleteAccountInput
 * @property {string} [clientMutationId] - An arbitrary string value with no semantic meaning. Will be included in the
 * payload verbatim. May be used to track mutations by the client.
 * @property {UUID} id - Id of account
 */

/**
 * All input for the `deleteAccountByEmail` mutation.
 * @typedef {Object} DeleteAccountByEmailInput
 * @property {string} [clientMutationId] - An arbitrary string value with no semantic meaning. Will be included in the
 * payload verbatim. May be used to track mutations by the client.
 * @property {string} email - Unique email of an account
 */

/**
 * The output of our delete `RoleScope` mutation.
 * @typedef {Object} DeleteRoleScopePayload
 * @property {string} [clientMutationId] - The exact same `clientMutationId` that was provided in the mutation input,
 * unchanged and unused. May be used by a client to track mutations.
 * @property {RoleScope} [roleScope] - The `RoleScope` that was deleted by this mutation.
 * @property {string} [deletedRoleScopeNodeId]
 * @property {Query} [query] - Our root query field type. Allows us to run any query from our mutation payload.
 * @property {RoleScopesEdge} [roleScopeEdge] - An edge for our `RoleScope`. May be used by Relay 1.
 */

/**
 * All input for the `deleteRoleScopeByRole` mutation.
 * @typedef {Object} DeleteRoleScopeByRoleInput
 * @property {string} [clientMutationId] - An arbitrary string value with no semantic meaning. Will be included in the
 * payload verbatim. May be used to track mutations by the client.
 * @property {Role} role
 */

/**
 * The output of our `authenticate` mutation.
 * @typedef {Object} AuthenticatePayload
 * @property {string} [clientMutationId] - The exact same `clientMutationId` that was provided in the mutation input,
 * unchanged and unused. May be used by a client to track mutations.
 * @property {JwtToken} [jwtToken]
 * @property {Query} [query] - Our root query field type. Allows us to run any query from our mutation payload.
 */

/**
 * A JSON Web Token defined by [RFC 7519](https://tools.ietf.org/html/rfc7519)
 * which securely represents claims between two parties.
 * @typedef {*} JwtToken
 */

/**
 * All input for the `authenticate` mutation.
 * @typedef {Object} AuthenticateInput
 * @property {string} [clientMutationId] - An arbitrary string value with no semantic meaning. Will be included in the
 * payload verbatim. May be used to track mutations by the client.
 * @property {string} email
 * @property {string} password
 */

/**
 * The output of our `changePassword` mutation.
 * @typedef {Object} ChangePasswordPayload
 * @property {string} [clientMutationId] - The exact same `clientMutationId` that was provided in the mutation input,
 * unchanged and unused. May be used by a client to track mutations.
 * @property {boolean} [boolean]
 * @property {Query} [query] - Our root query field type. Allows us to run any query from our mutation payload.
 */

/**
 * All input for the `changePassword` mutation.
 * @typedef {Object} ChangePasswordInput
 * @property {string} [clientMutationId] - An arbitrary string value with no semantic meaning. Will be included in the
 * payload verbatim. May be used to track mutations by the client.
 * @property {string} currentPassword
 * @property {string} newPassword
 */

/**
 * The output of our `registerAccount` mutation.
 * @typedef {Object} RegisterAccountPayload
 * @property {string} [clientMutationId] - The exact same `clientMutationId` that was provided in the mutation input,
 * unchanged and unused. May be used by a client to track mutations.
 * @property {JwtToken} [jwtToken]
 * @property {Query} [query] - Our root query field type. Allows us to run any query from our mutation payload.
 */

/**
 * All input for the `registerAccount` mutation.
 * @typedef {Object} RegisterAccountInput
 * @property {string} [clientMutationId] - An arbitrary string value with no semantic meaning. Will be included in the
 * payload verbatim. May be used to track mutations by the client.
 * @property {string} firstName
 * @property {string} email
 * @property {string} phone
 * @property {string} [lastName]
 * @property {string} [password]
 */
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A universally unique identifier as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122). */
  UUID: any;
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: any;
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any;
  /**
   * A JSON Web Token defined by [RFC 7519](https://tools.ietf.org/html/rfc7519)
   * which securely represents claims between two parties.
   */
  JwtToken: any;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'];
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** Reads and enables pagination through a set of `Account`. */
  accounts?: Maybe<AccountsConnection>;
  /** Reads and enables pagination through a set of `RoleScope`. */
  roleScopes?: Maybe<RoleScopesConnection>;
  account?: Maybe<Account>;
  accountByEmail?: Maybe<Account>;
  roleScopeByRole?: Maybe<RoleScope>;
  /** Get current logged-in account identified by JWT */
  currentAccount?: Maybe<Account>;
  /** Reads a single `Account` using its globally unique `ID`. */
  accountByNodeId?: Maybe<Account>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAccountsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AccountsOrderBy>>;
  condition?: Maybe<AccountCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryRoleScopesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<RoleScopesOrderBy>>;
  condition?: Maybe<RoleScopeCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAccountArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAccountByEmailArgs = {
  email: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRoleScopeByRoleArgs = {
  role: Role;
};


/** The root query type which gives access points into the data universe. */
export type QueryAccountByNodeIdArgs = {
  nodeId: Scalars['ID'];
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

/** A connection to a list of `Account` values. */
export type AccountsConnection = {
  __typename?: 'AccountsConnection';
  /** A list of `Account` objects. */
  nodes: Array<Account>;
  /** A list of edges which contains the `Account` and cursor to aid in pagination. */
  edges: Array<AccountsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Account` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A registered account */
export type Account = Node & {
  __typename?: 'Account';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Id of account */
  id: Scalars['UUID'];
  /** Role type associated with this account */
  role?: Maybe<Role>;
  /** First name from an account */
  firstName: Scalars['String'];
  /** Last name from an account */
  lastName?: Maybe<Scalars['String']>;
  /** Unique email of an account */
  email: Scalars['String'];
  /** Phone number of an account */
  phone: Scalars['String'];
  /** Timestamp of an account creation */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Timestamp of an update to account */
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Timestamp of the soft deletion of account */
  deletedAt?: Maybe<Scalars['Datetime']>;
};


export enum Role {
  User = 'USER',
  Admin = 'ADMIN'
}


/** A `Account` edge in the connection. */
export type AccountsEdge = {
  __typename?: 'AccountsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Account` at the end of the edge. */
  node: Account;
};


/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
};

/** Methods to use when ordering `Account`. */
export enum AccountsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A condition to be used against `Account` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type AccountCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `email` field. */
  email?: Maybe<Scalars['String']>;
};

/** A connection to a list of `RoleScope` values. */
export type RoleScopesConnection = {
  __typename?: 'RoleScopesConnection';
  /** A list of `RoleScope` objects. */
  nodes: Array<RoleScope>;
  /** A list of edges which contains the `RoleScope` and cursor to aid in pagination. */
  edges: Array<RoleScopesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `RoleScope` you could get from the connection. */
  totalCount: Scalars['Int'];
};

export type RoleScope = {
  __typename?: 'RoleScope';
  role?: Maybe<Role>;
  scopes?: Maybe<Array<Maybe<Scope>>>;
};

export enum Scope {
  Visitor = 'VISITOR',
  Manager = 'MANAGER'
}

/** A `RoleScope` edge in the connection. */
export type RoleScopesEdge = {
  __typename?: 'RoleScopesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `RoleScope` at the end of the edge. */
  node: RoleScope;
};

/** Methods to use when ordering `RoleScope`. */
export enum RoleScopesOrderBy {
  Natural = 'NATURAL',
  RoleAsc = 'ROLE_ASC',
  RoleDesc = 'ROLE_DESC'
}

/**
 * A condition to be used against `RoleScope` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type RoleScopeCondition = {
  /** Checks for equality with the object’s `role` field. */
  role?: Maybe<Role>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `RoleScope`. */
  createRoleScope?: Maybe<CreateRoleScopePayload>;
  /** Updates a single `Account` using its globally unique id and a patch. */
  updateAccountByNodeId?: Maybe<UpdateAccountPayload>;
  /** Updates a single `Account` using a unique key and a patch. */
  updateAccount?: Maybe<UpdateAccountPayload>;
  /** Updates a single `Account` using a unique key and a patch. */
  updateAccountByEmail?: Maybe<UpdateAccountPayload>;
  /** Updates a single `RoleScope` using a unique key and a patch. */
  updateRoleScopeByRole?: Maybe<UpdateRoleScopePayload>;
  /** Deletes a single `Account` using its globally unique id. */
  deleteAccountByNodeId?: Maybe<DeleteAccountPayload>;
  /** Deletes a single `Account` using a unique key. */
  deleteAccount?: Maybe<DeleteAccountPayload>;
  /** Deletes a single `Account` using a unique key. */
  deleteAccountByEmail?: Maybe<DeleteAccountPayload>;
  /** Deletes a single `RoleScope` using a unique key. */
  deleteRoleScopeByRole?: Maybe<DeleteRoleScopePayload>;
  /** Create a JWT for account identification and authorization with email & password */
  authenticate?: Maybe<AuthenticatePayload>;
  /** Change password of an existing account */
  changePassword?: Maybe<ChangePasswordPayload>;
  /** Register a single account */
  registerAccount?: Maybe<RegisterAccountPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateRoleScopeArgs = {
  input: CreateRoleScopeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountByNodeIdArgs = {
  input: UpdateAccountByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountArgs = {
  input: UpdateAccountInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountByEmailArgs = {
  input: UpdateAccountByEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRoleScopeByRoleArgs = {
  input: UpdateRoleScopeByRoleInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountByNodeIdArgs = {
  input: DeleteAccountByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountArgs = {
  input: DeleteAccountInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountByEmailArgs = {
  input: DeleteAccountByEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRoleScopeByRoleArgs = {
  input: DeleteRoleScopeByRoleInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationAuthenticateArgs = {
  input: AuthenticateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRegisterAccountArgs = {
  input: RegisterAccountInput;
};

/** The output of our create `RoleScope` mutation. */
export type CreateRoleScopePayload = {
  __typename?: 'CreateRoleScopePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `RoleScope` that was created by this mutation. */
  roleScope?: Maybe<RoleScope>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `RoleScope`. May be used by Relay 1. */
  roleScopeEdge?: Maybe<RoleScopesEdge>;
};


/** The output of our create `RoleScope` mutation. */
export type CreateRoleScopePayloadRoleScopeEdgeArgs = {
  orderBy?: Maybe<Array<RoleScopesOrderBy>>;
};

/** All input for the create `RoleScope` mutation. */
export type CreateRoleScopeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `RoleScope` to be created by this mutation. */
  roleScope: RoleScopeInput;
};

/** An input for mutations affecting `RoleScope` */
export type RoleScopeInput = {
  role?: Maybe<Role>;
  scopes?: Maybe<Array<Maybe<Scope>>>;
};

/** The output of our update `Account` mutation. */
export type UpdateAccountPayload = {
  __typename?: 'UpdateAccountPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Account` that was updated by this mutation. */
  account?: Maybe<Account>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Account`. May be used by Relay 1. */
  accountEdge?: Maybe<AccountsEdge>;
};


/** The output of our update `Account` mutation. */
export type UpdateAccountPayloadAccountEdgeArgs = {
  orderBy?: Maybe<Array<AccountsOrderBy>>;
};

/** All input for the `updateAccountByNodeId` mutation. */
export type UpdateAccountByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Account` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Account` being updated. */
  patch: AccountPatch;
};

/** Represents an update to a `Account`. Fields that are set will be updated. */
export type AccountPatch = {
  /** First name from an account */
  firstName?: Maybe<Scalars['String']>;
  /** Last name from an account */
  lastName?: Maybe<Scalars['String']>;
  /** Unique email of an account */
  email?: Maybe<Scalars['String']>;
  /** Phone number of an account */
  phone?: Maybe<Scalars['String']>;
  /** Timestamp of the soft deletion of account */
  deletedAt?: Maybe<Scalars['Datetime']>;
};

/** All input for the `updateAccount` mutation. */
export type UpdateAccountInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Account` being updated. */
  patch: AccountPatch;
  /** Id of account */
  id: Scalars['UUID'];
};

/** All input for the `updateAccountByEmail` mutation. */
export type UpdateAccountByEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Account` being updated. */
  patch: AccountPatch;
  /** Unique email of an account */
  email: Scalars['String'];
};

/** The output of our update `RoleScope` mutation. */
export type UpdateRoleScopePayload = {
  __typename?: 'UpdateRoleScopePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `RoleScope` that was updated by this mutation. */
  roleScope?: Maybe<RoleScope>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `RoleScope`. May be used by Relay 1. */
  roleScopeEdge?: Maybe<RoleScopesEdge>;
};


/** The output of our update `RoleScope` mutation. */
export type UpdateRoleScopePayloadRoleScopeEdgeArgs = {
  orderBy?: Maybe<Array<RoleScopesOrderBy>>;
};

/** All input for the `updateRoleScopeByRole` mutation. */
export type UpdateRoleScopeByRoleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `RoleScope` being updated. */
  patch: RoleScopePatch;
  role: Role;
};

/** Represents an update to a `RoleScope`. Fields that are set will be updated. */
export type RoleScopePatch = {
  role?: Maybe<Role>;
  scopes?: Maybe<Array<Maybe<Scope>>>;
};

/** The output of our delete `Account` mutation. */
export type DeleteAccountPayload = {
  __typename?: 'DeleteAccountPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Account` that was deleted by this mutation. */
  account?: Maybe<Account>;
  deletedAccountNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Account`. May be used by Relay 1. */
  accountEdge?: Maybe<AccountsEdge>;
};


/** The output of our delete `Account` mutation. */
export type DeleteAccountPayloadAccountEdgeArgs = {
  orderBy?: Maybe<Array<AccountsOrderBy>>;
};

/** All input for the `deleteAccountByNodeId` mutation. */
export type DeleteAccountByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Account` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteAccount` mutation. */
export type DeleteAccountInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Id of account */
  id: Scalars['UUID'];
};

/** All input for the `deleteAccountByEmail` mutation. */
export type DeleteAccountByEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Unique email of an account */
  email: Scalars['String'];
};

/** The output of our delete `RoleScope` mutation. */
export type DeleteRoleScopePayload = {
  __typename?: 'DeleteRoleScopePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `RoleScope` that was deleted by this mutation. */
  roleScope?: Maybe<RoleScope>;
  deletedRoleScopeNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `RoleScope`. May be used by Relay 1. */
  roleScopeEdge?: Maybe<RoleScopesEdge>;
};


/** The output of our delete `RoleScope` mutation. */
export type DeleteRoleScopePayloadRoleScopeEdgeArgs = {
  orderBy?: Maybe<Array<RoleScopesOrderBy>>;
};

/** All input for the `deleteRoleScopeByRole` mutation. */
export type DeleteRoleScopeByRoleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  role: Role;
};

/** The output of our `authenticate` mutation. */
export type AuthenticatePayload = {
  __typename?: 'AuthenticatePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  jwtToken?: Maybe<Scalars['JwtToken']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** All input for the `authenticate` mutation. */
export type AuthenticateInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
};

/** The output of our `changePassword` mutation. */
export type ChangePasswordPayload = {
  __typename?: 'ChangePasswordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  boolean?: Maybe<Scalars['Boolean']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `changePassword` mutation. */
export type ChangePasswordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

/** The output of our `registerAccount` mutation. */
export type RegisterAccountPayload = {
  __typename?: 'RegisterAccountPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  jwtToken?: Maybe<Scalars['JwtToken']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `registerAccount` mutation. */
export type RegisterAccountInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type CurrentAccountQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentAccountQuery = (
  { __typename?: 'Query' }
  & { currentAccount?: Maybe<(
    { __typename?: 'Account' }
    & CommonAccountPayloadFragment
  )> }
);

export type RegisterAccountMutationVariables = Exact<{
  firstName: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
}>;


export type RegisterAccountMutation = (
  { __typename?: 'Mutation' }
  & { registerAccount?: Maybe<(
    { __typename?: 'RegisterAccountPayload' }
    & Pick<RegisterAccountPayload, 'jwtToken'>
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword?: Maybe<(
    { __typename?: 'ChangePasswordPayload' }
    & Pick<ChangePasswordPayload, 'boolean'>
  )> }
);

export type UpdateAccountByIdMutationVariables = Exact<{
  id: Scalars['UUID'];
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
}>;


export type UpdateAccountByIdMutation = (
  { __typename?: 'Mutation' }
  & { updateAccount?: Maybe<(
    { __typename?: 'UpdateAccountPayload' }
    & { account?: Maybe<(
      { __typename?: 'Account' }
      & CommonAccountPayloadFragment
    )> }
  )> }
);

export type DeleteAccountByIdMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type DeleteAccountByIdMutation = (
  { __typename?: 'Mutation' }
  & { deleteAccount?: Maybe<(
    { __typename?: 'DeleteAccountPayload' }
    & { account?: Maybe<(
      { __typename?: 'Account' }
      & CommonAccountPayloadFragment
    )> }
  )> }
);

export type AuthenticateMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type AuthenticateMutation = (
  { __typename?: 'Mutation' }
  & { authenticate?: Maybe<(
    { __typename?: 'AuthenticatePayload' }
    & Pick<AuthenticatePayload, 'jwtToken'>
  )> }
);

export type CommonAccountPayloadFragment = (
  { __typename?: 'Account' }
  & Pick<Account, 'createdAt' | 'email' | 'firstName' | 'id' | 'lastName' | 'phone' | 'role' | 'updatedAt'>
);
