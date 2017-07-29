import React,{ Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from './../plugin/ripple';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  ViewPagerAndroid,
  TouchableNativeFeedback,
  Animated,
  StyleSheet,
  Dimensions,
  AsyncStorage,
} from 'react-native';

//  自定义trim函数，把左右两边每个空格都去掉
window.trim = function (s) {
  return s.replace(/\s*/, '').split('').reverse().join('').replace(/\s*/, '').split('').reverse().join('');
};

const WIDTH = Dimensions.get('window').width,
      HEIGHT =  Dimensions.get('window').height;
const NAV_L = [10, WIDTH/3 + 10, WIDTH/3*2 + 10],
      SHORT_W = WIDTH/3*2 - 20,
      LONG_W = WIDTH - 20;
let lastIndex = 0;
const HOST_NAME = 'www.ningtaostudy.cn';

export default class MainComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      navW: new Animated.Value(WIDTH/3-20),
      navL: new Animated.Value(NAV_L[0]),
      activeStyle: [{color:'yellow'},{},{}],
      name: '',
      sex: '',
      ID: '',
      studentID: '',
      academy: '',
      location: '',
      moreInfo: '',
      username: '',
    };
  }

  timer = null;

  componentDidMount(){
    this.timer = setTimeout(() => {
      AsyncStorage.getItem('username', (err, res) => {
        this.setState({
          username: res,
        });
      });
    }, 1000);
  }

  componentWillUnmount(){
    clearTimeout(this.timer);
  }

  render(){
    return (
      <LinearGradient
        colors={ this.props.colors }
        start={{x: 0, y: 1}}
        end={{x:1, y: 0.5}}
        style={ css.container }>
        <View style={ css.nav }>
          <TouchableNativeFeedback onPress={ ()=> this.changePage(0) }><View style={ css.navItem }><Text style={[ css.navTxt, this.state.activeStyle[0] ]}>校园卡</Text></View></TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={ ()=> this.changePage(1) }><View style={ css.navItem }><Text style={[ css.navTxt, this.state.activeStyle[1] ]}>身份证</Text></View></TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={ ()=> this.changePage(2) }><View style={ css.navItem }><Text style={[ css.navTxt, this.state.activeStyle[2] ]}>其它</Text></View></TouchableNativeFeedback>
          <Animated.View style={[css.navBorder, {width:this.state.navW,left:this.state.navL} ]}/>
        </View>
        <ViewPagerAndroid
          ref='pager'
          keyboardDismissMode='on-drag'
          onPageSelected={ (e) => this.pageChange(e) }
          style={ css.pagerContainer }>

          {/*  校园卡  */}
          <View style={ css.cardContainer }>
            <View style={ css.cardMoreInput }>
              <Icon name='ios-pin-outline' size={18} color='#fff' style={{width:20}}/>
              <TextInput
                ref="location1"
                underlineColorAndroid='transparent'
                placeholder='你现在放在哪了...'
                placeholderTextColor='rgba(255,255,255,0.3)'
                onChangeText={(s)=> this.state.location = s}
                style={{flex:1,padding:0,color:'#fff',position:'relative',left:5,top:5}}
              />
            </View>
            <LinearGradient colors={['#fff',this.props.colors[1]]} start={{x:0,y:0}} end={{x:1,y:0}} style={{height:1}}/>
            <View style={ css.card }>
              <View style={ css.cardSHeader }>
                <Image source={ require('./../img/collage_logo_1.png') } resizeMode='contain' style={ css.collageLogo }/>
                <Image source={ require('./../img/img_logo.png') } resizeMode='contain' style={ css.imgLogo }/>
                <Text style={ css.headerTxt }>校园卡</Text>
              </View>
              <View style={ css.cardSBody }>
                <TouchableNativeFeedback>
                  <View style={ css.cardSPhoto }>
                    <Icon name='ios-analytics' size={15} color={this.props.colors[1]}/>
                    <Text style={{fontSize: 10,color: this.props.colors[1]}}>.....</Text>
                  </View>
                </TouchableNativeFeedback>
                <View style={ css.cardSInfo }>
                  <View style={ css.cardSRow }>
                    <Text style={{color:'#000',fontSize:12}}>姓名: </Text>
                    <View style={ css.cardSInput }>
                      <TextInput
                        ref="name1"
                        underlineColorAndroid='transparent'
                        selectionColor='#000'
                        placeholder='张三'
                        placeholderTextColor='#ddd'
                        returnKeyType='next'
                        onChangeText={(s)=> this.state.name = s}
                        style={{padding:0,color:'#000',fontSize:12}}/>
                    </View>
                  </View>
                  <View style={ css.cardSRow }>
                    <Text style={{color:'#000',fontSize:12}}>学号: </Text>
                    <View style={ css.cardSInput }>
                      <TextInput
                        ref="studentID"
                        underlineColorAndroid='transparent'
                        selectionColor='#000'
                        placeholder='2014000000'
                        placeholderTextColor='#ddd'
                        maxLength={10}
                        keyboardType='numeric'
                        returnKeyType='next'
                        onChangeText={(s)=> this.state.studentID = s}
                        style={{padding:0,color:'#000',fontSize:12}}/>
                    </View>
                  </View>
                  <View style={ css.cardSRow }>
                    <Text style={{color:'#000',fontSize:12}}>学院: </Text>
                    <View style={ css.cardSInput }>
                      <TextInput
                        ref="academy"
                        underlineColorAndroid='transparent'
                        selectionColor='#000'
                        placeholder='理学院'
                        placeholderTextColor='#ddd'
                        onChangeText={(s)=> this.state.academy = s}
                        style={{padding:0,color:'#000',fontSize:12}}/>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/*  身份证  */}
          <View style={ css.cardContainer }>
            <View style={ css.cardMoreInput }>
              <Icon name='ios-pin-outline' size={18} color='#fff' style={{width:20}}/>
              <TextInput
                ref="location2"
                underlineColorAndroid='transparent'
                placeholder='你现在放在哪了...'
                placeholderTextColor='rgba(255,255,255,0.3)'
                onChangeText={(s)=> this.state.location = s}
                style={{flex:1,padding:0,color:'#fff',position:'relative',left:5,top:5}}
              />
            </View>
            <LinearGradient colors={['#fff',this.props.colors[1]]} start={{x:0,y:0}} end={{x:1,y:0}} style={{height:1}}/>
            <View style={[ css.card,{padding: 20,paddingTop:20} ]}>
              <Image source={ require('./../img/身份证底纹.png') } resizeMode='contain' style={ css.cardIBg }/>
              <View style={ css.cardIBody }>
                <View style={ css.cardIInfo }>
                  <View style={ css.cardIRow }>
                    <Text style={ css.cardIMainTxt }>姓 名</Text>
                    <TextInput
                      ref="name2"
                      placeholderTextColor='#aaa'
                      placeholder='张三'
                      underlineColorAndroid='transparent'
                      onChangeText={(s)=> this.state.name = s}
                      style={{flex:1,padding:0,color:'#000',fontSize:12}}/>
                  </View>
                  <View style={ css.cardIRow }>
                    <Text style={ css.cardIMainTxt }>性 别</Text>
                    <TextInput
                      ref="sex2"
                      placeholderTextColor='#aaa'
                      placeholder='男'
                      underlineColorAndroid='transparent'
                      onChangeText={(s)=> this.state.sex = s}
                      maxLength={1}
                      style={{width: 35,padding:0,color:'#000',fontSize:12}}/>
                    <Text style={ css.cardIMainTxt }>民 族</Text>
                    <Text style={{color:'#000',fontSize:12}}>汉</Text>
                  </View>
                  <View style={ css.cardIRow }>
                    <Text style={ css.cardIMainTxt }>出 生</Text>
                    <Text style={{width:35,color:'#000',fontSize:12}}>1996</Text>
                    <Text style={ css.cardIMainTxt }>年</Text>
                    <Text style={{marginRight:5,color:'#000',fontSize:12}}>6</Text>
                    <Text style={ css.cardIMainTxt }>月</Text>
                    <Text style={{marginRight:5,color:'#000',fontSize:12}}>26</Text>
                    <Text style={ css.cardIMainTxt }>日</Text>
                  </View>
                  <View style={[css.cardIRow,{alignItems:'flex-start',marginTop:5}]}>
                    <Text style={ css.cardIMainTxt }>住 址</Text>
                    <Text style={{color:'#000',fontSize:12,flex:1}}>宇宙银河星系太阳星地球亚洲中国2014届</Text>
                  </View>
                </View>
                <TouchableNativeFeedback>
                  <LinearGradient colors={['transparent','#eee']} style={ css.cardIPhoto }>
                    <Icon name='ios-analytics' size={15} color={this.props.colors[1]}/>
                    <Text style={{fontSize: 10,color: this.props.colors[1]}}>.....</Text>
                  </LinearGradient>
                </TouchableNativeFeedback>
              </View>
              <View style={[css.cardIRow,{paddingTop: 15} ]}>
                <Text style={ css.cardIMainTxt }>公民身份号码</Text>
                <TextInput
                  ref="ID"
                  underlineColorAndroid='transparent'
                  maxLength={18}
                  keyboardType='numeric'
                  placeholderTextColor='#aaa'
                  placeholder='000000111111112222'
                  onChangeText={(s)=> this.state.ID = s}
                  style={{fontSize:12,color:'#000',padding:0,flex:1,marginLeft:10}}/>
              </View>
            </View>
          </View>

          {/*  其它  */}
          <View style={ css.cardContainer }>
            <View style={ css.cardMoreInput }>
              <Icon name='ios-pin-outline' size={18} color='#fff' style={{width:20}}/>
              <TextInput
                ref="location3"
                underlineColorAndroid='transparent'
                placeholder='你现在放在哪了...'
                placeholderTextColor='rgba(255,255,255,0.3)'
                onChangeText={(s)=> this.state.location = s}
                style={{flex:1,padding:0,color:'#fff',position:'relative',left:5,top:5}}
              />
            </View>
            <LinearGradient colors={['#fff',this.props.colors[1]]} start={{x:0,y:0}} end={{x:1,y:0}} style={{height:1}}/>
            <View style={[ css.otherRow,{marginTop: 30} ]}>
              <Icon name='ios-pricetag-outline' color='#fff' size={18} style={ css.otherIcon }/>
              <TextInput
                ref="name3"
                placeholder='姓甚名甚'
                placeholderTextColor='rgba(255,255,255,0.3)'
                underlineColorAndroid='transparent'
                returnKeyType='next'
                onChangeText={(s)=> this.state.name = s}
                style={ css.otherInput }
              />
            </View>
            <View style={ css.otherRow }>
              <Icon name='ios-pricetag-outline' color='#fff' size={18} style={ css.otherIcon }/>
              <TextInput
                ref="sex3"
                placeholder='或许是男？女？'
                placeholderTextColor='rgba(255,255,255,0.3)'
                underlineColorAndroid='transparent'
                returnKeyType='next'
                maxLength={1}
                onChangeText={(s)=> this.state.sex = s}
                style={ css.otherInput }
              />
            </View>
            <View style={ css.otherRow }>
              <Icon name='ios-pricetag-outline' color='#fff' size={18} style={[ css.otherIcon,{lineHeight: 15} ]}/>
              <TextInput
                ref="moreInfo"
                placeholder='你总得描述一下它的具体信息。'
                placeholderTextColor='rgba(255,255,255,0.3)'
                multiline={true}
                underlineColorAndroid='transparent'
                onChangeText={(s)=> this.state.moreInfo = s}
                style={[ css.otherInput,{height: 100,textAlignVertical:'top'} ]}
              />
            </View>
          </View>
        </ViewPagerAndroid>

        {/*  提交按钮  */}
        <View style={ css.submitBtn }>
          <Text style={{textAlign: 'left',flex:2}}>{this.state.msg}</Text>
          <TouchableNativeFeedback onPress={ () => this.add() }>
            <View style={{width: 70,height:40,alignItems:'center',justifyContent:'center'}}>
              <Text style={{color:'#fff'}}>提交</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </LinearGradient>
    );
  }

  //  页面切换成功后触发
  pageChange(e){
    //  清除其他页信息
    this.clear();

    //  切换动画
    let index = e.nativeEvent.position;
    if(lastIndex > index){
      //  左滑动
      Animated.sequence([
        Animated.parallel([
          Animated.timing(
            this.state.navL,
            { toValue: NAV_L[index] }
          ),
          Animated.timing(
            this.state.navW,
            { toValue: SHORT_W }
          )
        ]),
        Animated.timing(
          this.state.navW,
          { toValue: WIDTH/3-20 }
        )
      ]).start();
    } else {
      //  右滑动
      Animated.sequence([
        Animated.timing(
          this.state.navW,
          { toValue: SHORT_W }
        ),
        Animated.parallel([
          Animated.timing(
            this.state.navL,
            { toValue: NAV_L[index] }
          ),
          Animated.timing(
            this.state.navW,
            { toValue: WIDTH/3-20 }
          )
        ])
      ]).start();
    }
    // alert(index);
    this.state.activeStyle = [{},{},{}];
    this.state.activeStyle[index] = {color:'yellow'};
    this.setState({
      activeStyle: this.state.activeStyle
    });
    lastIndex = index;
  }

  //  手动点击切换页面
  changePage(index){
    // alert(index);
    this.refs.pager.setPage(index);
    let judge = lastIndex - index;
    // alert(judge);
    if(judge === -2){
      //  页面 0 ---> 2
      Animated.sequence([
        Animated.timing(
          this.state.navW,
          { toValue: LONG_W }
        ),
        Animated.parallel([
          Animated.timing(
            this.state.navL,
            { toValue: NAV_L[2] }
          ),
          Animated.timing(
            this.state.navW,
            { toValue: WIDTH/3-20 }
          )
        ])
      ]).start();
    } else if(judge === 2){
      //  页面 2 ---> 0
      Animated.sequence([
        Animated.parallel([
          Animated.timing(
            this.state.navL,
            { toValue: NAV_L[0] }
          ),
          Animated.timing(
            this.state.navW,
            { toValue: LONG_W }
          )
        ]),
        Animated.timing(
          this.state.navW,
          { toValue: WIDTH/3-20 }
        )
      ]).start();
    } else if(judge === -1){
      //  页面 index-1 ---> index
      Animated.sequence([
        Animated.timing(
          this.state.navW,
          { toValue: SHORT_W }
        ),
        Animated.parallel([
          Animated.timing(
            this.state.navL,
            { toValue: NAV_L[index] }
          ),
          Animated.timing(
            this.state.navW,
            { toValue: WIDTH/3-20 }
          )
        ])
      ]).start();
    } else if(judge === 1){
      //  页面 index+1 ---> index
      Animated.sequence([
        Animated.parallel([
          Animated.timing(
            this.state.navL,
            { toValue: NAV_L[index] }
          ),
          Animated.timing(
            this.state.navW,
            { toValue: SHORT_W }
          )
        ]),
        Animated.timing(
          this.state.navW,
          { toValue: WIDTH/3-20 }
        )
      ]).start();
    }
    this.state.activeStyle = [{},{},{}];
    this.state.activeStyle[index] = {color:'yellow'};
    this.setState({
      activeStyle: this.state.activeStyle
    });
    lastIndex = index;
  }

  //  提交
  add(){
    let body = new FormData();
    let name = trim(this.state.name),
        sex = trim(this.state.sex),
        ID = trim(this.state.ID),
        location = trim(this.state.location),
        studentID = trim(this.state.studentID),
        academy = trim(this.state.academy),
        moreInfo = trim(this.state.moreInfo);
    switch (lastIndex){
      case 0:
        //  第一页，校园卡
        if(name !== '' && studentID !== '' && academy !== '' && location !== ''){
          body.append('type', 'studentCard');
          break;
        } else {
          this.setState({
            msg: '上面的信息一个都不能少！',
          });
          return false;
        }
      case 1:
        //  第二页，身份证
        if(name !== '' && ID !== '' && sex !== '' && location !== ''){
          body.append('type', 'IDCard');
          break;
        } else {
          this.setState({
            msg: '上面的信息一个都不能少！',
          });
          return false;
        }
      case 2:
        //  第三页，其它丢失物品
        if(location !== '' && moreInfo !== ''){
          body.append('type', 'other');
          break;
        } else {
          this.setState({
            msg: '请告诉更多信息，地址！！',
          });
          return false;
        }
      default:
        alert(lastIndex);
        break;
    }
    body.append('name', name);
    body.append('sex', sex);
    body.append('location', location);
    body.append('ID', ID);
    body.append('studentID', studentID);
    body.append('academy', academy);
    body.append('moreInfo', moreInfo);
    body.append('username', this.state.username);
    let url = `http://${HOST_NAME}/appClassWork/add.php`,
        headers = {
          'Accept': 'application/text',
          'Content-Type': 'multipart/form-data',
        },
        method = 'post';
    fetch(url, {
      method: method,
      headers: headers,
      body: body
    })
    .then((s)=> s.text())
    .then((res)=> {
      // alert(res);
      this.clear();
    })
    .catch((err)=> {
      alert(err);
    });
  }

  //  清空
  clear(){
    this.setState({
      name: '',
      sex: '',
      ID: '',
      studentID: '',
      type: '',
      academy: '',
      location: '',
      moreInfo: '',
      msg: '',
    });
    this.refs.location1.clear();
    this.refs.location2.clear();
    this.refs.location3.clear();
    this.refs.name1.clear();
    this.refs.name2.clear();
    this.refs.name3.clear();
    this.refs.academy.clear();
    this.refs.studentID.clear();
    this.refs.sex2.clear();
    this.refs.sex3.clear();
    this.refs.ID.clear();
    this.refs.moreInfo.clear();
  }
}

