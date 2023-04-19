# Running Playwright

After `git clone`, install dependencies with `yarn install`

Create the e2e database:

```no-highlight
createdb user_maintenance_e2e
```

Migrate the e2e database from the `server` folder:

```no-highlight
yarn run db:e2e:migrate
```

In one terminal tab, start the server for the e2e test from the root:

```no-highlight
yarn run dev:e2e
```

In another terminal tab, run the Playwright tests:

```no-highlight
yarn run e2e:run
```
