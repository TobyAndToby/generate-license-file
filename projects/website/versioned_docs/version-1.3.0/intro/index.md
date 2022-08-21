---
sidebar_position: 0
title: Introduction
---

## What is Generate License File?

Generate license file provides tooling to generate a single `.txt` file containing all of the licenses for your production third party dependencies. With both a CLI and a programmatic API, you have complete control over how and when the third party license file is generated.

Generate license file does this by recursively locating the license for each dependency found in the package.json `dependencies` array - starting with a package.json that you provide the path to (most commonly the project root, `./package.json`). Licenses are not always found in the same place, so generate license file will check various locations with the following precedence:

- A `LICENSE.md` (or `LICENCE.md`) file.
- The README.md.

## Why should I generate my license file?

Third party libraries likely play an integral part of the projects you develop. Most of these libraries will have licenses that govern how that code can be distributed, and how the original authors are attributed to. Under most licenses of the third party software that you use, it is mandatory to distribute their license as part of your software:

**MIT**

> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software...

**ISC**

> Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

**BSD-3 Clause**

> Redistributions in binary form must reproduce the above copyright notice, this list of conditions...

**LGPLv3**

> For a Combined Work that displays copyright notices during execution, include the copyright notice for the Library...

These are only a fraction of the different types of licenses your third party dependencies may be using. Generate license file automates the process of ensuring you are adhering to your dependencies' licenses.

## How can I use it?

Head on over to our [Getting Started](intro/getting-started) page to see how you can use generate license file in your projects!
