import React, { Component } from 'react';
import {
  StatusBar,
  Text,
  View,
  Modal,
  ActivityIndicator,
  AsyncStorage,
  Alert,
} from 'react-native';
import Orientation from 'react-native-orientation';

Orientation.lockToPortrait();

import IndexComponent from './IndexComponent';
import MainComponent from './MainComponent';

export default class StartComponent extends Component{
  constructor(){
    super();
    this.state = {
      visible: true,
      showIndex: false,
      showMain: false,
    };
  }

  componentWillMount(){
    AsyncStorage.getItem('hasLogin', (err, res) => {
      setTimeout(() => {
        this.setState({
          showMain: res === 'true',
          showIndex: res === 'false',
          visible: false,
        });
      }, 1500);
    });
  }

  render(){
    return (
      <View>
        <Modal
          onRequestClose={ () =>{} }
          visible={ this.state.visible }
          transparent={true}
          animationType='none'
        >
          <StatusBar backgroundColor='#000'/>
          <View  style={{ backgroundColor: '#eee', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color='#330066' size={30}/>
            <Text>加载中</Text>
          </View>
        </Modal>
        { this.state.showMain ? <MainComponent logout={ this.logout.bind(this) }/> : null }
        { this.state.showIndex ? <IndexComponent loginSuccess={ this.loginSuccess.bind(this) }/> : null }
      </View>
    );
  }

  //  登陆成功
  loginSuccess(name){
    this.setState({
      showMain: true,
      showIndex: false,
    });
    AsyncStorage.setItem('hasLogin', 'true');
    AsyncStorage.setItem('username', name);
  }

  //  注销
  logout(){
    Alert.alert(
      '注销',
      '如果想要退出你就点点钮',
      [
        {text: '取消', onPress: ()=>{}},
        {
          text: '钮',
          onPress: () => {
            AsyncStorage.setItem('hasLogin', 'false', (err) => {
              if(err){
                alert('存储系统出现问题！请稍后重试');
              } else{
                this.setState({
                  showIndex: true,
                  showMain: false,
                });
              }
            });
          }
        }
      ]
    );
  }
}
