import { devImplementation } from "../src/lib/devImplementation";

describe("devImplementation", () => {
  it("should return a promise", () => {
    const result = devImplementation("unused path to package.json");
    expect(result).toBeInstanceOf(Promise);
  });

  it("should resolve to a string", async () => {
    const result = await devImplementation("anything");

    expect(result)
      .toBe(`In a production build this file will contain the licenses of your production dependencies.

For dev builds it only contains this text for the sake of build speed.`);
  });
});