const css = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    position: 'relative',
  },
  nav: {
    width: WIDTH,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    paddingTop: 10,
  },
  navBorder: {
    position: 'absolute',
    left: 10,
    bottom: 0,
    width: WIDTH/3-20,
    height: 1,
    backgroundColor: '#ff0',
    borderRadius: 1,
  },
  navItem: {
    flex: 1,
    marginHorizontal: 10,
    height: 40,
  },
  navTxt: {
    textAlign: 'center',
    color: '#fff',
    lineHeight: 30,
  },
  pagerContainer: {
    width: WIDTH,
    height: HEIGHT-150,
  },
  cardContainer: {
    padding: 20,
    position: 'relative',
  },
  card: {
    backgroundColor: '#fff',
    width: WIDTH-40,
    height: (WIDTH-40)/8*5,
    borderRadius: 8,
    marginTop: 30,
    paddingTop: 10,
    elevation: 10,
  },
  cardSHeader: {
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  },
  collageLogo: {
    height: 30,
    flex: 3,
    direction: 'ltr',
  },
  imgLogo: {
    flex: 2,
    height: 30,
    opacity: 0.5,
  },
  headerTxt: {
    color: '#039',
    position: 'absolute',
    left: '58%',
    top: 7,
    fontWeight: '500',
    fontSize: 12,
  },
  cardSBody: {
    height: (WIDTH-40)/8*5-40,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cardSPhoto: {
    height: (WIDTH-40)/16*6,
    width: (WIDTH-40)/64*18,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardSInfo: {
    display: 'flex',
    width: 150,
    paddingTop: 25,
  },
  cardSRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  cardSInput: {
    width: 120,
  },
  cardMoreInput: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  cardIBg: {
    width: WIDTH-40,
    height: (WIDTH-40)/8*5,
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 8,
  },
  cardIBody: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardIPhoto: {
    width: (WIDTH-40)*25/85,
    height: (WIDTH-40)/8*3+10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  cardIInfo: {
    flex: 1,
  },
  cardIRow: {
    display: 'flex',
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
  },
  cardIMainTxt: {
    color: '#09c',
    paddingRight: 10,
    fontSize: 12,
  },
  otherRow: {
    borderBottomWidth: 1,
    borderColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },
  otherIcon: {
    width: 25,
    lineHeight: 20,
  },
  otherInput: {
    color: '#fff',
    padding: 0,
    flex: 1,
  },
  submitBtn: {
    position: 'absolute',
    left: 20,
    bottom: 100,
    width: WIDTH-40,
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});