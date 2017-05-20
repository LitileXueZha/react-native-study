/**
 * Created by 战-不败的象征 on 2017/5/12.
 */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  AsyncStorage,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  FlatList,
  RefreshControl,
} from 'react-native';

//  水果：图片信息，单价，数量
const fruits = [
  {
    id: 1,
    title: '美味可口的草莓',
    desc: '12个装',
    price: 20.00,
    url: require('./pic/1.草莓.png')
  },
  {
    id: 2,
    title: '鲜艳迷人的甜橙',
    desc: '6个装',
    price: 15.50,
    url: require('./pic/2.橙子.png')
  },
  {
    id: 3,
    title: '圆圆肥肥的苹果',
    desc: '1000g',
    price: 9.99,
    url: require('./pic/3.苹果.png')
  },
  {
    id: 4,
    title: '口感多汁的西瓜',
    desc: '2000g',
    price: 10.00,
    url: require('./pic/4.西瓜.png')
  },
  {
    id: 5,
    title: '神秘范儿的蓝莓',
    desc: '20个装',
    price: 32.00,
    url: require('./pic/6.蓝莓.png')
  },
  {
    id: 6,
    title: '金光闪耀的香蕉',
    desc: '10条装',
    price: 16.50,
    url: require('./pic/7.香蕉.png')
  }
];

