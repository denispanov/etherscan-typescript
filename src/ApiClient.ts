import { URL } from 'url';

export default abstract class ApiClient {
  private apiKey: string;

  private baseUrl: string;

  private module: string;

  constructor(apiKey: string, baseUrl: string, module: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.module = module;
  }

  protected async get<ResponseType>(url: URL): Promise<ResponseType> {
    url.searchParams.append('apikey', this.apiKey);
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Request failed: ${response.statusText}`);
    }

    const data: any = await response.json();
    if (data.status !== '1') {
      throw new Error(`Request failed: ${data.message} - ${data.result}`);
    }

    return data.result;
  }

  protected async post<ResponseType>(url: URL, body: any): Promise<ResponseType> {
    url.searchParams.append('apikey', this.apiKey);
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
    if (!response.ok) {
      throw new Error(`Request failed: ${response.statusText}`);
    }

    const data: any = await response.json();
    if (data.status !== '1') {
      throw new Error(`Request failed: ${data.message} - ${data.result}`);
    }

    return data.result;
  }

  protected createUrl() {
    const url = new URL(this.baseUrl);
    url.searchParams.append('apikey', this.apiKey);
    url.searchParams.append('module', this.module);
    return url;
  }
}
