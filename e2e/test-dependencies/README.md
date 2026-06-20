# E2E Dependencies

| Dependency      | Test Case       | Found | Notes                                                           |
| --------------- | --------------- | ----- | --------------------------------------------------------------- |
| dep-one         | LICENSE.md      | TRUE  |                                                                 |
| dep-two         | LICENCE.md      | TRUE  |                                                                 |
| dep-two-duplicate | LICENCE.md    | TRUE  | This package has an identical license file to `dep-two`.        |
| dep-three       | LICENSE         | TRUE  |                                                                 |
| dep-four        | LICENCE         | TRUE  |                                                                 |
| dep-five        | NO LICENSE FILE | TRUE  | The README should be used as a substitute for the license file. |
| dep-six         | LICENSE.md      | TRUE  | Should not be used in a test bed that also uses `dep-one`       |
| dep-seven       | LICENSE.md      | TRUE  |                                                                 |
