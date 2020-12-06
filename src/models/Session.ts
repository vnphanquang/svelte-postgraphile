import type { Role, Scope } from "/services/graphql/generated/types";

export default interface Session {
  claims: {
    role: Role,
    scopes: Scope[],
    id: string,
    name: string,
    exp: number,  // expiration time
    aud: string,  // audience
    iss: string,  // issuer
    iat: number,  // issued at
  }
}

export {};
