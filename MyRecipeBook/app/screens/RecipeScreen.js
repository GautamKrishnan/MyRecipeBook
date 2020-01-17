import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import NavigationService from '../NavigationService';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Add} from '../MongoDBHelper';

const RecipeScreen: () => React$Node = () => {
  const [recipeName, onChangeName] = React.useState('Name');
  const [cuisine, onChangeCuisine] = React.useState('Cuisine');
  const [duration, onChangeDuration] = React.useState('How much time');
  const [serves, onChangeServes] = React.useState('How many will this serve');
  const [ingredients, onChangeIngredients] = React.useState(
    'Ingredients for this..',
  );
  const [instructions, onChangeInstructions] = React.useState(
    'The steps to cook..',
  );

  const createRecipe = async () => {
    const document = {
      name: recipeName,
      cuisine: cuisine,
      duration: duration,
      serves: serves,
      ingredients: ingredients,
      instructions: instructions,
    };
    const result = await Add('recipes', document);
    if (result) {
      NavigationService.back();
    }
  };

  return (
    <>
      <SafeAreaView style={styles.recipeScreen}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Add a new Recipe</Text>
              <Text>Name:</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => onChangeName(text)}
                value={recipeName}
              />
              <Text>Cuisine:</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => onChangeCuisine(text)}
                value={cuisine}
              />
              <Text>Duration:</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => onChangeDuration(text)}
                value={duration}
              />
              <Text>Serves:</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => onChangeServes(text)}
                value={serves}
              />
              <Text>Ingredients:</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => onChangeIngredients(text)}
                value={ingredients}
              />
              <Text>Instructions:</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => onChangeInstructions(text)}
                value={instructions}
                numberOfLines={0}
              />
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={createRecipe}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  recipeScreen: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  submitButton: {
    marginTop: 20,
    paddingTop: 5,
    height: 30,
    width: 60,
    backgroundColor: '#3385EE',
    alignSelf: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    fontWeight: 'bold',
  },
});

export default RecipeScreen;
