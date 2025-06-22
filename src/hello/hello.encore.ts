import { api } from "encore.dev/api";

export const hello = api(
  { method: "GET", path: "/hello", expose: true },
  async () => {
    return { message: "Hello from Encore standalone!" };
  }
);
