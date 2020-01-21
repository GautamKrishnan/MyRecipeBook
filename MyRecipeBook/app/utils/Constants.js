//Mongo-stitch details
const CLIENT_APP_ID = 'myrecipebook-mobua';
const SERVICE_NAME = 'mongodb-myrecipebook';
const DB_NAME = 'testdb';

//Collection recipe contains some pre loaded recipes, these cant be modified.
const COLLECTIONS_RECIPES = 'recipes';

//Collection myrecipe contains user's own recipe, these can be modified.
const COLLECTIONS_MYRECIPES = 'myrecipes';

const DEFAULT_RECIPE = {
  name: 'Name',
  cuisine: 'Cuisine',
  duration: 'How much time',
  serves: 'How many will this serve',
  ingredients: 'Ingredients for this..',
  instructions: 'The steps to cook..',
};

export {
  DEFAULT_RECIPE,
  CLIENT_APP_ID,
  SERVICE_NAME,
  DB_NAME,
  COLLECTIONS_RECIPES,
  COLLECTIONS_MYRECIPES,
};
