"use strict";

const { test, trait, after, before } = use("Test/Suite")("Dessert");

const Dessert = use("App/Models/Dessert");

trait("Test/ApiClient");

before(async () => {
  await Dessert.query().where("name", "brownies").delete();
  await Dessert.query().where("name", "butter mochi").delete();
});

const testDessert1 = {
  name: "brownies",
  url: "brownies.png",
};

const testDessert2 = {
  name: "butter mochi",
  url: "buttermochi.png",
};

test("Test dessert creation", async ({ client }) => {
  const response = await client.post("/desserts").send(testDessert1).end();
  response.assertStatus(200);
  response.assertJSONSubset([testDessert1]);
});

test("Test get all desserts", async ({ client }) => {
  await client.post("/desserts").send(testDessert2).end();

  const response = await client.get("/desserts").end();

  response.assertJSONSubset([testDessert1, testDessert2]);
});

test("Test get dessert by id", async ({ client }) => {
  const dessert = await Dessert.findBy("name", "brownies");

  const response = await client.get(`/desserts/${dessert.id}`).end();
  response.assertJSONSubset(testDessert1);
});

test("Test update a dessert", async ({ client }) => {
  const dessert = await Dessert.findBy("name", "brownies");

  const response = await client
    .put(`/desserts/${dessert.id}`)
    .send({ name: "oreos", url: "oreos.png" })
    .end();
  response.assertJSONSubset({ name: "oreos", url: "oreos.png" });
});

test("Test delete a dessert", async ({ client, assert }) => {
  const dessert = await Dessert.findBy("name", "oreos");
  const toDelete = { name: "oreos", url: "oreos.png" };
  const response = await client.delete(`/desserts/${dessert.id}`).end();

  assert.notInclude(response, toDelete);
});
