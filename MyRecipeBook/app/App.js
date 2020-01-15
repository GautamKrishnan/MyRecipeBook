import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {
  Stitch,
  AnonymousCredential,
  RemoteMongoClient,
} from 'mongodb-stitch-react-native-sdk';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: undefined,
      client: undefined,
    };
    this._loadClient = this._loadClient.bind(this);
    this._onPressLogin = this._onPressLogin.bind(this);
    this._onPressLogout = this._onPressLogout.bind(this);
  }

  componentDidMount() {
    this._loadClient();
  }

  render() {
    let loginStatus = 'Currently logged out.';

    if (this.state.currentUserId) {
      loginStatus = `Currently logged in as ${this.state.currentUserId}!`;
    }
    console.log(this.state.currentUserId);
    return (
      <View style={styles.container}>
        <Text> {loginStatus} </Text>
        {this.state.currentUserId !== undefined ? (
          <Button onPress={this._onPressLogout} title="Logout" />
        ) : (
          <Button onPress={this._onPressLogin} title="Login" />
        )}
        <Button title="Write data" onPress={this.writeData} />
        <Button title="Read data" onPress={this.readData} />
      </View>
    );
  }

  _loadClient() {
    Stitch.initializeDefaultAppClient('myrecipebook-mobua').then(client => {
      this.setState({client});

      if (client.auth.isLoggedIn) {
        this.setState({currentUserId: client.auth.user.id});
      }
    });
  }

  _onPressLogin() {
    this.state.client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(user => {
        console.log(`Successfully logged in as user ${user.id}`);
        this.setState({currentUserId: user.id});
      })
      .catch(err => {
        console.log(`Failed to log in anonymously: ${err}`);
        this.setState({currentUserId: undefined});
      });
  }

  _onPressLogout() {
    this.state.client.auth
      .logout()
      .then(user => {
        console.log('Successfully logged out');
        this.setState({currentUserId: undefined});
      })
      .catch(err => {
        console.log(`Failed to log out: ${err}`);
        this.setState({currentUserId: undefined});
      });
  }

  writeData() {
    const stitchAppClient = Stitch.defaultAppClient;
    const mongoClient = stitchAppClient.getServiceClient(
      RemoteMongoClient.factory,
      'mongodb-myrecipebook',
    );
    const db = mongoClient.db('testdb');
    const recipes = db.collection('recipes');
    recipes
      .insertOne({
        name: 'Sweet Pongal',
        cusine: 'South Indian',
      })
      .then(() => {
        console.log('Wrote success');
      })
      .catch(err => {
        console.warn(err);
      });
  }

  readData() {
    const stitchAppClient = Stitch.defaultAppClient;
    const mongoClient = stitchAppClient.getServiceClient(
      RemoteMongoClient.factory,
      'mongodb-myrecipebook',
    );
    const db = mongoClient.db('testdb');
    const myrecipes = db.collection('myrecipes');
    myrecipes
      .find({}, {})
      .asArray()
      .then(docs => {
        console.log(docs[0]);
        const ingredients = JSON.parse(docs[0].instructions);
        console.log(ingredients);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
