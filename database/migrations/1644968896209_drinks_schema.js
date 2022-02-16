"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class DrinksSchema extends Schema {
  up() {
    this.create("drinks", (table) => {
      table.increments("id");
      table.string("name");
      table.string("url");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  down() {
    this.drop("drinks");
  }
}

module.exports = DrinksSchema;
