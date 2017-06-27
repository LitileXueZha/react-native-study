/**
 * Created by 战-不败的象征 on 2017/6/22.
 */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from './../plugin/ripple';
import {
  StyleSheet,
  Image,
  Modal,
  View,
  ScrollView,
  Text,
  TextInput,
  AsyncStorage,
  BackHandler,
  Dimensions,
  LayoutAnimation,
  StatusBar,
  PixelRatio,
  PanResponder,
} from 'react-native';

//  自定义trim函数，把每个空格都去掉
window.trim = function (s) {
  return s.replace(/\s*/, '').split('').reverse().join('').replace(/\s*/, '').split('').reverse().join('');
};

const WIDTH = Dimensions.get('window').width,
      HEIGHT = Dimensions.get('window').height,
      ML = PixelRatio.get(),
      CH = 38,
      MODAL_COLOR = '#996699',
      HALF_WHITE = 'rgba(255,255,255,0.5)',
      TOP_COLOR = '#FF3B50',
      BOTTOM_COLOR = '#FFB199',
      HOST_NAME = 'www.ningtaostudy.cn';
let touchY = 0;  //  用户触摸y轴方向
let scrollOnce = 0;  //  解决多次点击bug
let isTop = true;  //  是否为登陆界面
//  主界面
export default class IndexComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      noSeePassword: true,
    };
  }

  //  手势下滑到注册界面
  componentWillMount(){
    this.indexPanResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (e) => true,
      onPanResponderGrant: (e, ges) => {
        touchY = ges.moveY;
      },
      onPanResponderRelease: (e, ges) => {
        if(ges.moveY - touchY > 100){
          if(scrollOnce === 0 && isTop){
            scrollOnce ++;
            let index = 0,
              a = 1;
            let scrollAnimation = () => {
              if(index >= HEIGHT){
                scrollOnce = 0;
                isTop = false;
                StatusBar.setBackgroundColor(BOTTOM_COLOR, true);
                return false;
              }
              index = index + a;
              a += 0.4;
              this.refs.indexScroll.scrollTo({y: index});
              requestAnimationFrame(scrollAnimation);
            };
            scrollAnimation();
          }
        }
      },
    });
  }

  render(){
    // 监听后退按钮
    BackHandler.addEventListener('hardwareBackPress', () => {
      if(!isTop){
        // 如果用户滑动注册页面，点返回键不直接退出
        if(scrollOnce === 0){
          scrollOnce ++;
          let index = HEIGHT,
            a = 1;
          let scrollAnimation = () => {
            if(index <= 0){
              scrollOnce = 0;
              isTop = true;
              StatusBar.setBackgroundColor(TOP_COLOR, true);
              return false;
            }
            index = index - a;
            a += 0.3;
            this.refs.indexScroll.scrollTo({y: index});
            requestAnimationFrame(scrollAnimation);
          };
          scrollAnimation();
        }
        return true;
      }
    });

    return <ScrollView
      scrollEnabled={false}
      ref="indexScroll"
      showsVerticalScrollIndicator={false}
    >
      <View {...this.indexPanResponder.panHandlers}>
        <LoginComponent noSeePassword={ this.state.noSeePassword } indexScroll={ this } loginSuccess={ this.props.loginSuccess }/>
      </View>
      <View onMoveShouldSetPanResponder={()=>false} onStartShouldPanResponder={()=>false}>
        <RegisterComponent loginScroll={ this.loginScroll() } noSeePassword={ this.state.noSeePassword } indexScroll={ this }/>
      </View>
    </ScrollView>;
  }

  loginScroll(){
    return () => {
      if(scrollOnce === 0){
        scrollOnce ++;
        let index = HEIGHT,
          a = 1;
        let scrollAnimation = () => {
          if(index <= 0){
            scrollOnce = 0;
            isTop = true;
            StatusBar.setBackgroundColor(TOP_COLOR, true);
            return false;
          }
          index = index - a;
          a += 0.3;
          this.refs.indexScroll.scrollTo({y: index});
          requestAnimationFrame(scrollAnimation);
        };
        scrollAnimation();
      }
    };
  }
}

