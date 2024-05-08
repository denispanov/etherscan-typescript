import Account from './Account';
import type {
  GetBlocksByAddressParams,
} from './Account.types';

/**
 * This includes all the functionality of the Account class,
 * but with additional methods only relevant for Layer 1 blockchains.
 */
export default class AccountL1 extends Account {
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
}
