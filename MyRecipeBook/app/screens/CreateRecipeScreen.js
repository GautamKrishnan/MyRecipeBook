import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import NavigationService from '../NavigationService';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Add, Modify} from '../MongoDBHelper';
import * as Constants from '../utils/Constants';

const CreateRecipeScreen: () => React$Node = props => {
  const {navigation} = props;
  const recipeDetails = navigation.getParam('recipeDetails');
  const [recipeName, onChangeName] = React.useState(recipeDetails.name);
  const [cuisine, onChangeCuisine] = React.useState(recipeDetails.cuisine);
  const [duration, onChangeDuration] = React.useState(recipeDetails.duration);
  const [serves, onChangeServes] = React.useState(recipeDetails.serves);
  const [ingredients, onChangeIngredients] = React.useState(
    recipeDetails.ingredients,
  );
  const [instructions, onChangeInstructions] = React.useState(
    recipeDetails.instructions,
  );

  const pressSubmit = async () => {
    let result;
    if (recipeDetails._id) {
      const updatedDocument = {
        _id: recipeDetails._id,
        name: recipeName,
        cuisine: cuisine,
        duration: duration,
        serves: serves,
        ingredients: ingredients,
        instructions: instructions,
      };
      result = await Modify(
        Constants.COLLECTIONS_MYRECIPES,
        updatedDocument,
        recipeDetails._id,
      );
      Alert.alert('Success', 'Modified Recipe Successfully', [{text: 'Ok'}]);
    } else {
      const document = {
        name: recipeName,
        cuisine: cuisine,
        duration: duration,
        serves: serves,
        ingredients: ingredients,
        instructions: instructions,
      };
      result = await Add(Constants.COLLECTIONS_MYRECIPES, document);
      Alert.alert('Success', 'Created New Recipe Successfully', [{text: 'Ok'}]);
    }
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
              <Text style={styles.sectionTitle}>
                {recipeDetails._id ? 'Edit Your Recipe' : 'Create New Recipe'}
              </Text>
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
            <TouchableOpacity style={styles.submitButton} onPress={pressSubmit}>
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

export default CreateRecipeScreen;
