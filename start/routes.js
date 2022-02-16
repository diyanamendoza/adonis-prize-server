"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on("/").render("welcome");

//Drink Routes
Route.get("/drinks", "DrinkController.index");
Route.post("/drinks", "DrinkController.store");
Route.get("/drinks/:id", "DrinkController.getById");

//Dessert Routes
Route.get("/desserts", "DessertController.index");
Route.post("/desserts", "DessertController.store");
Route.get("/desserts/:id", "DessertController.getById");
