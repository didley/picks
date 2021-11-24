export const prependHttp = (url) =>
  !/^https?:\/\//i.test(url) ? `https://${url}` : url;
