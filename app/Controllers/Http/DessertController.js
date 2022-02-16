"use strict";
const Dessert = use("App/Models/Dessert");

class DessertController {
  async index() {
    return await Dessert.all();
  }

  async getById({ params }) {
    return await Dessert.find(params.id)
  }

  async store({ request }) {
    try {
      const dessert = new Dessert();
  
      dessert.name = request.body.name;
      dessert.url = request.body.url;
  
    
      await dessert.save();

     return await Dessert.all();

    } catch (e) {
      throw new Error(e.message)
    }
  }

  async update({ params, request}){
    try {
      const dessert = await Dessert.find(params.id)
  
      dessert.name = request.body.name;
      dessert.url = request.body.url;
  
      await dessert.save();

     return await Dessert.find(params.id)

    } catch (e) {
      throw new Error(e.message)
    }
  }


}

module.exports = DessertController;
