import gql from 'graphql-tag';
export const CommonAccountPayload = gql`
    fragment commonAccountPayload on Account {
  createdAt
  email
  firstName
  id
  lastName
  loginByEmail
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
    mutation UpdateAccountById($id: UUID!, $email: String, $phone: String, $firstName: String, $lastName: String, $loginByEmail: Boolean) {
  updateAccount(
    input: {id: $id, patch: {email: $email, firstName: $firstName, lastName: $lastName, loginByEmail: $loginByEmail, phone: $phone}}
  ) {
    account {
      ...commonAccountPayload
    }
  }
}
    ${CommonAccountPayload}`;
export const UpdateAccountByEmail = gql`
    mutation UpdateAccountByEmail($email: String!, $phone: String, $firstName: String, $lastName: String, $loginByEmail: Boolean) {
  updateAccountByEmail(
    input: {email: $email, patch: {email: $email, firstName: $firstName, lastName: $lastName, loginByEmail: $loginByEmail, phone: $phone}}
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
export const DeleteAccountByEmail = gql`
    mutation DeleteAccountByEmail($email: String!) {
  deleteAccountByEmail(input: {email: $email}) {
    account {
      ...commonAccountPayload
    }
  }
}
    ${CommonAccountPayload}`;