//  登陆组件
class LoginComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      noSeePassword: props.noSeePassword,
      username: '',
      password: '',
      message: '',
      visible: false,
      modalNoSeePassword: true,
      adjustTop: 190,
      email: '',
      newPassword: '',
      confirmPassword: '',
      modalMsg: '',
      isSecondPasswordError: false,
      successContainer: {},
      successTextStyle: {},
      btnText: '发送',
    };
  }

  render(){
    return (
      <LinearGradient colors={[TOP_COLOR, BOTTOM_COLOR]} style={ css.container }>
        <StatusBar backgroundColor={TOP_COLOR}/>
        <Ripple rippleDuration={2000} rippleColor={HALF_WHITE} style={ css.logoContainer }>
          <Image source={ require('./../img/login_2.png') } resizeMode='contain' style={ css.logo }/>
        </Ripple>
        <Text style={ css.title }>登陆</Text>
        <View style={ css.inputContainer }>
          <Icon name='user' size={16} style={ css.inputIcon }/>
          <TextInput
            returnKeyType='next'
            underlineColorAndroid='transparent'
            placeholder='用户名'
            placeholderTextColor={HALF_WHITE}
            selectionColor='#fff'
            style={ css.inputText }
            onChangeText={ (s) => this.state.username = s }
            onFocus={ () => this.setState({message: ''}) }
          />
          <Text style={ css.msg }>{ this.state.message }</Text>
        </View>

        <View style={ css.inputContainer }>
          <Icon name='lock' size={17} style={[ css.inputIcon, {left: 1} ]}/>
          <TextInput
            underlineColorAndroid='transparent'
            placeholder='密码'
            placeholderTextColor={HALF_WHITE}
            secureTextEntry={ this.state.noSeePassword }
            selectionColor='#fff'
            style={ css.inputText }
            onChangeText={ (s) => this.state.password = s }
            onFocus={ () => this.setState({message: ''}) }
            onBlur={ () => this.props.indexScroll.refs.indexScroll.scrollTo({y: 0, animated: true}) }
          />
          <Ripple
            onPress={ togglePassword.bind(this) }
            rippleColor={HALF_WHITE}
            style={ css.passwdContainer }
          >
            <Icon
              name={ this.state.noSeePassword ? 'eye-slash' : 'eye' }
              size={16}
              style={ css.passwd }
            />
          </Ripple>
        </View>

        <Ripple
          style={[ css.doContainer, {marginTop: 26} ]}
          rippleDuration={1000}
          onPress={ () => this.login() }
        >
          <Text style={ css.doText }>启程</Text>
        </Ripple>
        <View style={[ css.dividerContainer, {marginTop: 10} ]}>
          <View style={ css.dividerLeft }/>
          <Ripple
            rippleDuration={1000}
            rippleColor='rgba(255,255,255,0.3)'
            onPress={ () => this.toggleModal(true) }
          >
            <Text style={[ css.dividerText, css.forgetPassword ]}>忘记密码</Text>
          </Ripple>
          <View style={ css.dividerRight }/>
        </View>

        <Modal
          animationType="fade"
          visible={ this.state.visible }
          transparent={true}
          onRequestClose={ () => this.toggleModal(false) }
          onMoveShouldSetPanResponder={()=>false} onStartShouldPanResponder={()=>false}
          style={ css.modalContainer }
        >
          <View style={ css.modalHeader }>
            <Ripple rippleDuration={2000} rippleColor={HALF_WHITE} style={ css.modalHeaderImg }>
              <Image source={ require('./../img/forgot_1.png') } resizeMode='contain' style={{ width: '100%',height: '100%' }}/>
            </Ripple>
            <Ripple
              rippleColor='rgba(255,255,255,0.3)'
              style={ css.modalHeaderIcon }
              onPress={ () => this.toggleModal(false) }
            >
              <Icon name='long-arrow-left' size={20} color='#fff'/>
            </Ripple>
          </View>
          <View style={ css.modalBody } />
          <View style={[ css.modalForm, {top: this.state.adjustTop} ]}>
            <View style={ css.modalFormItem }>
              <TextInput
                keyboardType='email-address'
                returnKeyType='next'
                underlineColorAndroid='transparent'
                placeholder='电子邮箱'
                placeholderTextColor={MODAL_COLOR}
                style={{ position: 'relative', top: 5,left: -5,color: MODAL_COLOR }}
                onChangeText={ this.emailHandler.bind(this) }
                onFocus={ () => this.setState({modalMsg: ''}) }
                ref="emailInput"
              />
              <Text style={ css.modalMsg }>{ this.state.modalMsg }</Text>
            </View>
            <View style={ css.modalFormItem }>
              <TextInput
                returnKeyType='next'
                underlineColorAndroid='transparent'
                secureTextEntry={ this.state.modalNoSeePassword }
                selectionColor={MODAL_COLOR}
                placeholder='新密码'
                placeholderTextColor={MODAL_COLOR}
                style={{ position: 'relative', top: 5,left: -5,color: MODAL_COLOR }}
                onChangeText={(s) => this.state.newPassword = s}
                onFocus={ () => this.setState({isSecondPasswordError: false}) }
                ref="newPasswordInput"
              />
              <Text style={ css.modalMsg }>{ this.state.isSecondPasswordError ? '确认密码错了，哥' : '' }</Text>
            </View>
            <View style={ css.modalFormItem }>
              <TextInput
                returnKeyType='done'
                underlineColorAndroid='transparent'
                secureTextEntry={ this.state.modalNoSeePassword }
                selectionColor={MODAL_COLOR}
                placeholder='确认密码'
                placeholderTextColor={MODAL_COLOR}
                style={{ position: 'relative', top: 5,left: -5,color: MODAL_COLOR }}
                onChangeText={ this.checkPassword.bind(this) }
                onFocus={ () => this.adjustInput('higher') }
                onBlur={ () => this.adjustInput('lower') }
                onEndEditing={ () => this.adjustInput('lower') }
                onSubmitEditing={ () => this.adjustInput('lower') }
                ref="confirmPasswordInput"
              />
            </View>
            <Ripple
              rippleColor='rgb(255,255,255)'
              rippleDuration={1000}
              style={[ css.modalFormBtn, this.state.successContainer ]}
              onPress={ () => this.forgot() }
            >
              <Text style={[ {color: '#fff',marginRight: 10}, this.state.successTextStyle ]}>{this.state.btnText}</Text>
              { this.state.modalNoSeePassword ?
                <Icon name='send' size={14} color='#fff'/> :
                <Icon name='check' size={14} color={MODAL_COLOR}/>
              }
            </Ripple>
          </View>
        </Modal>

        <Text style={ css.copyright }><Icon name='copyright' size={8}/> 宁涛：“ 动动手指，你就可以滑到下面<Text style={{color: '#ffff00'}}>注册</Text>。”</Text>
      </LinearGradient>
    );
  }

  toggleModal(s){
    this.setState({
      visible: s,
    });
    scrollOnce = s ? 1 : 0;  //  解决modal显示时还能响应手势bug
    if(s){
      StatusBar.setBackgroundColor(MODAL_COLOR, true);
      this.setState({
        successContainer: {},
        successTextStyle: {},
        btnText: '发送',
        modalNoSeePassword: true,
      });
    } else {
      StatusBar.setBackgroundColor(TOP_COLOR, true);
    }
  }

  login(){
    let isUsername = trim(this.state.username) === '',
        isPassword = trim(this.state.password) === '';
    if (isUsername && isPassword){
      this.setState({
        message: '什么都木有...',
      });
    } else if(isUsername){
      this.setState({
        message: '你是谁？',
      });
    } else if(isPassword) {
      this.setState({
        message: '密码从哪里来？',
      });
    } else {
      this.setState({
        message: '',
      });

      // 发送数据请求
      let url = `http://${HOST_NAME}/appClassWork/login.php`,
        method = 'post',
        headers = {
          'Accept': 'application/text',
          'Content-Type': 'multipart/form-data',
        },
        body = new FormData();
      body.append('username', this.state.username);
      body.append('password', this.state.password);
      fetch(url,{
        method: method,
        headers: headers,
        body: body,
      })
      .then((s) => s.text())
      .then((res) => {
        if(parseInt(res) === 1){
          this.props.loginSuccess();
        } else {
          this.setState({
            message: res,
          });
        }
      })
      .catch((s) => {
        alert(s);
      });
    }
  }

  adjustInput(desc){
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({
      adjustTop: (desc === 'higher' && this.state.adjustTop !== 145) ? 145 : 190,
    });
  }

  emailHandler(s){
    if(trim(s) === ''){
      this.setState({
        modalMsg: '邮箱空空...'
      });
    } else {
      this.state.email = s;
      let isNice = /[a-zA-Z\d_]+@[a-zA-Z\d]{2,6}\.[a-zA-Z]{1,5}/.test(s);
      this.setState({
        modalMsg: isNice ? '' : '你这个邮箱不对吧'
      });
    }
  }

  checkPassword(s){
    this.state.confirmPassword = s;
    this.setState({
      isSecondPasswordError: trim(s) !== trim(this.state.newPassword)
    });
  }

  forgot(){
    let email = trim(this.state.email),
        newPassword = trim(this.state.newPassword),
        confirmPassword = trim(this.state.confirmPassword);
    let is_1 = (email === ''),
        is_2 = (newPassword === ''),
        is_3 = (confirmPassword === '');
    if(is_1 && is_2 && is_3){
      this.setState({
        modalMsg: '...木有东西'
      });
    } else if(is_1){
      this.setState({
        modalMsg: '邮箱空空...'
      })
    } else if (is_2 || is_3){
      this.setState({
        modalMsg: 'where is password ?'
      });
    } else {
      if(!this.state.isSecondPasswordError){
        let url = `http://${HOST_NAME}/appClassWork/forgot.php`,
            method = 'post',
            headers = {
              'Accept': 'application/text',
              'Content-Type': 'multipart/form-data',
            },
            body = new FormData();
        body.append('email', email);
        body.append('password', confirmPassword);
        fetch(url, {
          method: method,
          headers: headers,
          body: body,
        })
        .then((s)=>s.text())
        .then((res) => {
          this.setState({
            successContainer: {backgroundColor: 'transparent'},
            successTextStyle: {color: MODAL_COLOR},
            btnText: res,
            modalNoSeePassword: false,
          });
        })
        .catch((err) => {
          alert(err);
        });
      }
    }
  }
}

