import { client } from "./_client";

export const getProfileSummary = (username) =>
  client.get(`/user/profile?un=${username}`);

export const updateProfileSummary = (updatedData) =>
  client.put(`/user`, { body: updatedData });
