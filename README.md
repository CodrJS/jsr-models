# @codr/models

[![JSR Scope](https://jsr.io/badges/@codr)](https://jsr.io/@codr)
[![JSR](https://jsr.io/badges/@codr/models)](https://jsr.io/@codr/models)
[![JSR Score](https://jsr.io/badges/@codr/models/score)](https://jsr.io/@codr/models)
[![CodeQL](https://github.com/CodrJS/models/actions/workflows/codeql.yml/badge.svg)](https://github.com/CodrJS/models/actions/workflows/codeql.yml)

## Purpose

This module is for defining all reusable models for Codr.

## Getting Started

In order to use the `@jsr` scope in npm, the `.npmrc` file needs to be updated
with the following:

```ini
@jsr:registry=https://npm.jsr.io
```

Installing via `npm`

```bash
npx jsr add @codr/models@^1
# or
npm install @jsr/codr___models@^1
```

Installing via `yarn`

```bash
yarn dlx jsr add @codr/models@^1
# or
yarn add @jsr/codr___models@^1
```

Installing via `deno`

```bash
deno add @codr/models@^1
```

```ts
/* or import directly */
import { User } from "jsr:@codr/models@^1";
```

## Contributing

```bash
# Clone the repo
git clone git@github.com:CodrJS/jsr-models.git

# Cache deno dependencies
deno cache ./mod.ts 

# Format, lint, and test the code
deno fmt
deno lint
deno test
```
