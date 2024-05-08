import ApiClient from '../ApiClient';
import type {
  AccountWithBalance,
  ERC20TransferEvent,
  TransferEventParams,
  Erc721TransferEvent,
  getInternalTransactionsByBlockRangeParams,
  GetTransactionsParams,
  InternalTransaction,
  Transaction,
  ERC1155TransferEvent,
} from './Account.types';

export default class Account extends ApiClient {
  constructor(apiKey: string, baseUrl: string) {
    super(apiKey, baseUrl, 'account');
  }

  /**
   * @param address - The address to query the balance for.
   * @returns The balance of the address in Wei.
   * @example
   * const balance = await account.getBalance('0x123...');
   * console.log(balance); // '1000000000000000000'
   */
  public async getBalance(address: string) {
    const url = this.createUrl();
    url.searchParams.append('action', 'balance');
    url.searchParams.append('address', address);
    url.searchParams.append('tag', 'latest');

    return this.get<string>(url);
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
    if (addresses.length > 20) {
      throw new Error('Maximum of 20 addresses allowed');
    }

    const url = this.createUrl();
    url.searchParams.append('action', 'balancemulti');
    url.searchParams.append('address', addresses.join(','));
    url.searchParams.append('tag', 'latest');

    return this.get<AccountWithBalance[]>(url);
  }

  /**
   * Retrieves transactions for a given address.
   * @param params.address - The address to query transactions for.
   * @param params.startBlock - The start block to query transactions from. Default is 0.
   * @param params.endBlock - The end block to query transactions to. Default is 99999999.
   * @param params.page - The page number. Default is 1.
   * @param params.offset - The number of transactions to return. Default is 10.
   * @param params.sort - The sort order. Either 'asc' or 'desc'. Default is 'asc'.
   * @returns An array of transactions.
   */
  public async getTransactions(params: GetTransactionsParams) {
    const url = this.createUrl();
    url.searchParams.append('action', 'txlist');
    url.searchParams.append('address', params.address);
    url.searchParams.append('startblock', (params.startBlock ?? 0).toString());
    url.searchParams.append('endblock', (params.endBlock ?? 99999999).toString());
    url.searchParams.append('page', (params.page ?? 1).toString());
    url.searchParams.append('offset', (params.offset ?? 10).toString());
    url.searchParams.append('sort', params.sort ?? 'asc');

    return this.get<Transaction[]>(url);
  }

  /**
   * Retrieves transactions by transaction hash.
   * @param params.txHash - The transaction hash to query transactions for.
   * @param params.startBlock - The start block to query transactions from. Default is 0.
   * @param params.endBlock - The end block to query transactions to. Default is 99999999.
   * @param params.page - The page number. Default is 1.
   * @param params.offset - The number of transactions to return. Default is 10.
   * @param params.sort - The sort order. Either 'asc' or 'desc'. Default is 'asc'.
   * @returns An array of transactions associated with the given transaction hash.
  */
  public async getInternalTransactions(params: GetTransactionsParams) {
    const url = this.createUrl();
    url.searchParams.append('action', 'txlistinternal');
    url.searchParams.append('address', params.address);
    url.searchParams.append('startblock', (params.startBlock ?? 0).toString());
    url.searchParams.append('endblock', (params.endBlock ?? 99999999).toString());
    url.searchParams.append('page', (params.page ?? 1).toString());
    url.searchParams.append('offset', (params.offset ?? 10).toString());
    url.searchParams.append('sort', params.sort ?? 'asc');

    return this.get<InternalTransaction[]>(url);
  }

  /**
   * Retrieves internal transactions by transaction hash.
   * @param txHash - The transaction hash to query internal transactions for.
   * @returns An array of internal transactions associated with the given transaction hash.
  */
  public async getInternalTransactionsByTxHash(txHash: string) {
    const url = this.createUrl();
    url.searchParams.append('action', 'txlistinternal');
    url.searchParams.append('txhash', txHash);

    return this.get<InternalTransaction[]>(url);
  }

  /**
   * Retrieves internal transactions within a specific block range.
   * @param params.startBlock - The start block to query internal transactions from. Default is 0.
   * @param params.endBlock - The end block to query internal transactions to. Default is 99999999.
   * @param params.page - The page number. Default is 1.
   * @param params.offset - The number of internal transactions to return. Default is 10.
   * @param params.sort - The sort order. Either 'asc' or 'desc'. Default is 'asc'.
   * @returns An array of internal transactions within the specified block range.
   */
  public async getInternalTransactionsByBlockRange(
    params: getInternalTransactionsByBlockRangeParams,
  ) {
    const url = this.createUrl();
    url.searchParams.append('action', 'txlistinternal');
    url.searchParams.append('startblock', (params.startBlock ?? 0).toString());
    url.searchParams.append('endblock', (params.endBlock ?? 99999999).toString());
    url.searchParams.append('page', (params.page ?? 1).toString());
    url.searchParams.append('offset', (params.offset ?? 10).toString());
    url.searchParams.append('sort', params.sort ?? 'asc');

    return this.get<InternalTransaction[]>(url);
  }

