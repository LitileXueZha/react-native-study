/**
 * Created by 战-不败的象征 on 2017/4/29.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  PixelRatio,
  View,
  Text,
  TextInput
} from 'react-native';

const onePT = 1 / PixelRatio.get();
export default class Search extends Component{
  constructor(props){
    super(props);
    this.state = {
      show: false
    };
  }  //  初始化，ES5为：getInitialState
  getValue(text=''){
    this.setState({
      show: true,
      value: text
    });
  }
  hide(val=''){
    this.setState({
      show: false,
      value: val
    });
  }
  render(){
    return <View style={ css1.container }>
      <View style={ css1.searchContainer }>
        <View style={ css1.inputContainer }>
          <TextInput
            returnKeyType="search"
            placeholder='输入在此'
            underlineColorAndroid='transparent'
            value={this.state.value}
            onChangeText={this.getValue.bind(this)}
            onEndEditing={this.hide.bind(this,this.state.value)}
          />
        </View>
        <View style={ css1.btnContainer }>
          <Text style={ css1.btn } onPress={this.hide.bind(this, this.state.value +'庄')}>搜索</Text>
        </View>
      </View>
      { this.state.show?
        <View>
          <Text
            onPress={this.hide.bind(this, this.state.value +'庄')}
            numberOfLines={1} style={ css1.item }
          ><Text style={ css1.keyWord }>{ this.state.value }</Text>庄</Text>
          <Text
            onPress={this.hide.bind(this, this.state.value +'园街')}
            numberOfLines={1} style={ css1.item }
          ><Text style={ css1.keyWord }>{this.state.value }</Text>园街</Text>
          <Text
            onPress={this.hide.bind(this, '520' +this.state.value +'综合商店')}
            numberOfLines={1} style={ css1.item }
          >520<Text style={ css1.keyWord }>{ this.state.value }</Text>综合商店</Text>
          <Text
            onPress={this.hide.bind(this, this.state.value +'桃')}
            numberOfLines={1} style={ css1.item }
          ><Text style={ css1.keyWord }>{ this.state.value }</Text>桃</Text>
          <Text
            onPress={this.hide.bind(this, '杨林' +this.state.value)}
            numberOfLines={1} style={ css1.item }
          >杨林<Text style={ css1.keyWord }>{ this.state.value }</Text></Text>
        </View>
        : null
      }
    </View>;
  }
}
const css1 = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: onePT
  },
  inputContainer: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#330066',
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2
  },
  btnContainer: {
    width: 80,
    height: 40,
    backgroundColor: '#330066',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    textAlign: 'center',
    color: 'white'
  },
  item: {
    fontSize: 13,
    borderWidth: onePT,
    borderColor: 'silver',
    // borderTopWidth: 0,
    padding: 4,
    paddingTop: 8,
    paddingBottom: 8
  },
  keyWord: {
    color: 'black'
  }
});
/*
 *   吐血了快！里面的Button不支持css属性!
 * */
