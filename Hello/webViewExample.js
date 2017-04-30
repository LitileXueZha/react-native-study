/**
 * Created by 战-不败的象征 on 2017/4/30.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  WebView,
  View,
  Text
} from 'react-native';

const url = 'https://api.weibo.com/oauth2/authorize?client_id=3956350606&redirect_uri=http://127.0.0.1:5554';
export default class webViewExample extends Component{
  constructor(props){
    super(props);
    this.state = {
      code: null
    }
  }
  skipPage(state){
    if(state.source.uri.indexOf('code') > -1){
      let code1 = state.source.uri.split('code=')[1];
      this.setState({
        code: code1
      });
    }
  }
  render(){
    return <View style={ css.container }>
      { !this.state.code ?
        <WebView style={ css.container } source={{ uri: url }} onnavigationstatechange={this.skipPage}/>
        : <Text>{ this.state.code }</Text>
      }
    </View>;
  }
}
const css = StyleSheet.create({
  container: {
    flex: 1
  }
});