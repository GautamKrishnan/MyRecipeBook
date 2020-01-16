import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {RemoteMongoClient, Stitch} from 'mongodb-stitch-react-native-sdk';

const RecipeListScreen: () => React$Node = () => {
  const [listViewData, setListViewData] = useState([]);
  const [deleteState, setDeleteState] = useState(true);
  const stitchAppClient = Stitch.defaultAppClient;
  const mongoClient = stitchAppClient.getServiceClient(
    RemoteMongoClient.factory,
    'mongodb-myrecipebook',
  );
  const db = mongoClient.db('testdb');
  const myrecipes = db.collection('recipes');

  const deleteRecipe = objectID => {
    const query = {_id: objectID};
    console.log(query);
    myrecipes
      .deleteOne(query)
      .then(result => {
        console.log(`Deleted ${result.deletedCount} item.`);
        setDeleteState(!deleteState);
      })
      .catch(err => console.error(`Delete failed with error: ${err}`));
  };

  useEffect(() => {
    const fetchRecipe = () => {
      myrecipes
        .find({}, {})
        .asArray()
        .then(docs => {
          console.log(docs);
          setListViewData(docs);
        })
        .catch(err => {
          console.log(err);
        });
    };
    fetchRecipe();
  }, [deleteState, myrecipes]);

  return (
    <>
      <SafeAreaView style={styles.scrollView}>
        {listViewData ? (
          <SwipeListView
            data={listViewData}
            renderItem={(data, rowMap) => (
              <View key={data.item._id} style={styles.rowFront}>
                <Text>{data.item.name}</Text>
              </View>
            )}
            renderHiddenItem={(data, rowMap) => (
              <View style={styles.rowBack}>
                <TouchableOpacity
                  onPress={() => {
                    deleteRecipe(data.item._id);
                  }}>
                  <Text>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    console.log('Edit');
                  }}>
                  <Text>Edit</Text>
                </TouchableOpacity>
              </View>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
          />
        ) : null}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
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
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
});

export default RecipeListScreen;
