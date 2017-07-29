import React,{ Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from './../plugin/ripple';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Dimensions,
  RefreshControl,
  AsyncStorage,
  PixelRatio,
  LayoutAnimation,
  NativeModules,
  CameraRoll,
  BackHandler,
} from 'react-native';

const {UIManager} = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const WIDTH = Dimensions.get('window').width,
      HEIGHT =  Dimensions.get('window').height,
      ML = 1 / PixelRatio.get(),
      TH_6 = ['#667AA6', '#7CCFFA'],
      HOST_NAME = 'www.ningtaostudy.cn';


export default class MainComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      refreshing: true,
      username: '',
      founds: 0,
      losts: 0,
      showEdit: false,
      l_edit: 20+(WIDTH-20)/6,
      t_edit: 220,
      w_edit: 0,
      h_edit: 0,
      v_edit: 0,
      editMore: false,
      picking: false,
      editMsg: '',
      email: '',
      password: '',
      photo: '',
      signature: '',
      pickedUri: '',
      showBug: false,
    };
  }

  componentDidMount(){
    //  等切换动画执行完后再执行
    setTimeout(() => this.getUserInfo(), 500);
  }

  render(){
    BackHandler.addEventListener('hardwareBackPress', () => {
      if(this.state.showEdit){
        this.hiddenEdit();
      }
      if(this.state.showBug){
        if(this.state.PickPhotoComponent) {
          this.setState({
            PickPhotoComponent: null,
          });
        } else {
          this.setState({
            showBug: false,
          });
        }
      }
      return true;
    });

    return (
      <LinearGradient colors={ TH_6 } start={{x: 0, y: 1}} end={{x:1, y: 0.5}} style={{height: HEIGHT}}>
        <View style={{height: HEIGHT-100}}>
          <ScrollView
            style={ css.container }
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.refreshUserInfo()}
                colors={TH_6}/>
            }
          >
            <View style={ css.header }>
              <Image source={{uri: this.state.pickedUri}} style={ css.headerPhoto }/>
              <Text style={{color: '#fff',flex:1,paddingLeft:10}}>{ this.state.username }</Text>
              <TouchableOpacity
                activeOpacity={0.3}
                style={ css.logout }
                onPress={ () => this.props.logout() }
              >
                <Text style={{color: '#fff'}}>注销</Text>
                <Icon name='ios-power' size={16} style={{color:'#fff',position:'relative',top:1}}/>
              </TouchableOpacity>
            </View>
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
              <Ripple onPress={ ()=> this.showEdit() } rippleColor='#fff' rippleOpacity={0.1} rippleDuration={2000} style={ css.item }>
                <Icon name='ios-color-palette-outline' size={30} style={ css.icon }/>
                <Text style={{color: '#fff'}}>修改资料</Text>
              </Ripple>
              <Ripple onPress={()=> this.setState({showBug: true})} rippleColor='#fff' rippleOpacity={0.1} rippleDuration={2000} style={ css.item }>
                <Icon name='ios-bug-outline' size={30} style={ css.icon }/>
                <Text style={{color: '#fff'}}>bug的出现</Text>
              </Ripple>
              <Ripple rippleColor='#fff' rippleOpacity={0.1} rippleDuration={2000} style={ css.item }>
                <Icon name='ios-information-circle-outline' size={30} style={ css.icon }/>
                <Text style={{color: '#fff'}}>关于这个</Text>
              </Ripple>
            </View>
          </ScrollView>
        </View>

        {/*  修改资料界面  */}
        <View style={[ edit.container,{left:this.state.l_edit,top:this.state.t_edit,width:this.state.w_edit,height:this.state.h_edit,elevation:this.state.v_edit} ]}>
          { this.state.PickPhotoComponent }

          <View style={ edit.profile }>
            <LinearGradient colors={TH_6} style={{position: 'relative'}}>
              <TouchableNativeFeedback onPress={()=> this.pickPhoto()}>
                { this.state.pickedUri ?
                  <Image source={{uri:this.state.pickedUri}} style={ edit.imgContainer }/>
                  :
                  <View style={ edit.imgContainer }>
                    <Icon name='ios-add-circle-outline' size={20} color='#fff'/>
                    <Text style={{color: '#fff',fontSize:10}}>添加图片</Text>
                  </View>
                }
              </TouchableNativeFeedback>
            </LinearGradient>
            <View style={ edit.inputsContainer }>
              <View style={ edit.inputContainer }>
                <Icon name='ios-at-outline' size={15} color={TH_6[0]} style={ edit.icon }/>
                <TextInput
                  underlineColorAndroid='transparent'
                  selectionColor='#fff'
                  returnKeyType='next'
                  keyboardType='email-address'
                  placeholder={this.state.email}
                  placeholderTextColor='#ddd'
                  onChangeText={this.validateEmail.bind(this)}
                  onFocus={() => this.setState({editMsg: ''})}
                  style={ edit.input }/>
              </View>
              <View style={ edit.inputContainer }>
                <Icon name='ios-lock-outline' size={15} color={TH_6[0]} style={ edit.icon }/>
                <TextInput
                  underlineColorAndroid='transparent'
                  selectionColor='#fff'
                  onChangeText={(s)=> this.state.password = s}
                  placeholder={this.state.password}
                  placeholderTextColor='#ddd'
                  style={ edit.input }/>
              </View>
              <View style={ edit.moreChoice }>
                <Text style={{color: TH_6[0]}}>修改更多</Text>
                <Switch
                  thumbTintColor={TH_6[1]}
                  tintColor='#eee'
                  onTintColor={TH_6[0]}
                  value={this.state.editMore}
                  onValueChange={() => this.editMore()}/>
              </View>
            </View>
          </View>
          { this.state.editMore ?
            <View style={ edit.moreTitle }>
              <Icon name='ios-flame-outline' size={20} color={TH_6[0]} style={{marginRight:5}}/>
              <Text style={{color:TH_6[0]}}>编辑你的个性签名</Text>
            </View>
            : null
          }
          { this.state.editMore ?
            <View style={ edit.moreInputContainer }>
              <TextInput
                underlineColorAndroid='transparent'
                multiline={true}
                placeholder={this.state.signature?this.state.signature:'输入...'}
                placeholderTextColor='#ddd'
                selectionColor={TH_6[0]}
                style={ edit.moreInput }
                onChangeText={(s)=> this.state.signature = s}
              />
            </View>
            : null
          }
          <Text style={ edit.msg }>{this.state.editMsg}</Text>
          <View style={ edit.btnContainer }>
            <TouchableNativeFeedback onPress={()=> this.hiddenEdit()}>
              <View style={ edit.btn }><Text style={{color: TH_6[0]}}>取消</Text></View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={()=> this.edit()}>
              <View style={[ edit.btn, {backgroundColor: TH_6[0], marginLeft: 20} ]}><Text style={{color: '#fff'}}>修改</Text></View>
            </TouchableNativeFeedback>
          </View>
        </View>

        {/*  提交bug界面  */}
        { this.state.showBug ? <BugComponent hidden={()=> this.setState({showBug: false})}/> : null }
      </LinearGradient>
    );
  }

  getUserInfo(){
    this.setState({
      editMsg: ''
    });
    AsyncStorage.getItem('username', (err, res) => {
      if(err){
        alert('存储系统出错，请退出重试');
      } else {
        let url = `http://${HOST_NAME}/appClassWork/info.php?username=${res}`;
        fetch(url)
        .then((s)=>s.text())
        .then((respond) => {
          respond = JSON.parse(respond);
          this.setState({
            username: res,
            email: respond.email,
            pickedUri: respond.photo ? `http://${HOST_NAME}/appClassWork/img/${respond.photo}?s=${Math.random()}` : false,
            password: respond.password,
            signature: respond.signature === 'null' ? '' : respond.signature,
            editMore: !!(this.state.signature),
          });
          //  最后一个更新完的隐藏刷新条
          let losts = parseInt(respond.losts),
              founds = parseInt(respond.founds),
              last = losts > founds;
          this.numberAnimation('losts', losts, !last);
          this.numberAnimation('founds', founds, last);
        })
        .catch((err) => {
          alert(err);
        });
      }
    });
  }

  refreshUserInfo(){
    this.setState({
      refreshing: true,
    });
    this.getUserInfo();
  }

  //  @param 需要变化的属性、变化到那个数字，最后完成的隐藏刷新条
  numberAnimation(property, toValue, hidden){
    let startValue = 0,
        a = 1;
    // while(startValue < toValue){
    //   this.setState({
    //     [property]: startValue
    //   });
    //   startValue += a;
    //   a ++;
    // }
    // this.setState({
    //   [property]: toValue,
    // });
    let doAnimation = () => {
      startValue += a;
      if(startValue < toValue){
        this.setState({
          [property]: startValue,
        });
        requestAnimationFrame(doAnimation);
      } else {
        this.setState({
          [property]: toValue,
          refreshing: hidden

        });
      }
      a += 5;
    };
    doAnimation();
  }

  showEdit(){
    LayoutAnimation.easeInEaseOut();
    this.setState({
      showEdit: true,
      l_edit: 20,
      t_edit: 60,
      w_edit: WIDTH-40,
      h_edit: HEIGHT-160,
      v_edit: 20,
      editMore: false,
      editMsg: '',
    });
  }

  hiddenEdit(){
    LayoutAnimation.easeInEaseOut();
    this.setState({
      showEdit: false,
      l_edit: 20+(WIDTH-20)/6,
      t_edit: 220,
      w_edit: 0,
      h_edit: 0,
      v_edit: 0,
    });
  }

  editMore(val){
    LayoutAnimation.spring();
    this.setState({
      editMore: !this.state.editMore,
    });
  }

  pickPhoto(){
    if(this.state.PickPhotoComponent){
      this.setState({
        PickPhotoComponent: null,
      });
    } else {
      CameraRoll.getPhotos({
        first: 9,
        assetType: 'Photos',
      })
      .then((data) => {
        let imgs = [];
        for (let i=0;i<9;i++){
          imgs.push(
            <TouchableNativeFeedback key={i} onPress={() => this.setState({pickedUri: data.edges[i].node.image.uri, PickPhotoComponent: null})}>
              <View><Image style={ edit.imgs } source={{uri:  data.edges[i].node.image.uri}}/></View>
            </TouchableNativeFeedback>
          );
        }
        this.setState({
          PickPhotoComponent: <View style={ edit.imgsContainer }><Text style={ edit.imgsTitle }>最近的9张图</Text>{imgs}</View>,
        });
      })
      .catch((err) => alert(err));
    }
  }

  validateEmail(s){
    let isNice = /[a-zA-Z\d_]+@[a-zA-Z\d]{2,6}\.[a-zA-Z]{1,5}/.test(s);
    if(isNice){
      this.state.email = s;
    }
    this.setState({
      editMsg: isNice ? '' : '邮箱格式错误',
    });
  }

  edit(){
    if(!this.state.email && !this.state.email){
      this.setState({
        editMsg: 'email and password ?'
      });
    } else{
      let url = `http://${HOST_NAME}/appClassWork/edit.php`,
          method = 'post',
          headers = {
            'Accept': 'application/text',
            'Content-Type': 'multipart/form-data',
          },
          body = new FormData();
      body.append('username', this.state.username);
      body.append('email', this.state.email);
      body.append('password', this.state.password);
      body.append('signature', this.state.signature);
      body.append('photo', { uri: this.state.pickedUri, type: 'application/octet-stream', name: 'photo' });
      fetch(url, {
        method: method,
        headers: headers,
        body: body,
      })
      .then((s)=>s.text())
      .then((res)=>{
        this.setState({
          editMsg: 'Modify success',
        });
      })
      .catch((err)=>{
        alert(err);
      });
    }
  }
}

