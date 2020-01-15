import React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import RecipeListScreen from './screens/RecipeListScreen';
import RecipeScreen from './screens/RecipeScreen';

const DiscoverStack = createStackNavigator(
  {
    Home: HomeScreen,
    Recipe: RecipeScreen,
  },
  {headerMode: 'none'},
);

const MyRecipesStack = createStackNavigator(
  {
    RecipesList: RecipeListScreen,
    Recipe: RecipeScreen,
  },
  {headerMode: 'none'},
);

const AppStack = createBottomTabNavigator({
  Discover: DiscoverStack,
  'My Recipes': MyRecipesStack,
});

const StartNavigator = createSwitchNavigator({
  AppStack,
});

const AppContainer = createAppContainer(StartNavigator);

const App: () => React$Node = () => {
  return (
    <>
      <AppContainer />
    </>
  );
};

export default App;
