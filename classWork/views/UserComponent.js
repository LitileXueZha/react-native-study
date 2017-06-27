import React,{ Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from './../plugin/ripple';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  RefreshControl,
  StatusBar,
} from 'react-native';

const WIDTH = Dimensions.get('window').width,
      HEIGHT =  Dimensions.get('window').height;

export default class MainComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      refreshing: false,
      username: '微风轻拂晨曦之纱',
      founds: 10,
      losts: 6,
    };
  }

  render(){
    return (
      <LinearGradient colors={ this.props.colors } start={{x: 0, y: 1}} end={{x:1, y: 0.5}} style={{height: HEIGHT}}>
        <View style={{height: HEIGHT-80}}>
          <ScrollView
            style={ css.container }
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={this.state.refreshing}/>
            }
          >
            <Text style={ css.userName }>(｡･∀･)ﾉﾞ嗨~   <Text style={{color: '#ffff00'}}>{ this.state.username }</Text></Text>
            <View style={ css.row }>
              <Ripple rippleColor='#fff' rippleOpacity={0.1} rippleDuration={2000} style={ css.item }>
                <Text style={ css.LFText }>{this.state.founds}</Text>
                <Text style={{color: '#fff'}}>哈，我看到了</Text>
              </Ripple>
              <Ripple rippleColor='#fff' rippleOpacity={0.1} rippleDuration={2000} style={ css.item }>
                <Text style={ css.LFText }>{this.state.losts}</Text>
                <Text style={{color: '#fff'}}>咦？我的东西呢</Text>
              </Ripple>
            </View>
            <View style={ css.row }>
              <Ripple rippleColor='#fff' rippleOpacity={0.1} rippleDuration={2000} style={ css.item }>
                <Icon name='ios-color-palette-outline' size={30} style={ css.icon }/>
                <Text style={{color: '#fff'}}>修改资料</Text>
              </Ripple>
              <Ripple
                rippleColor='#fff'
                rippleOpacity={0.1}
                rippleDuration={2000}
                style={ css.item }
                onPress={ () => this.props.logout() }
              >
                <Icon name='ios-power' size={30} style={[ css.icon, {color:'#ff0000'} ]}/>
                <Text style={{color: '#ff0000'}}>退出登陆</Text>
              </Ripple>
            </View>
            <View style={ css.row }>
              <Ripple rippleColor='#fff' rippleOpacity={0.1} rippleDuration={2000} style={ css.item }>
                <Icon name='ios-bug-outline' size={30} style={ css.icon }/>
                <Text style={{color: '#fff'}}>bug出现  >o_o&lt;</Text>
              </Ripple>
              <Ripple rippleColor='#fff' rippleOpacity={0.1} rippleDuration={2000} style={ css.item }>
                <Icon name='ios-information-circle-outline' size={30} style={ css.icon }/>
                <Text style={{color: '#fff'}}>更多</Text>
              </Ripple>
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    );
  }

}

const css = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT-100,
  },
  userName: {
    color: '#fff',
    textAlign: 'center',
    margin: 20,
    height: 20,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: (HEIGHT-140)/3,
  },
  item: {
    flex: 1,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  LFText: {
    color: '#fff',
    fontSize: 30,
    lineHeight: 30,
    marginBottom: 10,
  },
  icon: {
    width: 50,
    height: 50,
    color: '#fff',
    elevation: 10,
    textAlign: 'center',
    lineHeight: 50,
    marginBottom: 10,
  },
});