class BugComponent extends Component{
  constructor(){
    super();
    this.state = {
      content: '',
      showSuccess: false,
    };
  }
  render(){
    return (
      <View style={ bug.container }>
        <Text style={ bug.title }>发现bug了 </Text>
        <Ripple style={ [bug.closeBtn, {left: 0}] }>
          <Icon name='ios-menu-outline' size={30} color={TH_6[0]}/>
        </Ripple>
        <Ripple style={ bug.closeBtn } onPress={ ()=> this.props.hidden() }>
          <Icon name='ios-close' size={30} color={TH_6[0]} />
        </Ripple>
        <View style={ bug.inputContainer }>
          <TextInput
            multiline={true}
            underlineColorAndroid='transparent'
            selectionColor={TH_6[0]}
            placeholder='有什么bug...'
            placeholderTextColor='#ddd'
            style={ bug.input }
            ref='input'
            onChangeText={(s)=>this.state.content = s}
            onFocus={()=>this.setState({showSuccess: false})}
          />
        </View>
        { this.state.showSuccess ? <Text style={{textAlign: 'right', color: TH_6[0]}}>非常感谢你的反馈！</Text> : null }
        <TouchableNativeFeedback onPress={ ()=> this.submitBug() }>
          <View style={ bug.submitBtn }>
            <Text style={{color:'#fff',marginRight: 5 }}>提交</Text>
            <Icon name='ios-finger-print' size={20} color="#fff"/>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }

  submitBug(){
    if(/^\s*$/.test(this.state.content)){
      this.refs.input.focus();
    } else {
      let url = `http://${HOST_NAME}/appClassWork/bug.php`,
          method = 'post',
          headers = {
            'Content-Type': 'multipart/form-data',
          },
          body = new FormData();
      body.append('content', this.state.content);
      fetch(url, {
        method: method,
        headers: headers,
        body: body,
      })
      .then((s)=>s.text())
      .then((res)=>{
        this.refs.input.clear();
        this.setState({
          showSuccess: true,
          content: '',
        })
      })
      .catch((err)=>{
        alert(err);
      });
    }
  }
}

const css = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT-120,
  },
  header: {
    height: 60,
    paddingHorizontal: 20,
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  headerPhoto: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  logout: {
    width: 50,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 80,
    paddingHorizontal: 20,
  },
  item: {
    flex: 1,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: 20,
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

const edit = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  imgsContainer: {
    width: WIDTH-80,
    height: HEIGHT-200,
    position: 'absolute',
    left: 20,
    top: 20,
    zIndex: 9999,
    backgroundColor: '#fff',
    elevation: 20,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imgsTitle: {
    color: '#fff',
    width: '100%',
    height: (HEIGHT-200)-(WIDTH+10),
    lineHeight: 20,
    paddingTop: ((HEIGHT-200)-(WIDTH+10)-20)/2,
    textAlign: 'center',
    backgroundColor: TH_6[0],
  },
  imgs: {
    width: 90,
    height: 120,
    marginTop: (WIDTH-350)/4,
    marginLeft: (WIDTH-350)/4,
  },
  msg: {
    padding: 20,
    paddingTop: 60,
    color: TH_6[1],
    fontSize: 12,
    textAlign: 'center',
  },

  btnContainer: {
    display: 'flex',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
    padding: 10,
    borderRadius: 2,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  profile: {
    display: 'flex',
    padding: 20,
    flexDirection: 'row',
  },
  imgContainer: {
    width: 90,
    height: 120,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },
  inputsContainer: {
    flex: 1,
    marginLeft: 20,
  },
  inputContainer: {
    height: 35,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: ML,
    borderStyle: 'solid',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    bottom: 3,
    fontSize: 20,
    width: 20,
    textAlign: 'center',
    color: TH_6[0],
  },
  input: {
    flex: 1,
    marginLeft: 20,
    padding: 0,
    paddingLeft: 3,
    fontSize: 15,
    color: TH_6[0],
  },
  moreChoice: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    top: 5,
    marginRight: -5,
  },
  moreTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderColor: TH_6[1],
  },
  moreInputContainer: {
    width: WIDTH-80,
    height: 100,
    marginLeft: 20,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  moreInput: {
    paddingVertical: 5,
    color: TH_6[0],
    height: '100%',
    textAlignVertical: 'top',
  },
});

const bug = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT-100,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0.
  },
  closeBtn: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 0,
    top: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg: {
    position: 'absolute',
    top: 50,
    left: 0,
    margin: 20,
    width: WIDTH-40,
    height: WIDTH/360*425,
  },
  title: {
    height: 50,
    textAlign: 'center',
    color: TH_6[0],
    lineHeight: 35,
  },
  inputContainer: {
    borderTopWidth: 1,
    borderColor: TH_6[0],
    borderStyle: 'solid',
    width: WIDTH,
    height: 200,
    padding: 20,
    position: 'relative',
  },
  input: {
    color: TH_6[0],
    padding: 0,
    height: 120,
    textAlignVertical: 'top',
  },
  submitBtn: {
    width: WIDTH-20,
    margin: 10,
    height: 40,
    borderRadius: 2,
    backgroundColor: TH_6[0],
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    elevation: 10,
  },
});