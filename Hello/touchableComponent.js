/**
 * Created by 战-不败的象征 on 2017/4/29.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

export default class TouchableComponentHighlight extends Component{
  show(text){
    alert(text);
  }
  render(){
    return <View>
      <Text>Example 1(TouchableHighlight):</Text>
      <View style={ css2.container }>
        <TouchableHighlight
          style={ css2.item1 }
          onPress={ this.show.bind(this, '(｡･∀･)ﾉﾞ嗨') }
          underlayColor="red"
        >
          <Text style={ css2.txt }>帅气涛</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={ css2.item2 }
          onPress={ this.show.bind(this, '我吃过了') }
          underlayColor="green"
        >
          <Text style={ css2.txt }>你吃饭了吗？</Text>
        </TouchableHighlight>
      </View>
      <Text>Example 2(TouchableOpacity):</Text>
      <View style={ css2.container }>
        <TouchableOpacity
          style={ [css2.item1, { backgroundColor: '#18b4ff' }] }
          onPress={ this.show.bind(this, '有事吗') }
          activeOpacity={0.7}
        >
          <Text style={ [css2.txt, { color: 'white' }] }>老妹儿</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={ [css2.item2, { backgroundColor: '#18b4ff' }] }
          onPress={ this.show.bind(this, '不怎么样') }
          activeOpacity={0.3}
        >
          <Text style={ [css2.txt, { color: 'white' }] }>最近怎么样啊</Text>
        </TouchableOpacity>
      </View>
      <Text>Example 3(TouchableWithoutFeedback):</Text>
      <View style={ css2.container }>
        <TouchableWithoutFeedback
          onPressIn={this.show.bind(this, 'pressIn事件触发')}
          onLongPress={this.show.bind(this, 'longPress事件触发')}
          onPressOut={this.show.bind(this, 'pressOut事件触发')}
        >
          <View style={{}}><Text>有本事你点我啊</Text></View>
        </TouchableWithoutFeedback>
      </View>
    </View>;
  }
}
const css2 = StyleSheet.create({
  container: {
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    height: 50
  },
  item1: {
    flex: 1,
    marginRight: 5
  },
  item2: {
    flex: 3
  },
  txt: {
    textAlign: 'center',
    lineHeight: 28,
    borderRadius: 10
  }
});
