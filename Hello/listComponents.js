/**
 * Created by 战-不败的象征 on 2017/5/1.
 */

import React,{ Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Button,
  DrawerLayoutAndroid,
  FlatList,
  Image,
  KeyboardAvoidingView,
  ListView,
  Modal,
  Picker,
  ProgressBarAndroid,
  RefreshControl,
  ScrollView,
  SectionList,
  Slider,
  StatusBar,
  TextInput,
  TouchableHighlight,
  PixelRatio
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

class HomeScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      modalVisibility: false,
      language: '选择'
    }
  }
  static navigationOptions = {
    title: 'Home'
  };
  showSomething(){
    alert('帅气涛，你吃饭了吗？');
  }
  setModalVisible(visibility){
    this.setState({
      modalVisibility: visibility
    });
  }
  render(){
    const navigationView = (
      <View>
        <Text>这里是Drawer里。。。</Text>
      </View>
    );

    return <ScrollView
      showVerticalScrollIndicator={true}
      style={ css.container }
      refreshControl={
        <RefreshControl
          refreshing={false}  //  是否保留上个页面
          colors={['red', 'blue']}  //  每次转圈的颜色
          enabled={true}  //  下拉时显示
        />
      }
    >
      <View style={ css.header }>
        <Text>下面是React Native里的组件s</Text>
      </View>

      {/*  ActivityIndicator，加载中。。  */}
      <View style={ css.item }>
        <ActivityIndicator
          animating={ true }  //  是否显示，默认显示true
          color="blue"  //  颜色，默认为灰色
          size="large"  //  大小，默认小，large为36、small为20
          style={{ flex: 1 }}
        />
        <ActivityIndicator
          animating={ true }
          style={{ flex: 1 }}
        />
        <ActivityIndicator
          animating={ false }
          size="small"
          style={{ flex: 1 }}
        />
      </View>

      {/*  Button，按钮  */}
      <View style={ css.item }>
        <Button
          title="按钮"
          onPress={ this.showSomething }
        />
        <Button
          title="按钮"
          onPress={ this.showSomething }
          disabled={ true }  //  不可点击
        />
        <Button
          title="按钮"
          accessibilityLabel="这是个按钮"  //  屏幕阅读器使用，盲人用户
          color="green"  //  背景颜色
          onPress={ this.showSomething }
        />
      </View>

      {/*  DrawerLayoutAndroid，抽屉式布局，必须放在最外层  */}
      {/*<View style={ css.item }>*/}
        <DrawerLayoutAndroid
          drawerWidth={ 150 }  //  拉出来的宽度
          drawerPosition={ DrawerLayoutAndroid.positions.Left }  //  从左边还是右边
          renderNavigationView={ ()=>navigationView }  //  拉出来的东西，就是一段组件代码
        >
            <View style={{ height: 200,backgroundColor: 'red' }}>

            </View>
        </DrawerLayoutAndroid>
      {/*</View>*/}

      {/*  FlatList，列表  */}
      <View style={ css.item }>
        <FlatList
          data={ [{ key: '帅气涛'}, { key: '你吃饭了吗' }, { key: '最近怎么样啊' }] }
          renderItem={ ({item}) => <Text>{ item.key }</Text> }
        />
      </View>

      {/*  Image，图片，本地require，网路{ uri: string }  */}
      <View style={ css.item }>
        <Image
          source={ require('./pic/轮播图3-刘亦菲.jpg') }
          resizeMode="center"
          style={{ width: 300,height: 300 }}
        />
        <Image
          source={{ uri: 'http://www.ningtaostudy.cn/pic/轮播图1-电脑桌面.jpg' }}
          resizeMode="center"
          style={{ width: 300,height: 300 }}
        />
      </View>

      {/*  KeyboardAvoidingView，避让键盘  */}
      <View>
        <KeyboardAvoidingView keyboardVerticalOffset={20} behavior={'padding'}>
          <TextInput/>
        </KeyboardAvoidingView>
        <TextInput/>
      </View>

      {/*  Modal，模态框  */}
      <View style={ css.item }>
        <Modal
          animationType="fade"
          transparent={true}
          visible={ this.state.modalVisibility }
          onRequestClose={ () => alert('模态框关闭！') }
        >
          <View style={ css.modalContainer }>
            <View style={ css.modalBody }>
              <Text style={ css.modalContent }>帅气涛，你吃饭了吗？最近怎么样啊，有没有找到对象啊</Text>
              <TouchableHighlight
                underlayColor="rgba(0,0,255,0.5)"
                activeOpacity={0.5}
                onPress={ () => this.setModalVisible(false) }
              >
                <Text style={ css.modalCloseBtn }>关闭模态框</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <TouchableHighlight
          underlayColor="blue"
          activeOpacity={0.5}
          onPress={ () => this.setModalVisible(true) }
          style={ css.showModalBtn }
        >
          <Text style={{ color: 'white' }}>显示模态框</Text>
        </TouchableHighlight>
      </View>

      {/*  Picker，选择器，即下拉列表  */}
      <View>
        <Picker
          mode={'dropdown'}
          prompt="选择"
          selectedValue={ this.state.language }
          onValueChange={ (lang) => this.setState({ language: lang }) }
        >
          <Picker.Item label='Html' value="html"/>
          <Picker.Item label='JavaScript' value="js"/>
          <Picker.Item label='Css' value="css"/>
        </Picker>
      </View>

      {/*  ProgressBarAndroid，圆形进度条、已废弃，用activityIndicator  */}
      <View style={ css.item }>
        {/*<ProgressBarAndroid progress={0.5}/>*/}
      </View>

      {/*  SectionList，列表  */}
      <View>
        <SectionList
          sections={[
            { data: [{ title: 'ef', key: '11' },{ title: '345', key: '12' },{ title: '2w34', key: '13' }], key: 1 },
            { data: [{ title: 'sae', key: '21' },{ title: 'weqr', key: '22' },{ title: 'da', key: '23' }], key: 2 },
            { data: [{ title: 'dcv', key: '31' },{ title: 'dsaf', key: '32' },{ title: 'xa3e', key: '33' }], key: 3 },
          ]}
          renderSectionHeader={ ({section}) => <Text>{section.key}</Text> }
          renderItem={ ({item}) => <Text>{item.title}</Text> }
        />
      </View>

      {/*  Slider，滑块，原生组件，4.3上贼丑  */}
      <View style={ css.item }>
        <Slider
          style={{ width: '100%' }}
          // thumbTintColor={'red'}
          thumbImage={ require('./pic/轮播图2-幻想.jpg') }
          trackImage={ require('./pic/轮播图2-幻想.jpg') }
        />
      </View>

      {/*  StatusBar */}
      <View style={ css.item }>
        <StatusBar barStyle={'light-content'}/>
      </View>

    </ScrollView>;
  }
}
class ChatScreen extends Component{
  static navigationOptions = {
    title: 'Chat'
  };
  render(){
    return (
      <Text>This is a page!</Text>
    );
  }
}
const listComponents = TabNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen }
});
module.export.listComponents = listComponents;
const css = StyleSheet.create({
  container: {
    padding: 5
  },
  header: {
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 1,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  showModalBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#0066cc',
    padding: 10,
    borderRadius: 4
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalBody: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10
  },
  modalContent: {
    padding: 20,
    borderBottomWidth: 1/PixelRatio.get(),
    borderBottomColor: 'black',
    textShadowOffset: {
      x: 0, y: 0
    },
    textShadowColor: 'red',
    textShadowRadius: 10
  },
  modalCloseBtn: {
    padding: 10,
    textAlign: 'center'
  }
});
