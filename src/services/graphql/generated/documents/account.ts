import gql from 'graphql-tag';
export const CommonAccountPayload = gql`
    fragment commonAccountPayload on Account {
  createdAt
  email
  firstName
  id
  lastName
  phone
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
    mutation RegisterAccount($firstName: String!, $email: String!, $phone: String!, $lastName: String, $password: String) {
  registerAccount(
    input: {firstName: $firstName, email: $email, phone: $phone, lastName: $lastName, password: $password}
  ) {
    jwtToken
  }
}
    `;
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
    mutation UpdateAccountById($id: UUID!, $email: String, $phone: String, $firstName: String, $lastName: String) {
  updateAccount(
    input: {id: $id, patch: {email: $email, firstName: $firstName, lastName: $lastName, phone: $phone}}
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