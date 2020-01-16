import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {DeleteDocument, ReadCollection} from '../MongoDBHelper';

const RecipeListScreen: () => React$Node = () => {
  const [listViewData, setListViewData] = useState([]);
  const [deleteState, setDeleteState] = useState(true);

  const deleteRecipe = async objectID => {
    const result = await DeleteDocument('recipes', objectID);
    if (result) {
      setDeleteState(!deleteState);
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      return await ReadCollection('recipes');
    };
    fetchRecipe().then(r => setListViewData(r));
  }, [deleteState]);

  return (
    <>
      <SafeAreaView style={styles.scrollView}>
        {listViewData ? (
          <SwipeListView
            data={listViewData}
            renderItem={data => (
              <View key={data.item._id} style={styles.rowFront}>
                <Text>{data.item.name}</Text>
              </View>
            )}
            renderHiddenItem={data => (
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
