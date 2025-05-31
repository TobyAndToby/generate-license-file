# npm-package

This project is used to end-2-end test how generate-license-file functions with optional
dependencies that are not present on disk, such as in the case of platform specific dependencies,
or deps that fail to install.

To test this case we just install using `--omit=optional`, so the optionals don't appear on disk.
