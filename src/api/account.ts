import client from '@services/graphql/apollo';
import { CurrentAccount, RegisterAccount, GetAllAccounts } from '@services/graphql/generated/documents/account';
import type {
  CommonAccountPayloadFragment,
  CurrentAccountQuery,
  CurrentAccountQueryVariables,
  RegisterAccountMutation,
  RegisterAccountMutationVariables,
  GetAllAccountsQuery,
  GetAllAccountsQueryVariables,
} from '@services/graphql/generated/types';

class AccountApi {
  static async register(variables: RegisterAccountMutationVariables):Promise<CommonAccountPayloadFragment|undefined> {
    try {
      const { data } = await client.mutate<RegisterAccountMutation, RegisterAccountMutationVariables>({
        mutation: RegisterAccount,
        variables,
      });
      const account = data && data.registerAccount && data.registerAccount.account;
      return account || undefined;
    } catch (e) {
      console.error('Api*Account*register: ', e);
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
      const currentAccount = data && data.currentAccount;
      return currentAccount || undefined;
    } catch (e) {
      console.error('Api*Account*current: ', e);
      if (e.graphQLErrors && e.graphQLErrors[0]) {
        throw new Error(e.graphQLErrors[0].message);
      } else {
        throw e;
      }
    }
  }

  static async getAllAccounts(): Promise<CommonAccountPayloadFragment[]> {
    try {
      const { data } = await client.query<GetAllAccountsQuery, GetAllAccountsQueryVariables>({
        query: GetAllAccounts,
      });
      const accounts = data && data.accounts && data.accounts.nodes;
      return accounts || [];
    } catch (e) {
      console.error('Api*Account*getAllAccounts: ', e);
      if (e.graphQLErrors && e.graphQLErrors[0]) {
        throw new Error(e.graphQLErrors[0].message);
      } else {
        throw e;
      }
    }
  }
}

export default AccountApi;
