import { expect, test } from "@playwright/test";
import { factoryCreate, truncateDatabase } from "./functions";

// @ts-check
test.use({
  ignoreHTTPSErrors: true,
});
test.beforeEach(async ({ request }) => {
  await truncateDatabase();
});

test("Playwright can call test/factory/create with user factory name and create a user", async ({
  request,
}) => {
  const factory = "user";
  const options = {
    attributes: null,
    traits: null,
  };
  const createUserRequest = factoryCreate(factory, options);
  expect((await createUserRequest).status).toBeTruthy();
  expect((await createUserRequest).status).toBe(200);
  expect((await createUserRequest).data.id).toBe(1);
});

test("Playwright can call test truncations create and clear database", async ({
  request,
}) => {
  const createTruncationRequest = truncateDatabase();
  expect((await createTruncationRequest).status).toBeTruthy();
  expect((await createTruncationRequest).status).toBe(201);
  expect((await createTruncationRequest).data.message).toBe("tables have been reset");
});
