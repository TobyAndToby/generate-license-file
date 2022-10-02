import { devImplementation } from "../src/devImplementation";

describe("devImplementation", () => {
  it("should return a promise", () => {
    const result = devImplementation();
    expect(result).toBeInstanceOf(Promise);
  });

  it("should resolve to a string", async () => {
    const result = await devImplementation();

    expect(result)
      .toBe(`In a production build this file will contain the licenses of your production dependencies.

For dev builds it only contains this text for the sake of build speed.`);
  });
});
