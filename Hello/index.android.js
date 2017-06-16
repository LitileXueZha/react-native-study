/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Hello extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

// import ImageComponent from './imageComponent';
// import ListComponent from './listComponents';
// import ToolbarAndroidComponent from './ToolbarAndroidComponent';
// import ViewPagerAndroidComponent from './ViewPagerAndroidComponent';
// import WebViewComponent from './webViewComponent';
// import WebViewExample from './webViewExample';
// import { ListComponent, CartComponent } from './Example_cart';
// const SampleApp = StackNavigator({
//   Home: { screen: ListComponent },
//   Cart: { screen: CartComponent }
// });
import APIComponent from './APIs';
// import SearchComponent from './searchExample'
// import MenuListComponent from './MenuListComponent';

// 使用可复用组件MenuListComponent
// 定义数据模型
const data = {
  "Language": {
    "IconName": "location",
    "All": ["All"],
    "Front-end": ["Html", "Css", "JavaScript"],
    "Web Server": ["Php", "Node.js", "Python", "Jsp", "Asp"],
  },
  "Tools": {
    "IconName": "facebook",
    "All": ["All"],
    "MacOS": ["Xcode"],
    "Windows": ["WebStorm", "Sublime", "DreamViewer"],
    "Linux": ["Atom", "Vim"],
  },
};
class ExampleComponent extends Component{
  render(){
    return <MenuListComponent
      data={ data }
      nSelected={ 1 }
      tabSelected={ 0 }
      click={ this.onPress }
    />;
  }

  // 响应组件二级菜单点击事件
  onPress(s){
    alert(`你选择的是：${s}`);
  }
}

import CalendarComponent from './CalendarComponent';
class Example2Component extends Component{
  render(){
    return (
      <CalendarComponent
        touchEvent={ this.press }
        holiday={{ '3-8': '妇女节', '5-4': '青年节', '9-10': '教师节', '11-11': '光棍节' }}
        num={10}
        start={ new Date(2016,10,1) }
      />
    );
  }

  press(s){
    alert("我得"+ s);
  }
}


AppRegistry.registerComponent('Hello', () => Example2Component);
