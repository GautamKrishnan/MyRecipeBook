import React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import NavigationService from './NavigationService';
import HomeScreen from './screens/HomeScreen';
import RecipeListScreen from './screens/RecipeListScreen';
import CreateRecipeScreen from './screens/CreateRecipeScreen';
import ViewRecipeScreen from './screens/ViewRecipeScreen';

const DiscoverStack = createStackNavigator(
  {
    Home: HomeScreen,
    Recipe: CreateRecipeScreen,
    ViewRecipe: ViewRecipeScreen,
  },
  {headerMode: 'none'},
);

const MyRecipesStack = createStackNavigator(
  {
    RecipesList: RecipeListScreen,
    Recipe: CreateRecipeScreen,
    ViewRecipe: ViewRecipeScreen,
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
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </>
  );
};

export default App;
