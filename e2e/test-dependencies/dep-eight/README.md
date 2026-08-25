# Dep Eight

| Test Case | LICENSE | LICENSE-3rdparty.csv |
| --------- | ------- | --------------------- |
| Found     | TRUE    | FALSE                 |

## Notes

This package has two files that match the license file pattern: `LICENSE` and
`LICENSE-3rdparty.csv`. `LICENSE` is the correct license and should always be
the one resolved.

Globbing for license files is OS-specific: the order in which matches come
back, and their casing, can both differ between operating systems. Without a
deterministic way of picking between multiple matches, this package could
resolve to a different license file depending on which OS generated the
output. This package exists to test that the correct file, `LICENSE`, is
always chosen regardless of OS.
