import gql from 'graphql-tag';

export const Authenticate = gql`
    mutation Authenticate($email: String!, $password: String!) {
  authenticate(input: {email: $email, password: $password}) {
    jwtToken
  }
}
    `;
export const AuthenticateByEmail = gql`
    mutation AuthenticateByEmail($email: String!) {
  authenticateByEmail(input: {email: $email}) {
    jwtToken
  }
}
    `;