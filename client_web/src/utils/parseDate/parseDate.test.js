import { parseDate } from ".";

// m30s (minus30seconds)
const dateStub = {
  now: new Date(Date.UTC(2021, 10, 11, 12, 30, 0)),
  m30s: new Date(Date.UTC(2021, 10, 11, 12, 29, 30)),
  m1m: new Date(Date.UTC(2021, 10, 11, 12, 29, 0)),
  m30m: new Date(Date.UTC(2021, 10, 11, 12, 0, 0)),
  m1h: new Date(Date.UTC(2021, 10, 11, 11, 30, 0)),
  m2h: new Date(Date.UTC(2021, 10, 11, 10, 30, 0)),
  m23h: new Date(Date.UTC(2021, 10, 10, 13, 30, 0)),
  m24h: new Date(Date.UTC(2021, 10, 10, 12, 30, 0)),
  yd: new Date(Date.UTC(2021, 10, 10, 0, 0, 0)),
  m2d: new Date(Date.UTC(2021, 10, 9, 12, 30, 0)),
  m4w: new Date(Date.UTC(2021, 9, 11, 12, 30, 0)),
  m1y: new Date(Date.UTC(2020, 10, 11, 12, 30, 0)),
  m10y: new Date(Date.UTC(2012, 10, 11, 12, 30, 0)),
};

describe("parseDate fn", () => {
  beforeEach(() => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(dateStub.now);
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  it("should return 'now' only if date within 1min", () => {
    expect(parseDate(dateStub.m30s)).toBe("now");
    expect(parseDate(dateStub.m1m)).toBe("now");
    expect(parseDate(dateStub.m30m)).not.toBe("now");
  });

  it("should return '##m ago' only if date within 1hr", () => {
    expect(parseDate(dateStub.m30m)).toBe("30m ago");
    expect(parseDate(dateStub.m1h)).not.toBe("60m ago");
  });

  it("should return '##h ago' only if date within 24hr", () => {
    expect(parseDate(dateStub.m1h)).toBe("1h ago");
    expect(parseDate(dateStub.m23h)).toBe("23h ago");
  });
  it("should return 'yesterday' if yesterday", () => {
    expect(parseDate(dateStub.m24h)).toBe("yesterday");
    expect(parseDate(dateStub.yd)).toBe("yesterday");
    expect(parseDate(dateStub.m2d)).not.toBe("yesterday");
  });
  it("should return d MMM only if within this year", () => {
    expect(parseDate(dateStub.m2d)).toBe("9 Nov");
    expect(parseDate(dateStub.m4w)).toBe("11 Oct");
  });
  it("should return dd MMM YY if date is over a year", () => {
    expect(parseDate(dateStub.m10y)).toBe("11 Nov 12");
  });
  it("should return empty string on undefined/invalid date argument", () => {
    expect(parseDate()).toBe("");
    expect(parseDate(NaN)).toBe("");
    expect(parseDate("hi")).toBe("");
  });
});
