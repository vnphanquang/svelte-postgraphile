import gql from 'graphql-tag';
export const CommonAccountPayload = gql`
    fragment commonAccountPayload on Account {
  createdAt
  email
  firstName
  id
  lastName
  role
  updatedAt
}
    `;
export const CurrentAccount = gql`
    query CurrentAccount {
  currentAccount {
    ...commonAccountPayload
  }
}
    ${CommonAccountPayload}`;
export const RegisterAccount = gql`
    mutation RegisterAccount($firstName: String!, $email: String!, $lastName: String, $password: String) {
  registerAccount(
    input: {firstName: $firstName, email: $email, lastName: $lastName, password: $password}
  ) {
    account {
      ...commonAccountPayload
    }
  }
}
    ${CommonAccountPayload}`;
export const ChangePassword = gql`
    mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
  changePassword(
    input: {currentPassword: $currentPassword, newPassword: $newPassword}
  ) {
    boolean
  }
}
    `;
export const UpdateAccountById = gql`
    mutation UpdateAccountById($id: UUID!, $email: String, $firstName: String, $lastName: String) {
  updateAccount(
    input: {id: $id, patch: {email: $email, firstName: $firstName, lastName: $lastName}}
  ) {
    account {
      ...commonAccountPayload
    }
  }
}
    ${CommonAccountPayload}`;
export const DeleteAccountById = gql`
    mutation DeleteAccountById($id: UUID!) {
  deleteAccount(input: {id: $id}) {
    account {
      ...commonAccountPayload
    }
  }
}
    ${CommonAccountPayload}`;
export const GetAllAccounts = gql`
    query GetAllAccounts {
  accounts {
    nodes {
      ...commonAccountPayload
    }
  }
}
    ${CommonAccountPayload}`;