"use strict";
const Drink = use("App/Models/Drink");

class DrinkController {
  async index() {
    return await Drink.all();
  }
}

module.exports = DrinkController;
