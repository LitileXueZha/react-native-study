import React,{ Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from './../plugin/ripple';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';

const WIDTH = Dimensions.get('window').width,
      HEIGHT =  Dimensions.get('window').height;

export default class MainComponent extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <LinearGradient
        colors={ this.props.colors }
        start={{x: 0, y: 1}}
        end={{x:1, y: 0.5}}
        style={ css.container }>
        <ScrollView/>
      </LinearGradient>
    );
  }
}

const css = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
  },
});