import { URL } from "url";

export default abstract class ApiClient {
  constructor(private apiKey: string, private baseUrl: string, private module: string) {}

  protected async get<ResponseType>(url: URL): Promise<ResponseType> {
    url.searchParams.append('apikey', this.apiKey);
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Request failed: ${response.statusText}`);
    }

    const data: any = await response.json();
    if (data.status !== "1") {
      console.log(data);
      throw new Error(`Request failed: ${data.message} - ${data.result}`);
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

