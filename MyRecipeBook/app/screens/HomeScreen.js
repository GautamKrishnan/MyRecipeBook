import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import NavigationService from '../NavigationService';
import {InitializeMongoClient} from '../MongoDBHelper';

const RECIPE_ICON = require('../assets/recipe-book.png');

const HomeScreen: () => React$Node = () => {
  const [currentUserId, setCurrentUserId] = useState(undefined);

  useEffect(() => {
    console.log(currentUserId);
    if (currentUserId === undefined) {
      const userID = InitializeMongoClient();
      setCurrentUserId(userID);
    }
  },[]);

  return (
    <>
      <SafeAreaView style={styles.homeScreen}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>The perfect discover page</Text>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.addRecipe}
          onPress={() => {
            console.log('Pressed');
            NavigationService.navigate('Recipe');
          }}>
          <Image style={styles.recipeImage} source={RECIPE_ICON} />
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    backgroundColor: Colors.white,
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
  addRecipe: {
    width: 40,
    bottom: 10,
    right: 25,
    position: 'absolute',
  },
  recipeImage: {
    height: 50,
    width: 50,
  },
});

export default HomeScreen;
