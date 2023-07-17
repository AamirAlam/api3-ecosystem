export * from "./Project";
export * from "./Auth";

export const ROLE = {
  ADMIN: "admin",
  WEBHOOK: "webhook",
  MODERATOR: "moderator",
  USER: "user",
} as const;
