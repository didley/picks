import psl from "psl";
import prependHttp from "prepend-http";

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
