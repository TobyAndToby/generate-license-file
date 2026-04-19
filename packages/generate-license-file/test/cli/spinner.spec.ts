import type { Options } from "ora";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

const { mockDotsSpinner, mockOra } = vi.hoisted(() => ({
  mockDotsSpinner: {} as object,
  mockOra: vi.fn(),
}));

vi.mock("cli-spinners", () => ({
  default: { dots: mockDotsSpinner },
}));

vi.mock("ora", () => ({ default: mockOra }));

describe("spinner", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("should use the dots spinner", async () => {
    vi.resetModules();
    await import("../../src/lib/cli/spinner");

    expect(mockOra).toHaveBeenCalledTimes(1);

    const firstCallFirstArg = mockOra.mock.calls[0][0] as Options;
    expect(firstCallFirstArg.spinner).toBe(mockDotsSpinner);
  });

  it("should use the text 'Resolving licenses...'", async () => {
    vi.resetModules();
    await import("../../src/lib/cli/spinner");

    expect(mockOra).toHaveBeenCalledTimes(1);

    const firstCallFirstArg = mockOra.mock.calls[0][0] as Options;
    expect(firstCallFirstArg.text).toBe("Resolving licenses...");
  });
});
