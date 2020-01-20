import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import NavigationService from '../NavigationService';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const HEADER_IMAGE_HEIGHT = DEVICE_HEIGHT * 0.453;
const DEFAULT_BACKGROUND = require('../assets/shutterstock_361046231.jpg');
const DURATION_ICON = require('../assets/time.png');
const SERVES_ICON = require('../assets/eat.png');

const ViewRecipeScreen: () => React$Node = props => {
  const {navigation} = props;
  const [recipe, setRecipe] = React.useState(
    navigation.getParam('recipeDetails'),
  );
  //const {recipeProps} = props;

  // React.useEffect(() => {
  //   console.log(navigation.getParam('recipeDetails'));
  // }, []);

  return (
    <>
      <View style={styles.recipeScreen}>
        <Image source={DEFAULT_BACKGROUND} style={styles.headerImage} />
        <View style={styles.headerTextContainer}>
          <View style={styles.topContent}>
            <Text style={styles.recipeName}>{recipe.name}</Text>
            <Text sytle={styles.cuisine}>{recipe.cuisine}</Text>
            <View style={styles.borderLine} />
          </View>
          <View style={styles.bottomContent}>
            <View style={styles.durationView}>
              <Image source={DURATION_ICON} style={styles.durationIcon} />
              <Text style={styles.durationText}>{recipe.duration}</Text>
            </View>
            <View style={styles.servesView}>
              <Image source={SERVES_ICON} style={styles.servesIcon} />
              <Text style={styles.servesText}>{recipe.serves}</Text>
            </View>
          </View>
        </View>
        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.ingredientsTitle}>Ingredients:</Text>
          <Text style={styles.ingredientsText}>
            {recipe.ingredients}
          </Text>
          <Text style={styles.instructionsTitle}>Instructions:</Text>
          <Text style={styles.instructionsText}>
              {recipe.instructions}
          </Text>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  recipeScreen: {
    backgroundColor: '#fafafc',
    flex: 1,
  },
  headerImage: {
    height: HEADER_IMAGE_HEIGHT,
    width: '100%',
  },
  headerTextContainer: {
    backgroundColor: Colors.white,
    marginTop: -60,
    width: '80%',
    height: 160,
    borderRadius: 10,
    alignSelf: 'center',
    zIndex: 1,
  },
  topContent: {
    marginHorizontal: 30,
    marginTop: 15,
  },
  recipeName: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  cuisine: {
    color: '#e6e6e6',
    fontSize: 14,
    fontWeight: 'normal',
  },
  borderLine: {
    marginTop: 10,
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: 1,
  },
  bottomContent: {
    marginTop: 15,
    marginHorizontal: 30,
    height: 70,
    flexDirection: 'row',
  },
  durationView: {
    marginLeft: 30,
    alignItems: 'center',
  },
  durationIcon: {
    height: 30,
    width: 30,
  },
  durationText: {
    fontSize: 10,
  },
  servesView: {
    marginLeft: 120,
    alignItems: 'center',
  },
  servesIcon: {
    height: 30,
    width: 30,
  },
  servesText: {
    fontSize: 10,
  },
  scrollContainer: {
    marginHorizontal: 25,
    paddingTop: 20,
  },
  ingredientsTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  ingredientsText: {
    paddingTop: 10,
  },
  instructionsTitle: {
    paddingTop: 15,
    fontSize: 18,
    fontWeight: '600',
  },
  instructionsText: {
    paddingTop: 10,
  },
});

export default ViewRecipeScreen;
