import "@testing-library/jest-dom";
import BelvoClient from "@/lib/belvo-client";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("BelvoClient", () => {
  let client: BelvoClient;

  beforeEach(() => {
    client = new BelvoClient();
    fetchMock.resetMocks();
  });

  it("should create a new BelvoClient instance", () => {
    expect(client).toBeInstanceOf(BelvoClient);
  });

  it("should have a baseUrl property", () => {
    expect(client).toHaveProperty("baseUrl");
  });

  it("should have an auth property", () => {
    expect(client).toHaveProperty("auth");
  });

  it("should have a request method", () => {
    expect(client).toHaveProperty("request");
  });

  it("should have a get method", () => {
    expect(client).toHaveProperty("get");
  });

  it("should have a post method", () => {
    expect(client).toHaveProperty("post");
  });

  it("should make a GET request", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ results: [] }));

    const response = await client.get("/api/v1/links/");
    expect(response).toHaveProperty("results");
  });

  it("should make a POST request", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ id: "1234" }));

    const response = await client.post("/api/v1/links/", {
      link: "sandbox_link",
      username: "sandbox_user",
      password: "sandbox_password",
    });
    expect(response).toHaveProperty("id");
  });
});
