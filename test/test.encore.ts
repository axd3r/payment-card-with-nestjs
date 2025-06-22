import { api } from "encore.dev";

export const hello = api(
  { method: "GET", path: "/hello", expose: true },
  async () => {
    return { message: "Hello from Encore!" };
  }
);
