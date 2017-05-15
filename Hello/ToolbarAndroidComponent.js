import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ToolbarAndroid
} from 'react-native';

export default class ToolbarAndroidComponent extends Component{
  render(){
    return (
      <View>
        <ToolbarAndroid
          logo={ require('./pic/轮播图3-刘亦菲.jpg') }
          title="React Native"
          actions={[ {title:'我的天', show: 'always'} ]}
          style={{ height: 50 }}
        />
      </View>
    );
  }
}