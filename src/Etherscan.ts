import Account from './Account';
import Contract from './Contract';

const DEFAULT_URL = 'https://api.etherscan.io/api';
export default class EtherScan {
  private apiKey: string;

  private baseUrl: string;

  public account: Account;

  public contract: Contract;

  constructor(apiKey: string, baseUrl?: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl || DEFAULT_URL;
    this.account = new Account(this.apiKey, this.baseUrl);
    this.contract = new Contract(this.apiKey, this.baseUrl);
  }
}
