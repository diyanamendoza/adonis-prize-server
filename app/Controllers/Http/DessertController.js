"use strict";
const Dessert = use("App/Models/Dessert");

class DessertController {
  async index() {
    return await Dessert.all();
  }
}

module.exports = DessertController;
