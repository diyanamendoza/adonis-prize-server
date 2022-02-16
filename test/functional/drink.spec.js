"use strict";

const { test, trait, after, before } = use("Test/Suite")("Drink");

const Drink = use("App/Models/Drink");

trait("Test/ApiClient");

before(async () => {
  await Drink.query().where("name", "brown sugar boba").delete();
  await Drink.query().where("name", "taro boba").delete();
});

const testDrink1 = {
  name: "brown sugar boba",
  url: "brownsugarboba.png",
};

const testDrink2 = {
  name: "taro boba",
  url: "taroboba.png",
};

test("Test drink creation", async ({ client }) => {
  const response = await client.post("/drinks").send(testDrink1).end();
  response.assertStatus(200);
  response.assertJSONSubset([testDrink1]);
});

test("Test get all drinks", async ({ client }) => {
  await client.post("/drinks").send(testDrink2).end();

  const response = await client.get("/drinks").end();

  response.assertJSONSubset([testDrink1, testDrink2]);
});

test("Test get drink by id", async ({ client }) => {
  const drink = await Drink.findBy("name", "brown sugar boba");

  const response = await client.get(`/drinks/${drink.id}`).end();
  response.assertJSONSubset(testDrink1);
});

test("Test update a drink", async ({ client }) => {
  const drink = await Drink.findBy("name", "brown sugar boba");

  const response = await client
    .put(`/drinks/${drink.id}`)
    .send({ name: "milk tea boba", url: "milktea.png" })
    .end();
  response.assertJSONSubset({ name: "milk tea boba", url: "milktea.png" });
});

test("Test delete a drink", async ({ client, assert }) => {
  const drink = await Drink.findBy("name", "milk tea boba");
  const toDelete = { name: "milk tea boba", url: "milktea.png" };
  const response = await client.delete(`/drinks/${drink.id}`).end();

  assert.notInclude(response, toDelete);
});
