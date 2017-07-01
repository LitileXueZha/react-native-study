import React,{ Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import Ripple from './../plugin/ripple';
import {
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';

import AddFoundComponent from './AddFoundComponent';      //  添加组件
import SearchLostComponent from './SearchLostComponent';  //  搜索组件
import UserComponent from './UserComponent';              //  用户组件

const TH_1 = ['#4CA1AF', '#C4E0E5'],
      TH_2 = ['#283E51', '#4B79A1'],
      TH_3 = ['#2C3E59', '#2980B9'],
      TH_4 = ['#2C3E50', '#4CA1AF'],
      TH_5 = ['#F0F2F0', '#000C40'],
      TH_6 = ['#667AA6', '#7CCFFA'],
      TH_7 = ['#1C92D2', '#F2FCFE'],
      TH_8 = ['#197654', '#43C6AC'],
      WIDTH = Dimensions.get('window').width,
      HEIGHT =  Dimensions.get('window').height;
let timer = null;

export default class MainComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      isAdd: true,
      isSearch: false,
      isUser: false,
      sizeAdd: new Animated.Value(0),
      sizeSearch: new Animated.Value(0),
      sizeUser: new Animated.Value(0),
    };
  }

  render(){
    clearTimeout(timer);
    //  切换动画
    if(this.state.isAdd){
      Animated.timing(
        this.state.sizeAdd,
        {
          toValue: 60,
          duration: 500,
        }
      ).start();
      timer = setTimeout(() => {
        this.state.sizeAdd = new Animated.Value(60);
      }, 500);
    }
    if(this.state.isSearch){
      Animated.timing(
        this.state.sizeSearch,
        {
          toValue: 60,
          duration: 500,
        }
      ).start();
      timer = setTimeout(() => {
        this.state.sizeSearch = new Animated.Value(60);
      }, 500);
    }
    if(this.state.isUser){
      Animated.timing(
        this.state.sizeUser,
        {
          toValue: 60,
          duration: 500,
        }
      ).start();
      timer = setTimeout(() => {
        this.state.sizeUser = new Animated.Value(60);
      }, 500);
    }

    return (
      <View style={ css.container }>
        <StatusBar hidden={true}/>
        { this.state.isAdd ? <AddFoundComponent colors={ TH_4 }/> : null }
        { this.state.isSearch ? <SearchLostComponent colors={ TH_8 }/> : null }
        { this.state.isUser ? <UserComponent colors={ TH_6 } logout={ this.props.logout } /> : null }

        {/*  下面是导航栏  */}
        <View style={ css.nav }>
          <Ripple
            // style={this.state.isAdd ? [css.navItem, {backgroundColor: 'rgba(255,255,255,0.9)'}] : css.navItem }
            style={ css.navItem }
            rippleDuration={1250}
            rippleColor={TH_4[0]}
            rippleCentered={!this.state.isAdd}
            onPress={ () => this.navAdd() }
          >
            <Animated.View style={[ css.animationView, {width:this.state.sizeAdd,height:this.state.sizeAdd}] }/>
            <View style={ css.iconContainer }>
              <Icon
                name='ios-add'
                size={ this.state.isAdd ? 30 : 25 }
                color={ this.state.isAdd ? TH_4[0] : '#fff' }/>
            </View>
          </Ripple>
          <Ripple
            // style={this.state.isSearch ? [css.navItem, {backgroundColor: 'rgba(255,255,255,0.9)'}] : css.navItem }
            style={ css.navItem }
            rippleDuration={1250}
            rippleCentered={!this.state.isSearch}
            rippleColor={TH_8[0]}
            onPress={ () => this.navSearch() }
          >
            <Animated.View style={[ css.animationView, {width:this.state.sizeSearch,height:this.state.sizeSearch}] }/>
            <View style={ css.iconContainer }>
              <Icon
                name='ios-search-outline'
                size={ this.state.isSearch ? 30 : 20 }
                color={ this.state.isSearch ? TH_8[0] : '#fff' }/>
            </View>
          </Ripple>
          <Ripple
            // style={this.state.isUser ? [css.navItem, {backgroundColor: 'rgba(255,255,255,0.9)'}] : css.navItem }
            style={ css.navItem }
            rippleDuration={1250}
            rippleColor={TH_6[1]}
            rippleCentered={!this.state.isUser}
            onPress={ () => this.navUser() }
          >
            <Animated.View style={[ css.animationView, {width:this.state.sizeUser,height:this.state.sizeUser}] }/>
            <View style={ css.iconContainer }>
              <SimpleLineIcon
                name='user'
                size={ this.state.isUser ? 22 : 12 }
                color={ this.state.isUser ? TH_6[1] : '#fff' }/>
            </View>
          </Ripple>
        </View>
      </View>
    );
  }

  //  跳转add界面
  navAdd(){
    if(!this.state.isAdd){
      // 不是这个界面才跳转
      this.setState({
        isAdd: true,
        isSearch: false,
        isUser: false,
      });
      this.state.sizeAdd = new Animated.Value(0);
      Animated.timing(
        this.state.sizeSearch,
        {
          toValue: 0,
          duration: 500,
        }
      ).start();
      Animated.timing(
        this.state.sizeUser,
        {
          toValue: 0,
          duration: 500,
        }
      ).start();
    }
  }

  //  跳转search界面
  navSearch(){
    if(!this.state.isSearch){
      // 不是这个界面才跳转
      this.setState({
        isAdd: false,
        isSearch: true,
        isUser: false,
      });
      this.state.sizeSearch = new Animated.Value(0);
      Animated.timing(
        this.state.sizeAdd,
        {
          toValue: 0,
          duration: 500,
        }
      ).start();
      Animated.timing(
        this.state.sizeUser,
        {
          toValue: 0,
          duration: 500,
        }
      ).start();
    }
  }

  //  跳转user界面
  navUser(){
    if(!this.state.isUser){
      // 不是这个界面才跳转
      this.setState({
        isAdd: false,
        isSearch: false,
        isUser: true,
      });
      this.state.sizeUser = new Animated.Value(0);
      Animated.timing(
        this.state.sizeAdd,
        {
          toValue: 0,
          duration: 500,
        }
      ).start();
      Animated.timing(
        this.state.sizeSearch,
        {
          toValue: 0,
          duration: 500,
        }
      ).start();
    }
  }
}

const css = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    position: 'relative',
  },
  nav: {
    position: 'absolute',
    bottom: 0,
    zIndex: 999,
    width: '100%',
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  navItem: {
    width: 60,
    height: 60,
    borderRadius: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  animationView: {
    backgroundColor: '#fff',
    borderRadius: 60,
  },
});
