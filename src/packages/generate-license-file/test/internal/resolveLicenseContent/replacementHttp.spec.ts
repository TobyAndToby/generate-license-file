import { replacementHttp } from "packages/generate-license-file/src/lib/internal/resolveLicenseContent/replacementHttp";
import { fetchString } from "../../../src/lib/utils/http.utils";

jest.mock("../../../src/lib/utils/http.utils");

describe("replacementHttp", () => {
  const mockFetchString = jest.mocked(fetchString);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => jest.restoreAllMocks());

  it("should not fetch the content if the location is not a url", async () => {
    const location = "not a url";

    await replacementHttp(location);

    expect(mockFetchString).not.toHaveBeenCalled();
  });

  it("should return null if the location is not a url", async () => {
    const location = "not a url";

    const result = await replacementHttp(location);

    expect(result).toBeNull();
  });

  it.each(["http", "www"])(
    "should fetch the content if the location is a url beginning with %s",
    async prefix => {
      const location = `${prefix}/anything/else`;

      await replacementHttp(location);

      expect(mockFetchString).toHaveBeenCalledTimes(1);
      expect(mockFetchString).toHaveBeenCalledWith(location);
    },
  );

  it("should return the content if the location is a url", async () => {
    const location = "www/anything/else";
    const content = "file content";

    mockFetchString.mockResolvedValue(content);

    const result = await replacementHttp(location);

    expect(result).toBe(content);
  });
});
