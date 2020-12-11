import type { Role, Scope } from "/services/graphql/generated/types";

export interface JWTClaims {
  role: Role,
  id: string,
  name: string,
  exp: number,  // expiration time
  aud: string,  // audience
  iss: string,  // issuer
  iat: number,  // issued at
}
export default interface Session {
  claims: JWTClaims,
  scopes: Scope[],
}

export {};
