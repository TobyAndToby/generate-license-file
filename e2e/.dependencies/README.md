# E2E Dependencies

| Dependency      | Test Case       | Found | Notes                                                           |
| --------------- | --------------- | ----- | --------------------------------------------------------------- |
| dep-1           | LICENSE.md      | TRUE  |                                                                 |
| dep-2           | LICENCE.md      | TRUE  |                                                                 |
| dep-2-duplicate | LICENCE.md      | TRUE  | This package has an identical license file to `dep-2`.          |
| dep-3           | LICENSE         | TRUE  |                                                                 |
| dep-4           | LICENCE         | TRUE  |                                                                 |
| dep-5           | NO LICENSE FILE | TRUE  | The README should be used as a substitute for the license file. |
| dep-6           | LICENSE.md      | TRUE  | Should not be used in a test bed that also uses `dep-1`         |
