import ApiClient from "./ApiClient";
import type {
  GetBalancesResponse,
  GetTransactionsParams,
  GetTransactionsResponse,
} from "./types/Account";

export default class Account extends ApiClient {
  constructor(apiKey: string, baseUrl: string) {
    super(apiKey, baseUrl, "account");
  }

  public async getBalance(address: string): Promise<string> {
    const url = this.createUrl();
    url.searchParams.append('action', 'balance');
    url.searchParams.append('address', address);
    url.searchParams.append('tag', 'latest');

    return await this.get<string>(url);
  }

  public async getBalances(addresses: string[]): Promise<GetBalancesResponse> {
    const url = this.createUrl();
    url.searchParams.append('action', 'balancemulti');
    url.searchParams.append('address', addresses.join(','));
    url.searchParams.append('tag', 'latest');

    return await this.get<GetBalancesResponse>(url);
  }

  public async getTransactions(params: GetTransactionsParams): Promise<GetTransactionsResponse> {
    const url = this.createUrl();
    url.searchParams.append('action', 'txlist');
    url.searchParams.append('address', params.address);
    url.searchParams.append('startblock', (params.startBlock ?? 0).toString());
    url.searchParams.append('endblock', (params.endBlock ?? 99999999).toString());
    url.searchParams.append('page', (params.page ?? 1).toString());
    url.searchParams.append('offset', (params.offset ?? 10).toString());
    url.searchParams.append('sort', params.sort ?? 'asc');

    return await this.get<GetTransactionsResponse>(url);
  }
}

