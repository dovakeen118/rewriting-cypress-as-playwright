### Learning Goals

- Discuss the location and structure of Cypress in our monolith apps
- Identify the need for an end-to-end database for our tests to run against
- Execute Cypress tests that seed data into our `e2e` database

### Getting Started

```no-highlight
et get running-cypress-in-monolith-apps
cd running-cypress-in-monolith-apps
yarn install
```

Take a look at the code provided, and you'll find a user maintenance app with a migration, API endpoint, and React index page built out. Let's figure out how to integrate Cypress in our application in order to test this functionality out!

### Cypress and the e2e folder

From our work with Cypress in the past, we know that it runs client-side. That is to say, Cypress opens up our application in a browser (whether it's Chrome using our `yarn run test:open` command or a headless browser using `yarn run test`) and runs the test within the browser, on the client side, rather than running it directly against our Javascript code on the server side.

However, in our monolith applications, we know that both our backend and our frontend are crucial for getting the functionality of our webpage up and running. In order for our pages to load properly, we don't just need our client-side React to load up, but we also need our server-side API endpoints to load, so React has some data that it can show on our page. The two work together in order to display our pages, and as such, our Cypress tests need to be able to run both as well in order to test our app properly.

In deciding where to put our Cypress apps, this creates a bit of a conundrum: do we place them in the `client` folder, or in the `server` folder? Our solution is to choose neither: instead, we'll create a brand-new folder called `e2e`, which stands for **end-to-end**.

### Reviewing our Cypress Structure and Commands

Go ahead and take a look inside the provided `e2e` folder, and you will see that for the most part, this folder is solely responsible for storing our Cypress configuration and tests. We have all of our familiar pieces: our `package.json` and `cypress.json` files in the root, and our `cypress` folder with `integration` and `plugins` folders inside. Inside of our `integration` folder, we can see that we have a `users` folder with a test file called `01_userViewsUsersIndex.spec.js`. We'll come back to this file shortly.

If we take a look at the `e2e/package.json` file, we'll see that we have two scripts provided: `e2e:open` and `e2e:run`. `e2e:open` will open our full Cypress dashboard, and `e2e:run` will run the tests via the headless browser, directly in our terminal. Note that, similar to our server-specific commands, we will need to navigate _into_ our `e2e` directory in our terminal in order to run these commands!

If we look closely, we'll see that the interesting thing about the scripts tied to these commands is that they're prefixed with `NODE_ENV=e2e`. By doing so, we're telling Cypress the _Node environment_ that we want to run our tests within. We can then use that environment to make sure that any actions taken by our tests are not messing with anything in our development or production environments.

### Preparing our e2e Database

The biggest thing we don't want to mess with from one Node environment to another is the _data_. We know that our app is persisting data in a database, which is then being served up via API endpoints and loaded into our React frontend for display. In working with our monolith app databases so far, we've always created databases that end with a suffix of _development_. However, we don't want our tests to alter the data in our development environment's database!

In order to protect the data in our development database, and ultimately our production database, we need a database that is specific to our Cypress testing. We call this our `e2e` database, and just like with our development database, we can go to `server/src/config/getDatabaseUrl.cjs` to see the name of this database. When you open that file, you'll see the following information:

```js
const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/user_maintenance_development",
      test: "postgres://postgres:postgres@localhost:5432/user_maintenance_test",
      e2e: "postgres://postgres:postgres@localhost:5432/user_maintenance_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  )
}

module.exports = getDatabaseUrl
```

You'll notice that we have _both_ a `test` database and an `e2e` database. Our `test` database is specifically for unit testing of our backend (which we can write using Jest), whereas our `e2e` database is the database we'll use for running Cypress tests.

Just like we do with our development database, we will need to **create** our Cypress `e2e` database in order to run our tests by running the following command in our terminal:

```sh
createdb user_maintenance_e2e
```

We will also need to migrate our database to create any appropriate tables. Knex migrations are a concern of our server, and if we open up our `server/package.json` file we'll see that a few new scripts have been added:

```js
"scripts": {
  ...
  "db:e2e:migrate": "NODE_ENV='e2e' yarn run migrate:latest",
  "dev:e2e": "NODE_ENV=e2e PORT=8765 nodemon src/app.js",
  ...
}
```

Once again, the scripts we're used to seeing are being prepended by `NODE_ENV=e2e` in order to specify the Node environment. This is how our application will know to migrate in the `e2e` database rather than the `development` database, and will also know which database to use when we boot up our server.

Let's first run the migrations for our `e2e` database within our terminal:

```sh
cd server
yarn run db:e2e:migrate
```

Then, still within your `server` directory, boot up your `e2e` server for your Cypress tests to run against:

```sh
yarn run dev:e2e
```

### Interacting with our e2e Database

Now that our app is up and running, we're going to need some data that we can run our tests against! This is where _seeding_ comes in, but it's going to look a bit different within our `e2e` environment than it did when we seeded our own data into our `development` environment. Specifically, we need Cypress to be able to run "seeding" commands before each specific test, so that it can load up the test data it needs before checking to make sure specific information is appearing on the page!

It's important to make note of why we can't seed our database as we would normally. We want the seeding of data to happen just before our tests run: because our tests may alter our test data as they run, we need a way to _reset_ that data before the run of each test, so that we can have clear expectations of what will load on our page. Because we want our seeding to happen while our tests run, this seeding needs to be managed by Cypress. However, Cypress runs on our client side, while our database exists on our server side! This slightly complicates things, but luckily, Cypress gives us a way to run server-side functionalities, called "tasks". We will be using tasks to run commands related to our database, to manage our seeding.

We have set up a number of tasks for you so that you can interact with your `e2e` database using your Cypress tests. These tasks can be found in the `e2e/cypress/plugins` folder. We know that Cypress will essentially need to make a number of `Objection query().insert()` calls in order to insert data into our `e2e` database, and that's what our plugins allow Cypress to do!

The guts of the tasks are found in `e2e/cypress/plugins/db.js`. This file has a number of different functions defined, and it's in those functions that we'll see the actual Objection calls being made. However, we will not interact with these functions directly. Instead, we've been given a number of Cypress "tasks" in `e2e/cypress/plugins/index.js`, which we can then use directly within our test files using `cy.task`.

For example, let's say we wanted to completely empty out a table within our database. We could do that using the `truncate` task, as follows:

```js
cy.task("db:truncate", "User")
```

Then, if we wanted to insert a record, we could do so as shown below:

```js
cy.task("db:insert", { modelName: "User", json: { firstName: "Dan" } })
```

In looking at this, we'll notice that our `e2e` Cypress files need access to our models in order to update the corresponding tables. They gain that access courtesy of the `server/src/models/index.js` file. Just like we needed to make sure to add a model to this file when we create it in order to access said model via the console, _it is extremely important to make sure we add any new models to this file_ so that Cypress can access these models and interact with their corresponding data as well.

**Best practice: as soon as you make a model, add it to `server/src/models/index.js`.**

### Writing our Tests

Before we begin adding to our tests, let's go ahead and run the tests we do have.

If you haven't done so already, we need to boot up our server to run our tests against. From our `server` directory (navigate there as needed), run the following in one terminal tab:

```sh
yarn run dev:e2e
```

In another terminal tab, navigate to your `e2e` directory and run the following:

```sh
yarn run e2e:open
```

Upon opening up our tests by clicking "Run 1 Integration Spec", we should see our test pass and our heading reading "Our App's Users" appearing on the page.

Let's add a test to get a user added to our list. In your test file (`e2e/cypress/integration/users/01_userViewsUsersIndex.spec.js`), add the following test below our heading test:

```js
it("lists all users", () => {
  cy.get(".users").find("li").first().should("have.text", "Harry Potter")
})
```

If we run this test, we should get an error telling us that it was able to find our `ul` with a class of `users`, but when it tried to find an `li` within that list, it "never found it".

This is because we don't have any users in our `e2e` database! Our next step, in order to make sure users appear properly on our page, is to seed a user into our `e2e` database using our `task`s.

In order to do this, we're going to add into our `beforeEach` block. Prior to visiting our page, we will use our Cypress tasks to first clear out any existing users from our table, and then add the user we want to test for.

Update your `beforeEach` block to read as follows:

```js
beforeEach(() => {
  cy.task("db:truncate", "User")
  cy.task("db:insert", { modelName: "User", json: { firstName: "Harry", lastName: "Potter" } })
  cy.visit("/")
})
```

At the top here, we're truncating our users table, which means we're clearing it out completely. This is an incredibly important first step, to make sure we don't have any old data in our database that could impact the outcome of our tests. We run this command using `cy.task("db:truncate", "User")`, which specifies the corresponding task from our `plugins/index.js` file and hands it our `User` model.

We then insert a user using `cy.task("db:insert")`. We give the task both the `modelName` and the `json` of data as arguments.

Once we've made sure our user is the only one in our `e2e` database, we visit our page and test its appearance. We've properly seeded an end-to-end database with our test data! Rerun your test and see it in action.

### A Note on the Asynchronicity of Cypress Tasks

When we use Cypress tasks in this way, we know that the processes Cypress is running behind the scenes are _asynchronous_: whether we are clearing out a table, inserting a record, or performing any other CRUD behavior on our model. However, we'll notice that we did not need to _await_ our tasks! This is because Cypress has some handling behind-the-scenes for the asynchronicity of these tasks. This gives us some great benefits in terms of preventing what we call "nondeterministic" behavior in our tests, or irregular behavior based on timing.

The unfortunate downside to the built-in handling is that Cypress tasks do not play nicely with the new `async/await` syntax. In fact, in order to chain any behaviors, we will need to use `.then()` chaining instead of using the `await` keyword. This means that if we wanted to insert a record, then find it and update it, that would look something like this:

```js
cy.task("db:insert", { modelName: "User", json: { firstName: "Lily", lastName: "Evans" } })
cy.task("db:find", { modelName: "User", conditions: { firstName: "Lily" } }).then((users) => {
  console.log(users[0])
  cy.task("db:update", {
    modelName: "User",
    conditions: { id: users[0].id },
    json: { lastName: "Potter" },
  })
})
```

Here, we inserted our user. We then used the Cypress `find` task to find all users with the first name of "Lily". We had to wait for the return value of that query to come back, which we use `.then()` syntax for, storing the return array in a variable called `users` so that we can take the proper record and use the Cypress "update" task to update the last name of that user.

One last thing we can do with our user is delete them. We would do so as shown below:

```js
cy.task("db:find", { modelName: "User", conditions: { firstName: "Lily" } }).then((users) => {
  cy.task("db:delete", { modelName: "User", conditions: { id: users[0].id } })
})
```

While this syntax is a bit older and less familiar to you, you can refer to your article on Promises for a refresher if you desire!

We now know how to truncate a table in our database, and how to insert, find, update, and delete records within it. We can use all of these tasks to seed our data as needed prior to running our tests.

### Why This Matters

We already know the benefits of testing our code thoroughly: having automated tests allows us to build new features and update existing ones without worrying about breaking existing functionality. As we integrate databases into our applications, we need to be able to insert test data in order to fully test our app's functionality! It's vitally important to protect the data in our production and development databases, so we run our tests using a separate `e2e` database so that we're not muddling our test data in with our actual data.

### In Summary

When running Cypress tests against our monolith application, we organize them into an `e2e` directory to indicate that they interact with both the client and server sides of our app. We integrate a new database that is specifically used for our `e2e` tests, and use Cypress tasks to seed that database with any data needed for our tests. We first make sure to create and migrate our `e2e` database, and boot up our `e2e` environment server. Then, using the `beforeEach` hook in our Cypress tests, we can call on those tasks and populate data into our `e2e` database as needed.
