import Account from './account/Account';
import AccountEthereum from './account/AccountEthereum';
import Contract from './Contract';
import AccountL1 from './account/AccountL1';

export default abstract class Explorer {
  private apiKey: string;

  private baseUrl: string;

  public account: Account;

  public contract: Contract;

  constructor(apiKey: string, baseUrl: string, isL1: boolean, isEthereum: boolean) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    if (isEthereum) {
      this.account = new AccountEthereum(this.apiKey, this.baseUrl);
    } else if (isL1) {
      this.account = new AccountL1(this.apiKey, this.baseUrl);
    } else {
      this.account = new Account(this.apiKey, this.baseUrl);
    }
    this.contract = new Contract(this.apiKey, this.baseUrl);
  }
}
