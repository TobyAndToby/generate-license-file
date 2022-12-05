# generate-license-file-e2e package

The packages inside this folder are used to integrate the running of external e2e tests into the nx monorepo cli for improved DX.

We pair up a project inside the monorepo that can call the e2e test command inside the respective project (e.g.
`npm install && npm run e2e`). Then within the monorepo we can call all of the e2es at once:

```shell
npx nx run-many --target e2e
```
