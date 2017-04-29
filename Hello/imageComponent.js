/**
 * Created by 战-不败的象征 on 2017/4/29.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Button,
  Image
} from 'react-native';


const imgs = [
  'http://www.ningtaostudy.cn/pic/轮播图3-刘亦菲.jpg',
  'http://www.ningtaostudy.cn/pic/轮播图2-幻想.jpg',
  'http://www.ningtaostudy.cn/pic/轮播图2-学校风光.jpg',
  'http://www.ningtaostudy.cn/pic/轮播图1-电脑桌面.jpg'
];
export default class LearnImage extends Component{
  constructor(props){
    super(props);
    this.state = {
      imgs: imgs,
      count: 0
    };
  }
  goPrevious(){
    let count = this.state.count;
    count --;
    if(count < 0){
      count = this.state.imgs.length-1;
    }
    this.setState({
      count: count
    });
  }
  goNext(){
    let count = this.state.count;
    count ++;
    if(count > this.state.imgs.length-1){
      count = 0;
    }
    this.setState({
      count: count
    });
  }
  render(){
    return <View>
      <ScrollView>
        <View style={ css3.txtContainer }>
          <Text>一个小小照片查看器</Text>
        </View>
        <View style={ css3.imgContainer }>
          <Image
            source={{uri: this.state.imgs[this.state.count]}}
            resizeMode='cover'
            style={ css3.img } />
        </View>
        <View style={ css3.action }>
          <View style={ css3.actionItem }>
            <Button title="上一张" onPress={ () => this.goPrevious() }/>
          </View>
          <View style={ css3.actionItem }>
            <Button title="下一张" onPress={ this.goNext.bind(this) }/>
          </View>
        </View>
        <Image
          source={ require('./pic/轮播图3-刘亦菲.jpg') }
          resizeMode="cover"
          style={{ width: '100%' }}
        />
      </ScrollView>
    </View>
  }
}
const css3 = StyleSheet.create({
  txtContainer: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgContainer: {
    padding: 5
  },
  img: {
    width: '100%',
    height: 200,
    borderWidth: 1
  },
  action: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 50
  },
  actionItem: {
    flex: 1,
    margin: 5
  }
});