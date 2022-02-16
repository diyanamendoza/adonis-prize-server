"use strict";
const Dessert = use("App/Models/Dessert");

class DessertController {
  async index() {
    return await Dessert.all();
  }

  async store({ request }) {
    try {
      const dessert = new Dessert();
  
      dessert.name = request.body.name;
      dessert.url = request.body.url;
  
     return await dessert.save();

    } catch (e) {
      throw new Error(e.message)
    }
  }
}

module.exports = DessertController;
