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
  View,
  Button,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  PixelRatio
} from 'react-native';

// export default class Hello extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.android.js
//         </Text>
//         <Text style={styles.instructions}>
//           Double tap R on your keyboard to reload,{'\n'}
//           Shake or press menu button for dev menu
//         </Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

// const onePT = 1 / PixelRatio.get();
// class Search extends Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       show: false
//     };
//   }  //  初始化，ES5为：getInitialState
//   getValue(text=''){
//     this.setState({
//       show: true,
//       value: text
//     });
//   }
//   hide(val=''){
//     this.setState({
//       show: false,
//       value: val
//     });
//   }
//   render(){
//     return <View style={ css1.container }>
//       <View style={ css1.searchContainer }>
//         <View style={ css1.inputContainer }>
//           <TextInput
//               returnKeyType="search"
//               placeholder='输入在此'
//               underlineColorAndroid='transparent'
//               value={this.state.value}
//               onChangeText={this.getValue.bind(this)}
//               onEndEditing={this.hide.bind(this,this.state.value)}
//           />
//         </View>
//         <View style={ css1.btnContainer }>
//           <Text style={ css1.btn } onPress={this.hide.bind(this, this.state.value +'庄')}>搜索</Text>
//         </View>
//       </View>
//       { this.state.show?
//         <View>
//           <Text
//             onPress={this.hide.bind(this, this.state.value +'庄')}
//             numberOfLines={1} style={ css1.item }
//           ><Text style={ css1.keyWord }>{ this.state.value }</Text>庄</Text>
//           <Text
//             onPress={this.hide.bind(this, this.state.value +'园街')}
//             numberOfLines={1} style={ css1.item }
//           ><Text style={ css1.keyWord }>{this.state.value }</Text>园街</Text>
//           <Text
//             onPress={this.hide.bind(this, '520' +this.state.value +'综合商店')}
//             numberOfLines={1} style={ css1.item }
//           >520<Text style={ css1.keyWord }>{ this.state.value }</Text>综合商店</Text>
//           <Text
//             onPress={this.hide.bind(this, this.state.value +'桃')}
//             numberOfLines={1} style={ css1.item }
//           ><Text style={ css1.keyWord }>{ this.state.value }</Text>桃</Text>
//           <Text
//             onPress={this.hide.bind(this, '杨林' +this.state.value)}
//             numberOfLines={1} style={ css1.item }
//           >杨林<Text style={ css1.keyWord }>{ this.state.value }</Text></Text>
//         </View>
//         : null
//       }
//     </View>;
//   }
// }
// const css1 = StyleSheet.create({
//     container: {
//       paddingTop: 30,
//       paddingLeft: 10,
//       paddingRight: 10
//     },
//     searchContainer: {
//         display: 'flex',
//         flexDirection: 'row',
//         marginBottom: onePT
//     },
//     inputContainer: {
//       flex: 1,
//       height: 40,
//       borderWidth: 1,
//       borderColor: '#330066',
//       borderTopLeftRadius: 2,
//       borderBottomLeftRadius: 2
//     },
//     btnContainer: {
//       width: 80,
//       height: 40,
//       backgroundColor: '#330066',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     btn: {
//       textAlign: 'center',
//       color: 'white'
//     },
//     item: {
//       fontSize: 13,
//       borderWidth: onePT,
//       borderColor: 'silver',
//       // borderTopWidth: 0,
//       padding: 4,
//       paddingTop: 8,
//       paddingBottom: 8
//     },
//     keyWord: {
//       color: 'black'
//     }
// });
/*
*   吐血了快！里面的Button不支持css属性!
* */

// class TouchableComponentHighlight extends Component{
//   show(text){
//     alert(text);
//   }
//   render(){
//     return <View>
//       <Text>Example 1(TouchableHighlight):</Text>
//       <View style={ css2.container }>
//         <TouchableHighlight
//           style={ css2.item1 }
//           onPress={ this.show.bind(this, '(｡･∀･)ﾉﾞ嗨') }
//           underlayColor="red"
//         >
//           <Text style={ css2.txt }>帅气涛</Text>
//         </TouchableHighlight>
//         <TouchableHighlight
//           style={ css2.item2 }
//           onPress={ this.show.bind(this, '我吃过了') }
//           underlayColor="green"
//         >
//           <Text style={ css2.txt }>你吃饭了吗？</Text>
//         </TouchableHighlight>
//       </View>
//       <Text>Example 2(TouchableOpacity):</Text>
//       <View style={ css2.container }>
//         <TouchableOpacity
//           style={ [css2.item1, { backgroundColor: '#18b4ff' }] }
//           onPress={ this.show.bind(this, '有事吗') }
//           activeOpacity={0.7}
//         >
//           <Text style={ [css2.txt, { color: 'white' }] }>老妹儿</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={ [css2.item2, { backgroundColor: '#18b4ff' }] }
//           onPress={ this.show.bind(this, '不怎么样') }
//           activeOpacity={0.3}
//         >
//           <Text style={ [css2.txt, { color: 'white' }] }>最近怎么样啊</Text>
//         </TouchableOpacity>
//       </View>
//       <Text>Example 3(TouchableWithoutFeedback):</Text>
//       <View style={ css2.container }>
//         <TouchableWithoutFeedback
//           onPressIn={this.show.bind(this, 'pressIn事件触发')}
//           onLongPress={this.show.bind(this, 'longPress事件触发')}
//           onPressOut={this.show.bind(this, 'pressOut事件触发')}
//         >
//           <View style={{}}><Text>有本事你点我啊</Text></View>
//         </TouchableWithoutFeedback>
//       </View>
//     </View>;
//   }
// }
// const css2 = StyleSheet.create({
//   container: {
//     padding: 5,
//     display: 'flex',
//     flexDirection: 'row',
//     height: 50
//   },
//   item1: {
//     flex: 1,
//     marginRight: 5
//   },
//   item2: {
//     flex: 3
//   },
//   txt: {
//     textAlign: 'center',
//     lineHeight: 28,
//     borderRadius: 10
//   }
// });

const imgs = [
  'http://www.ningtaostudy.cn/pic/轮播图3-刘亦菲.jpg',
  'http://www.ningtaostudy.cn/pic/轮播图2-幻想.jpg',
  'http://www.ningtaostudy.cn/pic/轮播图2-学校风光.jpg',
  'http://www.ningtaostudy.cn/pic/轮播图1-电脑桌面.jpg'
];
class LearnImage extends Component{
  render(){
    return <View>
      <View style={ css3.txtContainer }>
        <Text>一个小小照片查看器</Text>
      </View>
      <View style={ css3.imgContainer }>
        <Image
          source={{uri: imgs[2]}}
          resizeMode='cover'
          style={ css3.img } />
      </View>
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
  }
});
AppRegistry.registerComponent('Hello', () => LearnImage);