//  注册组件
class RegisterComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      noSeePassword: props.noSeePassword,
      validateEmail: '',
      registerData: {
        username: '',
        email: '',
        password: '',
      },
      validateRegister: '',
      msgFontSize: 4,
      registerRespondContainer: {},
      registerRespondText: '我们注册吧',
      registerRespondTextStyle: {},
      inputEditable: true,
    };
  }

  render(){
    return (
      <LinearGradient colors={[BOTTOM_COLOR, TOP_COLOR]} style={ css.container }>
        <Ripple rippleDuration={2000} rippleColor={HALF_WHITE} style={ css.logoContainer }>
          <Image source={ require('./../img/register_1.png') } resizeMode='contain' style={ css.logo }/>
        </Ripple>
        <Text style={ css.title }>注册</Text>
        <View style={ css.inputContainer }>
          <Icon name='user' size={16} style={ css.inputIcon }/>
          <TextInput
            underlineColorAndroid='transparent'
            returnKeyType='next'
            editable={ this.state.inputEditable }
            placeholder='客官贵姓'
            placeholderTextColor={HALF_WHITE}
            selectionColor='#fff'
            style={ css.inputText }
            onChangeText={ (s) => this.state.registerData.username = s }
            onFocus={ () => this.setState({validateRegister: ''}) }
          />
          <Text style={[ css.msg ]}>{ this.state.validateRegister }</Text>
        </View>

        <View style={ css.inputContainer }>
          <Icon name='at' size={16} style={ css.inputIcon }/>
          <TextInput
            keyboardType='email-address'
            returnKeyType='next'
            editable={ this.state.inputEditable }
            underlineColorAndroid='transparent'
            placeholder='千里邮思'
            placeholderTextColor={HALF_WHITE}
            selectionColor='#fff'
            style={ css.inputText }
            onChangeText={ this.emailTextHandler.bind(this) }
            onFocus={ () => this.setState({validateRegister: ''}) }
          />
          <Text style={ css.msg }>{ this.state.validateEmail }</Text>
        </View>

        <View style={ css.inputContainer }>
          <Icon name='lock' size={17} style={[ css.inputIcon, {left: 1} ]}/>
          <TextInput
            underlineColorAndroid='transparent'
            returnKeyType='done'
            editable={ this.state.inputEditable }
            placeholder='保秘密'
            placeholderTextColor={HALF_WHITE}
            selectionColor='#fff'
            secureTextEntry={ this.state.noSeePassword }
            style={ css.inputText }
            onChangeText={ (s) => this.state.registerData.password = s }
            onFocus={ () => this.setState({validateRegister: ''}) }
            onBlur={ () => this.props.indexScroll.refs.indexScroll.scrollTo({y: HEIGHT, animated: true}) }
          />
          <Ripple rippleColor='rgba(255,255,255,0.3)' rippleContainerBorderRadius={30} style={ css.passwdContainer } onPress={ togglePassword.bind(this) }>
            <Icon
              name={ this.state.noSeePassword ? 'eye-slash' : 'eye' }
              size={ 16 }
              style={ css.passwd }
              onPress={ togglePassword.bind(this) }
            />
          </Ripple>
          <Text style={ css.msg }> </Text>
        </View>

        <Ripple
          rippleDuration={1000}
          onPress={ () => this.register() }
          style={[ css.doContainer, {marginTop: 26}, this.state.registerRespondContainer ]}
        >
          <Text style={[ css.doText, this.state.registerRespondTextStyle ]}>{ this.state.registerRespondText }</Text>
        </Ripple>
        <View style={[ css.dividerContainer, {marginTop: 10, marginBottom: -10} ]}>
          <View style={ css.dividerLeft }>{}</View>
          <Text style={ css.dividerText }>或者</Text>
          <View style={ css.dividerRight }>{}</View>
        </View>
        <Ripple
          rippleDuration={1000}
          onPress={ this.props.loginScroll }
          style={ css.doContainer }
        >
          <Text style={ css.doText }>登陆</Text>
        </Ripple>
      </LinearGradient>
    );
  }

  //  邮箱验证
  emailTextHandler(s){
    this.state.registerData.email = s;
    let isNice = /[a-zA-Z\d_]+@[a-zA-Z\d]{2,6}\.[a-zA-Z]{1,5}/.test(s);
    this.setState({
      validateEmail: isNice ? '' : '你这个邮箱不对吧'
    });
    if(isNice){
      let url = `http://${HOST_NAME}/appClassWork/register.php`,
          method = 'post',
          headers = {
            'Accept': 'application/text',
            'Content-Type': 'multipart/form-data',
          },
          body = new FormData();
      body.append('validateEmail', true);
      body.append('validateRegister', false);
      body.append('email', s);
      fetch(url, {
        method: method,
        headers: headers,
        body: body,
      })
      .then( (txt) => txt.text())
      .then( (txt) => {
        let isOk = !(txt === '这个邮箱被人用了-_-"');
        this.setState({
          validateEmail: isOk ? '' : txt,
        });
        if(isOk){
          this.state.registerData.email = s;
        }
      })
      .catch((err) => alert(err));
    }
  }

  // 注册
  register(){
    let msg = '';
    let isUsername = trim(this.state.registerData.username) === '',
        isPassword = trim(this.state.registerData.password) === '';
    if(isUsername && isPassword){
      msg = '滴~请输入用户名与密码';
    } else if (isUsername){
      msg = '你名字呢~_~"';
    } else if (isPassword){
      msg = '密码是要滴~_~"';
    }
    if(msg){
      this.setState({
        validateRegister: msg,
      });
    } else if(this.state.registerData.email === ''){
      this.setState({
        validateEmail: '哥，邮箱哪？'
      });
    } else if(this.state.validateEmail){
      this.setState({
        validateEmail: this.state.validateEmail
      });
    }
    else {
      //  全部填写正确，发送网络请求
      let url = `http://${HOST_NAME}/appClassWork/register.php`,
          method = 'post',
          headers = {
            'Accept': 'application/text',
            'Content-Type': 'multipart/form-data',
          },
          body = new FormData();
      body.append('validateRegister', true);
      body.append('validateEmail', false);
      body.append('username', this.state.registerData.username);
      body.append('email', this.state.registerData.email);
      body.append('password', this.state.registerData.password);
      // alert(body);
      fetch(url, {
        method: method,
        headers: headers,
        body: body,
      })
      .then((txt) => txt.text())
      .then((txt) => {
        this.setState({
          [txt === '这个邮箱被人用了-_-"' ? 'validateEmail' : 'registerRespondText']: txt,
          registerRespondContainer: {backgroundColor: 'transparent',elevation: 0},
          registerRespondTextStyle: {color: '#fff'},
          inputEditable: !(txt === '欢迎加入我们 ^_^'),
        });
        // if(txt === '这个邮箱被人用了-_-"'){
        //   this.setState({
        //     validateEmail: txt,
        //   });
        // } else {
        //   this.setState({
        //     registerRespondText: txt,
        //   });
        // }
      });
    }
  }
}

