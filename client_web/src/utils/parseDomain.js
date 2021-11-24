import psl from "psl";
import { prependHttp } from "utils/prependHttp";

export const parseDomain = (url) => {
  try {
    const httpUrl = prependHttp(url);
    const { hostname } = new URL(httpUrl);
    const { domain } = psl.parse(hostname);

    return domain;
  } catch (err) {
    return "";
  }
};
