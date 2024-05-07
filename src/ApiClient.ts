import { URL } from "url";

export default abstract class ApiClient {
  constructor(private apiKey: string, private baseUrl: string, private module: string) {}

  protected async get<ResponseType>(url: URL): Promise<ResponseType> {
    url.searchParams.append('apikey', this.apiKey);
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Failed to fetch from Etherscan: ${response.statusText}`);
    }

    const data = await response.json() as any; // eslint-disable-line @typescript-eslint/no-explicit-any
    if (data.status !== "1") {
      throw new Error(`Error from Etherscan: ${data.message}`);
    }

    return data.result;
  }

  protected createUrl() {
    const url =  new URL(this.baseUrl);
    url.searchParams.append('apikey', this.apiKey);
    url.searchParams.append('module', this.module);
    return url;
  }
}