  /**
   * Retrieves ERC20 token transfer events for a given address and contract.
   * At least one of address or contractAddress must be provided.
   * @params params.contractAddress - The contract address to query ERC20 transfer events for.
   * @params params.address - The address to query ERC20 transfer events for.
   * @params param.startBlock - The start block to query ERC20 transfer events from. Default is 0.
   * @params param.endBlock - The end block to query ERC20 transfer events to. Default is 99999999.
   * @params param.page - The page number. Default is 1.
   * @params param.offset - The number of ERC20 transfer events to return. Default is 10.
   * @params param.sort - The sort order. Either 'asc' or 'desc'. Default is 'asc'.
   * @returns An array of ERC20 transfer events.
  */
  public async getErc20TransferEvents(params: TransferEventParams) {
    if (!params.address && !params.contractAddress) {
      throw new Error('Either address or contractAddress must be provided');
    }

    const url = this.createUrl();
    url.searchParams.append('module', 'account');
    url.searchParams.append('action', 'tokentx');

    if (params.contractAddress) {
      url.searchParams.append('contractaddress', params.contractAddress);
    }
    if (params.address) {
      url.searchParams.append('address', params.address);
    }

    url.searchParams.append('page', (params.page ?? 1).toString());
    url.searchParams.append('offset', (params.offset ?? 10).toString());
    url.searchParams.append('startblock', (params.startBlock ?? 0).toString());
    url.searchParams.append('endblock', (params.endBlock ?? 99999999).toString());
    url.searchParams.append('sort', params.sort ?? 'asc');

    return this.get<ERC20TransferEvent[]>(url);
  }

  /**
   * Retrieves ERC721 token transfer events for a given address and contract.
   * At least one of address or contractAddress must be provided.
   * @params params.contractAddress - The contract address to query ERC721 transfer events for.
   * @params params.address - The address to query ERC721 transfer events for.
   * @params params.startBlock - The start block to query transfer events from. Default is 0.
   * @params params.endBlock - The end block to query transfer events to. Default is 99999999.
   * @params params.page - The page number. Default is 1.
   * @params params.offset - The number of transfer events to return. Default is 10.
   * @params params.sort - The sort order. Either 'asc' or 'desc'. Default is 'asc'.
   * @returns An array of ERC721 transfer events.
   */
  public async getErc721TransferEvents(params: TransferEventParams) {
    if (!params.address && !params.contractAddress) {
      throw new Error('Either address or contractAddress must be provided');
    }

    const url = this.createUrl();
    url.searchParams.append('module', 'account');
    url.searchParams.append('action', 'tokennfttx');

    if (params.contractAddress) {
      url.searchParams.append('contractaddress', params.contractAddress);
    }
    if (params.address) {
      url.searchParams.append('address', params.address);
    }

    url.searchParams.append('page', (params.page ?? 1).toString());
    url.searchParams.append('offset', (params.offset ?? 10).toString());
    url.searchParams.append('startblock', (params.startBlock ?? 0).toString());
    url.searchParams.append('endblock', (params.endBlock ?? 99999999).toString());
    url.searchParams.append('sort', params.sort ?? 'asc');

    return this.get<Erc721TransferEvent[]>(url);
  }

  /**
 * Retrieves ERC1155 token transfer events for a given address and contract.
 * At least one of address or contractAddress must be provided.
 * @params params.contractAddress - The contract address to query ERC1155 transfer events for.
 * @params params.address - The address to query ERC1155 transfer events for.
 * @params params.startBlock - The start block to query transfer events from. Default is 0.
 * @params params.endBlock - The end block to query transfer events to. Default is 99999999.
 * @params params.page - The page number. Default is 1.
 * @params params.offset - The number of transfer events to return. Default is 10.
 * @params params.sort - The sort order. Either 'asc' or 'desc'. Default is 'asc'.
 * @returns An array of ERC1155 transfer events.
 */
  public async getErc1155TransferEvents(params: TransferEventParams) {
    if (!params.address && !params.contractAddress) {
      throw new Error('Either address or contractAddress must be provided');
    }

    const url = this.createUrl();
    url.searchParams.append('module', 'account');
    url.searchParams.append('action', 'token1155tx');

    if (params.contractAddress) {
      url.searchParams.append('contractaddress', params.contractAddress);
    }
    if (params.address) {
      url.searchParams.append('address', params.address);
    }

    url.searchParams.append('page', (params.page ?? 1).toString());
    url.searchParams.append('offset', (params.offset ?? 10).toString());
    url.searchParams.append('startblock', (params.startBlock ?? 0).toString());
    url.searchParams.append('endblock', (params.endBlock ?? 99999999).toString());
    url.searchParams.append('sort', params.sort ?? 'asc');

    return this.get<ERC1155TransferEvent[]>(url);
  }

  /**
   * Retrieves the balance of an Ethereum address at a specific block height.
   * Only available on API Pro tier.
   * @param address - The Ethereum address to check the balance for.
   * @param blockNumber - The block number at which the balance is queried.
   * @returns The balance of the address at the specified block height in Wei as a string.
   * @note This endpoint is throttled to 2 calls per second, regardless of API Pro tier.
   */
  public async getHistoricalEthBalance(address: string, blockNumber: number) {
    const url = this.createUrl();
    url.searchParams.append('module', 'account');
    url.searchParams.append('action', 'balancehistory');
    url.searchParams.append('address', address);
    url.searchParams.append('blockno', blockNumber.toString());

    return this.get<string>(url);
  }
}
