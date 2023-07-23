export * from "./Project";
export * from "./Auth";

export const ROLE = {
  ADMIN: "admin",
  WEBHOOK: "webhook",
  MODERATOR: "moderator",
  USER: "user",
} as const;

export const UPLOAD_TYPE = {
  article: "article",
  project: "project",
};
