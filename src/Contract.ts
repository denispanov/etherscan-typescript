import ApiClient from './ApiClient';

export default class Contract extends ApiClient {
  constructor(apiKey: string, baseUrl: string) {
    super(apiKey, baseUrl, 'contract');
  }

  public async getContractAbi(address: string): Promise<string> {
    const url = this.createUrl();
    url.searchParams.append('action', 'getabi');
    url.searchParams.append('address', address);

    return this.get<string>(url);
  }
}
