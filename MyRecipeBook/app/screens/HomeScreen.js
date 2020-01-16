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
import {
  Stitch,
  AnonymousCredential,
  RemoteMongoClient,
} from 'mongodb-stitch-react-native-sdk';

const RECIPE_ICON = require('../assets/recipe-book.png');
const HomeScreen: () => React$Node = () => {
  const [currentUserId, setCurrentUserId] = useState(undefined);

  const authenticate = () => {
    Stitch.initializeDefaultAppClient('myrecipebook-mobua').then(client => {
      client.auth
        .loginWithCredential(new AnonymousCredential())
        .then(user => {
          console.log(`Successfully logged in as user ${user.id}`);
          setCurrentUserId(user.id);
        })
        .catch(err => {
          console.log(`Failed to log in anonymously: ${err}`);
        });
    });
  };

  const fetchData = () => {
    const stitchAppClient = Stitch.defaultAppClient;
    const mongoClient = stitchAppClient.getServiceClient(
      RemoteMongoClient.factory,
      'mongodb-myrecipebook',
    );
    const db = mongoClient.db('testdb');
    const myrecipes = db.collection('recipes');
    myrecipes
      .find({}, {})
      .asArray()
      .then(docs => {
        console.log(docs);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(currentUserId);
    if (currentUserId === undefined) {
      authenticate();
    }
    // if (currentUserId) {
    //   fetchData();
    // }
  });

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
