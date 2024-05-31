// The belvo-js sdk is deprecated :C
// So we will use the fetch API to make requests to the Belvo API.

import {
  BELVO_BASE_URL,
  BELVO_SECRET_ID,
  BELVO_SECRET_PASSWORD,
} from "./constants";

class BelvoClient {
  private baseUrl: string;
  private auth: string;

  constructor() {
    this.baseUrl = BELVO_BASE_URL;
    this.auth = "Basic " + btoa(`${BELVO_SECRET_ID}:${BELVO_SECRET_PASSWORD}`);
  }

  private async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        authorization: this.auth,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  }

  public get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  public post<T>(endpoint: string, body: Record<string, unknown>): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }
}

export default BelvoClient;