//  样式
const css = StyleSheet.create({
  itemContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  item: {
    backgroundColor: 'white',
    width: 400,
    height: 305,
  },
  itemImg: {
    width: 300,
    height: 225,   //  高度是为了保持4:3
    marginTop: 15,
    marginLeft: 50,
    borderRadius: 4
  },
  itemText: {
    width: 300,
    height: 45,
    marginLeft: 50,
    marginTop: 5
  },
  btnContainer: {
    padding: 5,
    paddingTop: 20
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    height: 100,
    padding: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  listItemImg: {
    width: 100,
    height: 80,
  },
  listItemInfo: {
    flex: 1,
    height: 80,
    display: 'flex',
    flexDirection: 'column',
  },
  listItemText: {
    textAlign: 'right',
    flex: 1,
    lineHeight: 20,
  },
  pay: {
    margin: 10,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#330066',
    borderRadius: 2,
  },
  clear: {
    margin: 10,
    marginTop: 0,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
});

//  一个水果组件，展示一种水果
class ItemComponent extends Component{
  render(){
    return (
      <View style={ css.item }>
        <TouchableOpacity onPress={ this.props.press }>
          <Image
            source={ this.props.url }
            resizeMode="contain"
            style={ css.itemImg }
          />
          <View style={ css.itemText }>
            <View style={{ position: 'relative' }}>
              <Text style={{ fontSize: 16 }}>
                <Icon size={ 20 } name="tag"/>
                { '   ' +this.props.title }
              </Text>
              <Text style={{ fontSize: 14, position: 'absolute', top: 0, right: 0 }}>
                <Icon size={ 20 } name="shopping-cart"/>
                { '   ' +this.props.desc }
              </Text>
            </View>
            <Text style={{ fontSize: 16, width: '100%', textAlign: 'right', marginTop: 5 }}>
              ￥{ this.props.price }
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

//  水果列表组件，
class ListComponent extends Component{
  constructor(){
    super();
    this.state = {
      count: 0
    };
  }
  static navigationOptions = {
    title: '欢迎来到我的水果店'
  };
  componentDidMount(){
    // AsyncStorage.clear();
    AsyncStorage.getAllKeys((err, keys) => {
      if(err){
        alert('读取数据失败！请重启App');
      }
      this.setState({
        count: keys.length
      });
    });
  }
  render(){
    //  遍历数组为一组组件以用于展示
    let lis = [];
    fruits.forEach((value, index) => {
      lis.push(<ItemComponent
        id={ value.id }
        title={ value.title }
        desc={ value.desc }
        price={ value.price }
        url={ value.url }
        press={ () => this.press(value) }
        key={ index }
      />);
    });

    //  计数
    let count = this.state.count,
        str = '';
    if(count){
      str = '，选了'+ count +'件商品';
    }
    return (
      <ScrollView style={{ width: '100%' }}>
        <View style={ css.itemContainer }>
          { lis }
        </View>
        <View style={ css.btnContainer }>
          <Button title={ '去结算'+ str } onPress={ () => this.props.navigation.navigate('Cart') } color="#330066"/>
        </View>
      </ScrollView>
    );
  }

  //  点击事件
  press(data){
    this.setState({
      count: ++ this.state.count
    });
    AsyncStorage.setItem('SP-'+ this.getID() +'-SP', JSON.stringify(data), (err) => {
      if(err){
        alert('存储失败！请重启App');
      }
    });
  }

  //  生成随机ID：GUID
  //  GUID生成的代码来自于Stoyan Stefanov
  getID(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random()*16 | 0,
          v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    }).toUpperCase();
  }
}

//  购物车组件
class CartComponent extends Component{
  constructor(){
    super();
    this.state = {
      data: [],
      totalMoney: 0,
    };
  }
  static navigationOptions = {
    title: '水果列表'
  };

  componentDidMount(){
    AsyncStorage.getAllKeys((err, keys) => {
      if(err){
        alert('读取数据出错！请重启App');
      }
      AsyncStorage.multiGet(keys, (err, result) => {
        if(err){
          alert('读取出错！');
        }
        let arr = [], arrIdOld = [];
        for(let i in result){
          //  一个对象数据，给它添加数量信息;必需解析，不然只是字符串，从而体现了跟localstorage只能保存字符串的缺点
          let item = JSON.parse(result[i][1]);
          if( !(arrIdOld.includes(item.id)) ){
            item.num = 0;
            arr.push(item);
          }
          arrIdOld.push(item.id);
        }
        for(let i in arr){
          let id = arr[i].id,
              ar = Array.from(arrIdOld);
          arr[i].num = arrIdOld.length - ar.join('').split(id).join('').split('').length;
          this.state.totalMoney += arr[i].price * arr[i].num;
        }
        this.setState({
          data: arr,
          totalMoney: this.state.totalMoney.toFixed(2)
        });
      });
    });
  }

  render(){
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={ false }
            enabled={ true }
            colors={['red', 'green', 'blue']}
            // progressBackgroundColor="#330066"
          />
        }
      >
        <FlatList
          data={ this.state.data }
          keyExtractor={ (item, index) => item.id }
          renderItem={ this._renderItem }
        />
        <TouchableNativeFeedback
          // background={ TouchableNativeFeedback.Ripple('#000000') }
        >
          <View style={ css.pay }>
            <Text style={{ color: '#ffffff' }}>支付，共{ this.state.totalMoney }元</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          // background={ TouchableNativeFeedback.SelectableBackground() }
          onPress={ () => this.clearCart }
        >
          <View style={ css.clear }>
            <Text style={{ color: '#330066' }}>清空购物车</Text>
          </View>
        </TouchableNativeFeedback>
      </ScrollView>
    );
  }

  _renderItem = ({ item }) => (
    <View style={ css.listItem }>
      <Image source={ item.url } style={ css.listItemImg } resizeMode="contain"/>
      <View style={ css.listItemInfo }>
        <Text style={ [ css.listItemText, { flex: 2 }] }>{ item.title + item.desc }</Text>
        <Text style={ css.listItemText }>x { item.num }</Text>
        <Text style={ css.listItemText }>￥{ item.price * item.num }</Text>
      </View>
    </View>
  );

  clearCart(){
    AsyncStorage.clear((err) => {
      if(!err){
        this.setState({
          data: 0,
          totalMoney: 0
        });
        alert("购物车已清空！");
      } else{
        alert(err);
      }
    });
  }

}

//  导出组件，本来想导出StackNavigator()的变量，但是提示undefined
export { ListComponent, CartComponent }