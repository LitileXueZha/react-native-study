import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {
  AppRegistry,
} from 'react-native';
import StartComponent from './views/StartComponent';

class HelloWord extends Component {
  render() {
    console.log('hello word');
    return (
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text>Hello Word</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('classWork', () => HelloWord);
