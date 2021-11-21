import { prependHttp } from "./prependHttp";
const url = {
  full: "https://www.stackoverflow.com/",
  noHttp: "www.stackoverflow.com/",
  noWww: "stackoverflow.com/",
  not: "wowdotcom",
};

describe("prependHttp fn", () => {
  it("should return true if url with http & www supplied", () => {
    const inst = prependHttp(url.full);
    expect(inst).toBe(url.full);
  });

  it("should return true if url with no http supplied", () => {
    const inst = prependHttp(url.noHttp);
    expect(inst).toBe(url.full);
  });

  it("should return true if url with no www supplied", () => {
    const inst = prependHttp(url.noWww);
    expect(inst).toBe("https://stackoverflow.com/");
  });

  it("should return false if not url", () => {
    const inst = prependHttp(url.not);
    expect(inst).toBe("https://wowdotcom");
  });
});
