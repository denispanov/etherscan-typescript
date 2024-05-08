import Account from './Account';
import type {
  GetBlocksByAddressParams,
  GetBeaconChainWithdrawalsParams,
  BeaconChainWithdrawal,
} from './types/Account.types';

/**
 * This includes all the functionality of the Account class,
 * but with additional methods only relevant to Ethereum.
 */
export default class AccountExtended extends Account {
  /**
   * Retrieves blocks validated (mined) by an address.
   * @param params.address - The address of the miner.
   * @param params.blockType - The type of blocks to retrieve: 'blocks' or 'uncles'.
   * @param params.page - The page number. Default is 1.
   * @param params.offset - The number of blocks to return. Default is 10.
   * @returns An array of blocks mined by the given address.
  */
  public async getBlocksValidatedByAddress(params: GetBlocksByAddressParams) {
    const url = this.createUrl();
    url.searchParams.append('module', 'account');
    url.searchParams.append('action', 'getminedblocks');
    url.searchParams.append('address', params.address);
    url.searchParams.append('blocktype', params.blockType);
    url.searchParams.append('page', (params.page ?? 1).toString());
    url.searchParams.append('offset', (params.offset ?? 10).toString());

    return this.get(url);
  }

  /**
   * Retrieves beacon chain withdrawals made to an address.
   * @param params.address - The address to check for beacon withdrawals.
   * @param params.startBlock - The start block number to begin the search. Default is 0.
   * @param params.endBlock - The end block number to end the search. Default is 99999999.
   * @param params.page - The page number for pagination. Default is 1.
   * @param params.offset - The number of transactions per page. Default is 10.
   * @param params.sort - The sorting order, either 'asc' or 'desc'. Default is 'asc'.
   * @returns An array of beacon chain withdrawals.
   */
  public async getBeaconChainWithdrawals(params: GetBeaconChainWithdrawalsParams) {
    const url = this.createUrl();
    url.searchParams.append('module', 'account');
    url.searchParams.append('action', 'txsBeaconWithdrawal');
    url.searchParams.append('address', params.address);
    url.searchParams.append('startblock', (params.startBlock ?? 0).toString());
    url.searchParams.append('endblock', (params.endBlock ?? 99999999).toString());
    url.searchParams.append('page', (params.page ?? 1).toString());
    url.searchParams.append('offset', (params.offset ?? 100).toString());
    url.searchParams.append('sort', params.sort ?? 'asc');

    return this.get<BeaconChainWithdrawal[]>(url);
  }
}
