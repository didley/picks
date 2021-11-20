import { responseWrapper } from "./responseWrapper";

const singleStubStub = {
  title: "get milk",
  completed: false,
  priority: 4,
  includedInLists: ["this week", "groceries"],
};

const multiStubStub = [
  {
    title: "get milk",
    completed: false,
    priority: 4,
    includedInLists: ["this week", "groceries"],
  },
  {
    title: "get eggs",
    completed: true,
    priority: 3,
    includedInLists: ["groceries", "completed"],
  },
];

describe("responseWrapper.js - testing stub helper", () => {
  describe("single item stub (object)", () => {
    it("appends _id property", () => {
      const instance = responseWrapper(singleStubStub);

      expect(instance).toEqual(
        expect.objectContaining({ _id: expect.any(String) })
      );
    });
    it("appends createdBy/updatedAt if options.timestamps is true", () => {
      const instance = responseWrapper(singleStubStub, { timestamps: true });

      expect(instance).toEqual(
        expect.objectContaining({
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        })
      );
    });
    it("appends additional properties if options.props object supplied", () => {
      const instance = responseWrapper(singleStubStub, {
        props: { customProperty: "customProperty" },
      });

      expect(instance).toEqual(
        expect.objectContaining({ customProperty: "customProperty" })
      );
    });
    it("throws if options.props is not object allows object and undefined", () => {
      // it throws on options.props array
      expect(() =>
        responseWrapper(singleStubStub, { props: ["array"] })
      ).toThrow();

      // it throws on options.props string
      expect(() =>
        responseWrapper(singleStubStub, { props: "string" })
      ).toThrow();

      // it throws on options.props number
      expect(() => responseWrapper(singleStubStub, { props: 4 })).toThrow();

      // it does not throw on options.props null
      expect(() =>
        responseWrapper(singleStubStub, { props: null })
      ).not.toThrow();

      // it does not throw on options.props object
      expect(() =>
        responseWrapper(singleStubStub, { props: { object: "object" } })
      ).not.toThrow();

      // it does not throw on options.props undefined
      expect(() =>
        responseWrapper(singleStubStub, { props: undefined })
      ).not.toThrow();
    });
  });

  describe("multiple item stub (array)", () => {
    it("appends unique _id if no options supplied to all items", () => {
      const instance = responseWrapper(multiStubStub);

      expect(instance[0]).toEqual(
        expect.objectContaining({ _id: expect.any(String) })
      );

      expect(instance[1]).toEqual(
        expect.objectContaining({ _id: expect.any(String) })
      );
    });
    it("appends createdBy/updatedAt if options.timestamp is true to all items", () => {
      const instance = responseWrapper(multiStubStub, { timestamps: true });

      expect(instance[0]).toEqual(
        expect.objectContaining({
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        })
      );

      expect(instance[1]).toEqual(
        expect.objectContaining({
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        })
      );
    });
    it("appends additional properties if options.props supplied to all items", () => {
      const instance = responseWrapper(multiStubStub, {
        props: { customProperty: "customProperty" },
      });

      expect(instance[0]).toEqual(
        expect.objectContaining({ customProperty: "customProperty" })
      );

      expect(instance[1]).toEqual(
        expect.objectContaining({ customProperty: "customProperty" })
      );
    });
  });
});
