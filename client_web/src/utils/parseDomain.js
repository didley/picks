import psl from "psl";

export const parseDomain = (url) => {
  try {
    const { hostname } = new URL(url);
    const { domain } = psl.parse(hostname);
    return domain;
  } catch (err) {
    return "";
  }
};
