---
sidebar_position: 1
title: Getting Started
---

<<<<<<< HEAD
Quick 5 minute guides for generating your third party license files via the CLI, or accessing the license content using the programmatic API.

## Installation

# Install generate license file via npm (https://www.npmjs.com/package/generate-license-file):

A couple of quick 5 minute guides for generating your license files via the CLI, or programmatic API.

## Installation

Install generate license file via npm:

> > > > > > > 108eaed2a1021f8c466dfbd7c1eea3cdaba178c2

```sh
npm install --save-dev generate-license-file
```

## CLI Quick Guide

Generate a third party licenses file for the project in the current working directory, outputting to a file called `third-party-licenses.txt`:

```sh
npx generate-license-file --input ./package.json --output ./third-party-licenses.txt
```

## Library Quick Guide

Use the library directly to fetch a list of all of the licenses found and return them for usage in code for you to do what you like with. Want to know what these license objects contain? Head on over to our [API spec page](../library/api).

```js
const generateLicenseFile = require("generate-license-file");

// Get an array of licenses for the current project's production dependencies.
generateLicenseFile
  .getProjectLicenses("./package.json")
  .then((licenses) => {
    // Do stuff with licenses...
  })
  .catch((error) => {
    // Do stuff with error...
  });
```
