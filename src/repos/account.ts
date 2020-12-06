import client from '@services/graphql/apollo';
import { CurrentAccount, RegisterAccount } from '@services/graphql/generated/documents/account';
import type { CommonAccountPayloadFragment, CurrentAccountQuery, CurrentAccountQueryVariables, RegisterAccountMutation, RegisterAccountMutationVariables } from '@services/graphql/generated/types';

class AccountRepo {
  static async register(variables: RegisterAccountMutationVariables):Promise<CommonAccountPayloadFragment|undefined> {
    try {
      const { data } = await client.mutate<RegisterAccountMutation, RegisterAccountMutationVariables>({
        mutation: RegisterAccount,
        variables,
      });
      if (data && data.registerAccount && data.registerAccount.account) {
        return data.registerAccount.account;
      }
      return undefined;
    } catch (e) {
      console.error('Repo*Account*register: ', e);
      if (e.graphQLErrors && e.graphQLErrors[0]) {
        throw new Error(e.graphQLErrors[0].message);
      } else {
        throw e;
      }
    }
  }

  static async current():Promise<CommonAccountPayloadFragment|undefined> {
    try {
      const { data } = await client.query<CurrentAccountQuery, CurrentAccountQueryVariables>({
        query: CurrentAccount,
      });
      if (data && data.currentAccount) {
        return data.currentAccount;
      } else {
        return undefined;
      }
    } catch (e) {
      console.error('Repo*Account*current: ', e);
      if (e.graphQLErrors && e.graphQLErrors[0]) {
        throw new Error(e.graphQLErrors[0].message);
      } else {
        throw e;
      }
    }
  }
}

export default AccountRepo;
