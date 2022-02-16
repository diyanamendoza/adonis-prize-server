"use strict";
const Drink = use("App/Models/Drink");

class DrinkController {
  async index() {
    return await Drink.all();
  }
  
  async getById({ params }) {
    return await Drink.find(params.id)
  }

  async store({ request }) {
    try {
      const drink = new Drink();
  
      drink.name = request.body.name;
      drink.url = request.body.url;
  
     return await drink.save();

    } catch (e) {
      throw new Error(e.message)
    }
  }
}

module.exports = DrinkController;
