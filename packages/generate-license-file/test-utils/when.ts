/**
 * Minimal replacement for jest-when.
 *
 * Usage:
 *   when(mockFn).calledWith(arg1, arg2).mockResolvedValue(value)
 *   when(mockFn).calledWith(arg1).mockRejectedValue(error)
 *   when(mockFn).calledWith(expect.anything()).mockReturnValue(value)
 *
 * Multiple calledWith chains on the same mock are additive. Each call wraps
 * the previous implementation, so the last registered match wins for equal
 * argument patterns (consistent with jest-when behaviour).
 *
 * jest.resetAllMocks() in beforeEach clears all implementations, so
 * when() chains registered per-test start fresh.
 */

type AsymmetricMatcher = { asymmetricMatch(value: unknown): boolean }

function matches(expected: unknown, actual: unknown): boolean {
  if (
    expected !== null &&
    typeof expected === "object" &&
    "asymmetricMatch" in expected &&
    typeof (expected as AsymmetricMatcher).asymmetricMatch === "function"
  ) {
    return (expected as AsymmetricMatcher).asymmetricMatch(actual)
  }
  return Object.is(expected, actual)
}

export function when<T extends (...args: any[]) => any>(mockFn: T) {
  return {
    calledWith(...expectedArgs: Parameters<T>) {
      const bind = (returnFn: () => ReturnType<T>) => {
        const existing = (mockFn as any).getMockImplementation?.() as
          | ((...args: Parameters<T>) => ReturnType<T>)
          | undefined

        ;(mockFn as any).mockImplementation((...args: Parameters<T>): ReturnType<T> => {
          if (
            expectedArgs.length === args.length &&
            expectedArgs.every((expected, i) => matches(expected, args[i]))
          ) {
            return returnFn()
          }
          return existing?.(...args) as ReturnType<T>
        })
      }

      return {
        mockReturnValue(value: ReturnType<T>) {
          bind(() => value)
        },
        mockResolvedValue(value: Awaited<ReturnType<T>>) {
          bind(() => Promise.resolve(value) as unknown as ReturnType<T>)
        },
        mockRejectedValue(reason: unknown) {
          bind(() => Promise.reject(reason) as unknown as ReturnType<T>)
        },
      }
    },
  }
}
