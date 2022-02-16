"use strict";
const Drink = use("App/Models/Drink");

class DrinkController {
  async index() {
    return await Drink.all();
  }
  
  async getById({ params }) {
    return await Drink.find(params.id)
  }

  async store({ request, response }) {
    try {
      const drink = new Drink();
  
      drink.name = request.body.name;
      drink.url = request.body.url;
  
      await drink.save();

     return await Drink.all();

    } catch (e) {
      throw new Error(e.message)
    }
  }

  async update({ params, request}){
    try {
      const drink = await Drink.find(params.id)
  
      drink.name = request.body.name;
      drink.url = request.body.url;
  
      await drink.save();

     return await Drink.find(params.id)

    } catch (e) {
      throw new Error(e.message)
    }
  }

  async destroy({ params }){
    try {
     const drink = await Drink.find(params.id)

     await drink.delete();

     return await Drink.all();
  } catch (e) {
    throw new Error(e.message)
  }
}

}

module.exports = DrinkController;
