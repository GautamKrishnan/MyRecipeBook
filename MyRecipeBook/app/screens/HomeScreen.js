import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const RECIPE_ICON = require('../assets/recipe-book.png');
const HomeScreen: () => React$Node = () => {
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
