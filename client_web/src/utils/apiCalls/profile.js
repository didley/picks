import { client } from "./_client";

export const getProfileSummary = (username) =>
  client.get(`/user/profile?un=${username}`);
