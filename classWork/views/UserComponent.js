import React,{ Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from './../plugin/ripple';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableNativeFeedback,
  Switch,
  StyleSheet,
  Dimensions,
  RefreshControl,
  AsyncStorage,
  PixelRatio,
  LayoutAnimation,
  NativeModules,
} from 'react-native';

const {UIManager} = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const WIDTH = Dimensions.get('window').width,
      HEIGHT =  Dimensions.get('window').height,
      ML = 1 / PixelRatio.get(),
      CH = 38,
      TH_6 = ['#667AA6', '#7CCFFA'];


export default class MainComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      refreshing: true,
      username: '',
      founds: 0,
      losts: 0,
      showEdit: false,
      l_edit: 20+(WIDTH-80)/4,
      t_edit: 60+(HEIGHT-160)/2,
      w_edit: 0,
      h_edit: 0,
      v_edit: 0,
      editMore: false,
      showBug: false,
    };
  }

  componentDidMount(){
    //  等切换动画执行完后再执行
    setTimeout(() => this.getUserInfo(), 500);
  }

  render(){
    return (
      <LinearGradient colors={ TH_6 } start={{x: 0, y: 1}} end={{x:1, y: 0.5}} style={{height: HEIGHT}}>
        <View style={{height: HEIGHT-80}}>
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
              <Ripple onPress={ ()=> this.showEdit() } rippleColor='#fff' rippleOpacity={0.1} rippleDuration={2000} style={ css.item }>
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
                <Text style={{color: '#fff'}}>bug的出现</Text>
              </Ripple>
              <Ripple rippleColor='#fff' rippleOpacity={0.1} rippleDuration={2000} style={ css.item }>
                <Icon name='ios-information-circle-outline' size={30} style={ css.icon }/>
                <Text style={{color: '#fff'}}>关于这个</Text>
              </Ripple>
            </View>
          </ScrollView>
        </View>

        <View style={[ edit.container,{left:this.state.l_edit,top:this.state.t_edit,width:this.state.w_edit,height:this.state.h_edit,elevation:this.state.v_edit} ]}>
          <View style={ edit.profile }>
            <View style={ edit.imgContainer }><Text>1</Text></View>
            <View style={ edit.inputsContainer }>
              <View style={ edit.inputContainer }>
                <Icon name='ios-at-outline' size={15} color={TH_6[0]} style={ edit.icon }/>
                <TextInput underlineColorAndroid='transparent' style={ edit.input }/>
              </View>
              <View style={ edit.inputContainer }>
                <Icon name='ios-lock-outline' size={15} color={TH_6[0]} style={ edit.icon }/>
                <TextInput underlineColorAndroid='transparent' style={ edit.input }/>
              </View>
              <View style={ edit.moreChoice }>
                <Text style={{color: TH_6[0]}}>Edit more</Text>
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
              <Text style={{color:TH_6[0]}}>Write down your favourite signature!</Text>
            </View>
            : null
          }
          { this.state.editMore ?
            <View style={ edit.moreInputContainer }>
              <TextInput
                underlineColorAndroid='transparent'
                multiline={true}
                placeholder='Input here'
                placeholderTextColor={TH_6[0]}
                selectionColor={TH_6[0]}
                style={ edit.moreInput }/>
            </View>
            : null
          }
          <View style={ edit.btnContainer }>
            <TouchableNativeFeedback onPress={()=> this.hiddenEdit()}>
              <View style={ edit.btn }><Text style={{color: TH_6[0]}}>取消</Text></View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <View style={[ edit.btn, {backgroundColor: TH_6[0], marginLeft: 20} ]}><Text style={{color: '#fff'}}>修改</Text></View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </LinearGradient>
    );
  }

  getUserInfo(){
    AsyncStorage.getItem('username', (err, res) => {
      if(err){
        alert('存储系统出错，请退出重试');
      } else {
        let url = `http://192.168.137.1/appClassWork/info.php?username=${res}`;
        fetch(url)
        .then((s)=>s.json())
        .then((respond) => {
          this.setState({
            username: res,
          });
          //  最后一个更新完的隐藏刷新条
          let last = respond.losts > respond.founds;
          this.numberAnimation('losts', parseInt(respond.losts), !last);
          this.numberAnimation('founds', parseInt(respond.founds), last);
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
      l_edit: 20,
      t_edit: 60,
      w_edit: WIDTH-40,
      h_edit: HEIGHT-160,
      v_edit: 20,
    });
  }

  hiddenEdit(){
    LayoutAnimation.easeInEaseOut();
    this.setState({
      l_edit: 20+(WIDTH-80)/4,
      t_edit: 60+(HEIGHT-160)/2,
      w_edit: 0,
      h_edit: 0,
      v_edit: 0,
    });
  }

  editMore(val){
    this.setState({
      editMore: !this.state.editMore,
    });
  }
}

const css = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT-120,
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
    height: (HEIGHT-160)/3,
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

const edit = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 5,
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
    backgroundColor: 'yellow',
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