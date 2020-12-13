import { RequestInit } from '@api/base';
import ClientConfig from '@config/client';
import type Session from '@models/Session';
import type {
  AuthenticateMutation,
  AuthenticateMutationVariables,
  GetScopesByRoleQuery,
  GetScopesByRoleQueryVariables,
  Role,
  Scope,
} from '@services/graphql/generated/types';
import { Authenticate, GetScopesByRole } from '@services/graphql/generated/documents/auth';
import apolloClient from '@services/graphql/apollo';

class AuthApi {
  static BASE_URL: string = `${ClientConfig.api.url}${ClientConfig.api.routes.auth}`

  static async login(email: string, password: string): Promise<Session> {
    try {
      const response: Response = await fetch(`${AuthApi.BASE_URL}`, {
        ...RequestInit, 
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (response.ok && response.status === 200) {
        const session: Session = await response.json();
        return session;
      } else {
        console.error(`response.ok? ${response.ok}, response.status? ${response.status}`)
        const body = await response.json();
        throw new Error(body.error);
      }
    } catch (e) {
      console.error('Api*Auth*loginWithEmail', e);
      throw e;
    }
  }

  static async logout(): Promise<true> {
    try {
      const response: Response = await fetch(`${AuthApi.BASE_URL}`, {
        ...RequestInit, 
        method: 'DELETE',
      });
      if (response.ok && response.status === 200) {
        return true;
      } else {
        console.error(`response.ok? ${response.ok}, response.status? ${response.status}`)
        const body = await response.json();
        throw new Error(body.error);
      }
      } catch (e) {
      console.error('Api*Auth*logout', e);
      throw e;
    }
  }

  static async authenticate(email: string, password: string): Promise<string|undefined> {
    try {
      const { data } = await apolloClient.mutate<AuthenticateMutation, AuthenticateMutationVariables>({
        mutation: Authenticate,
        variables: {
          email,
          password,
        },
      });
      const jwt = data && data.authenticate && data.authenticate.jwtToken;
      return jwt || undefined;
    } catch (e) {
      console.error('Api*Account*register: ', e);
      if (e.graphQLErrors && e.graphQLErrors[0]) {
        throw new Error(e.graphQLErrors[0].message);
      } else {
        throw e;
      }
    }
  }

  static async getScopes(role: Role): Promise<Scope[]> {
    try {
      role = role.toUpperCase() as Role;
      const { data } = await apolloClient.query<GetScopesByRoleQuery, GetScopesByRoleQueryVariables>({
        query: GetScopesByRole,
        variables: {
          role,
        },
      });
      const scopes = data && data.roleScopeByRole && data.roleScopeByRole.scopes;
      return scopes as Scope[] || [];
    } catch (e) {
      console.error('Api*Account*register: ', e);
      if (e.graphQLErrors && e.graphQLErrors[0]) {
        throw new Error(e.graphQLErrors[0].message);
      } else {
        throw e;
      }
    }
  }
}

export default AuthApi;
