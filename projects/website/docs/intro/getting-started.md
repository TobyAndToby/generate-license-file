---
sidebar_position: 1
title: Getting Started
description: Introductory examples for getting generate license file installed and running
---

A couple of quick 5 minute guides for generating your license files via the CLI, or programmatic API.

## Installation

Install generate license file via npm:

```sh
npm install --save-dev generate-license-file
```

## CLI Quick Guide

Generate a third party licenses file for the project in the current working directory, outputting to a file called `third-party-licenses.txt`:

```bash
npx generate-license-file --input ./package.json --output ./third-party-licenses.txt
```

For more advanced usages of the CLI, including the different options and arguments supported, please see the [CLI docs](../cli).

## Library Quick Guide

Our library APIs allow you to programmatically interact with generate license file's functionality. Examples include generating and writing the license file to disk, or fetching the license data as an array for other usages. Want to know what the license objects contain? Head over to our [API spec](../library/api).

```js
const glf = require("generate-license-file");

// Generate and write the license file to disk.
glf
  .generateLicenseFile("./package.json", "./third-party-licenses.txt")
  .then(() => {})
  .catch(error => {});

// Get an array of licenses for the current project's production dependencies.
glf
  .getProjectLicenses("./package.json")
  .then(licenses => {})
  .catch(error => {});
```