/*
*  切换密码显示
* */
function togglePassword(){
  this.setState({
    noSeePassword: !this.state.noSeePassword
  });
}


const css = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    paddingLeft: 35,
    paddingRight: 35,
  },
  logoContainer: {
    width: '100%',
    height: '35%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '60%',
    position: 'relative',
    left: -4,
  },
  title: {
    width: '100%',
    height: CH,
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    position: 'relative',
    top: -15,
  },
  //  输入样式
  inputContainer: {
    width: '100%',
    height: CH,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#fff',
    marginTop: 10,
    paddingLeft: 5,
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  inputIcon: {
    position: 'relative',
    top: -5,
    width: 18,
    marginRight: 15,
    color: '#fff',
  },
  inputText: {
    flex: 1,
    padding: 0,
    margin: 0,
    color: '#fff',
  },
  passwdContainer: {
    position: 'relative',
    left: 10,
    top: -2,
  },
  passwd: {
    color: '#fff',
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 23,
    zIndex: 999,
    elevation: 5,
  },
  //  按钮样式
  doContainer: {
    width: '100%',
    height: CH,
    marginTop: 20,
    borderRadius: 1,
    backgroundColor: '#fff',
    elevation: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doText: {
    color: TOP_COLOR,
  },
//  分界线
  dividerContainer: {
    width: '100%',
    height: CH,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dividerLeft: {
    flex: 1,
    height: 1,
    backgroundColor: '#fff',
  },
  dividerText: {
    width: 50,
    textAlign: 'center',
    color: '#fff',
    fontStyle: 'italic',
  },
  dividerRight: {
    flex: 1,
    height: 1,
    backgroundColor: '#fff',
  },
  //  提示文字
  msg: {
    position: 'absolute',
    right: 5,
    top: 0,
    fontSize: 8,
    fontFamily: '幼圆',
    color: 'rgba(255,255,255,0.8)'
  },
  //  忘记密码
  forgetPassword: {
    width: 80,
    height: 40,
    lineHeight: 27,
    fontSize: 11,
  },
  //  模态框，忘记密码
  modalContainer: {
    position: 'relative',
  },
  modalHeader: {
    backgroundColor: MODAL_COLOR,
    height: 220,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeaderImg: {
    width: '60%',
    height: '60%',
  },
  modalHeaderIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 50,
    height: 40,
    paddingLeft: 12,
    paddingTop: 9,
  },
  modalBody: {
    height: HEIGHT-220,
    backgroundColor: '#eee',
  },
  modalForm: {
    backgroundColor: '#fff',
    width: '92%',
    height: HEIGHT-230,
    padding: 30,
    position: 'absolute',
    left: '4%',
    top: 190,
    borderRadius: 10,
    elevation: 20,
  },
  modalFormItem: {
    borderBottomWidth: 1,
    borderColor: '#eee',
    borderStyle: 'solid',
    height: CH,
    marginBottom: 10,
    position: 'relative',
  },
  modalFormBtn: {
    backgroundColor: MODAL_COLOR,
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: CH,
    marginTop: 128,
  },
  modalMsg: {
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: 8,
    color: MODAL_COLOR,
  },
  //  版权说明
  copyright: {
    position: 'absolute',
    bottom: 26,
    color: '#fff',
    fontSize: 8,
    display: 'flex',
    alignItems: 'center',
  },
});