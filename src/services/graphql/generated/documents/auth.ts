import gql from 'graphql-tag';

export const Authenticate = gql`
    mutation Authenticate($email: String!, $password: String!) {
  authenticate(input: {email: $email, password: $password}) {
    jwtToken
  }
}
    `;
export const GetScopesByRole = gql`
    query GetScopesByRole($role: Role!) {
  roleScopeByRole(role: $role) {
    scopes
    role
  }
}
    `;