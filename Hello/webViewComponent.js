/**
 * Created by 战-不败的象征 on 2017/4/30.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  WebView,
  View,
  Dimensions
} from 'react-native';

const {WIDTH, HEIGHT} = Dimensions.get('window');  //  获取设备宽高
export default class WebViewComponent extends Component{
  render(){
    return <View style={ css.container }>
      <WebView
        injectedJavaScript="alert('打开我的网站！')"  //  注入javascript代码
        bounces={ false }  //  滚动是否有效，只在ios生效
        source={{ uri: "http://weibo.com/LitileXueZha" }}  //  加载一个网络地址
        // source={{ html: '<div><img src="http://www.ningtaostudy.cn/pic/m3.jpg" style="max-width: 100%"></div>' }}  //  加载html代码
        style={{ width: WIDTH, height: HEIGHT }}
      >
      </WebView>
    </View>;
  }
}
const css = StyleSheet.create({
  container: {
    flex: 1
  }
});
