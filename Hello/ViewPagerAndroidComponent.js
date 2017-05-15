/**
 * Created by 战-不败的象征 on 2017/5/12.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ViewPagerAndroid,
  Text
} from 'react-native';

export default class ViewPagerAndroidComponent extends Component{
  render(){
    return (
      <ViewPagerAndroid
        style={ css.container }
        initialPage={ 2 }
      >
        <View style={ [css.page, { backgroundColor: '#eee' }] }>
          <Text>这是page1</Text>
        </View>
        <View style={ css.page }>
          <Text>这是page2</Text>
        </View>
      </ViewPagerAndroid>
    );
  }
}
const css = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    width: '100%',
    height: '100%'
  },
  page: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});