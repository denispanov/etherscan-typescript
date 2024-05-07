import ApiClient from "./ApiClient";
import type {
  AccountWithBalance,
  GetTransactionsParams,
  InternalTransaction,
  Transaction,
} from "./types/Account.types";

export default class Account extends ApiClient {
  constructor(apiKey: string, baseUrl: string) {
    super(apiKey, baseUrl, "account");
  }

   /**
   * @param address - The address to query the balance for.
   * @returns The balance of the address in Wei.
   * @example 
   * const balance = await account.getBalance('0x123...');
   * console.log(balance);
   * // '1000000000000000000'
   */
   public async getBalance(address: string) {
    const url = this.createUrl();
    url.searchParams.append('action', 'balance');
    url.searchParams.append('address', address);
    url.searchParams.append('tag', 'latest');

    return await this.get<string>(url);
  }

  /**
   * Retrieves the balances of multiple addresses.
   * @param addresses - The addresses to query the balances for. Maximum of 20 addresses.
   * @returns an array of objects containing the address and the balance in Wei.
   * @example
   * const balances = await account.getBalances(['0x123...', '0x456...']);
   * console.log(balances);
   * // [
   * //   { account: '0x123...', balance: '1000000000000000000' },
   * //   { account: '0x456...', balance: '2000000000000000000' }
   * // ]
   */
  public async getBalances(addresses: string[]) {
    if(addresses.length > 20) {
      throw new Error('Maximum of 20 addresses allowed');
    }

    const url = this.createUrl();
    url.searchParams.append('action', 'balancemulti');
    url.searchParams.append('address', addresses.join(','));
    url.searchParams.append('tag', 'latest');

    return await this.get<AccountWithBalance[]>(url);
  }

  public async getTransactions(params: GetTransactionsParams) {
    const url = this.createUrl();
    url.searchParams.append('action', 'txlist');
    url.searchParams.append('address', params.address);
    url.searchParams.append('startblock', (params.startBlock ?? 0).toString());
    url.searchParams.append('endblock', (params.endBlock ?? 99999999).toString());
    url.searchParams.append('page', (params.page ?? 1).toString());
    url.searchParams.append('offset', (params.offset ?? 10).toString());
    url.searchParams.append('sort', params.sort ?? 'asc');

    console.log(url.toString());
    return await this.get<Transaction[]>(url);
  }

  public async getInternalTransactions(params: GetTransactionsParams) {
    const url = this.createUrl();
    url.searchParams.append('action', 'txlistinternal');
    url.searchParams.append('address', params.address);
    url.searchParams.append('startblock', (params.startBlock ?? 0).toString());
    url.searchParams.append('endblock', (params.endBlock ?? 99999999).toString());
    url.searchParams.append('page', (params.page ?? 1).toString());
    url.searchParams.append('offset', (params.offset ?? 10).toString());
    url.searchParams.append('sort', params.sort ?? 'asc');

    return await this.get<InternalTransaction[]>(url);
  }
}

