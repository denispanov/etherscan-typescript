import Account from './Account';
import AccountExtended from './AccountExtended';
import Contract from './Contract';

export default abstract class Explorer {
  private apiKey: string;

  private baseUrl: string;

  public account: Account;

  public contract: Contract;

  constructor(apiKey: string, baseUrl: string, isEthereum = false) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.account = isEthereum
      ? new AccountExtended(this.apiKey, this.baseUrl)
      : new Account(this.apiKey, this.baseUrl);
    this.contract = new Contract(this.apiKey, this.baseUrl);
  }
}
