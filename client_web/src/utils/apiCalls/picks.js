import { client } from "./_client";

export const getLinkPreview = (url) => client.get(`/picks/preview?url=${url}`);
