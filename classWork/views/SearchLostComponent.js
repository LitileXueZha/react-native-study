import React,{ Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from './../plugin/ripple';
import {
  Image,
  View,
  Text,
  TextInput,
  RefreshControl,
  FlatList,
  ScrollView,
  TouchableNativeFeedback,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet,
  Dimensions,
  PixelRatio,
  ToastAndroid,
} from 'react-native';

//  自定义trim函数，把每个空格都去掉
window.trim = function (s) {
  return s.replace(/\s*/, '').split('').reverse().join('').replace(/\s*/, '').split('').reverse().join('');
};

const WIDTH = Dimensions.get('window').width,
      HEIGHT =  Dimensions.get('window').height;
const TH_8 = ['#197654', '#43C6AC'];
const HOST_NAME = 'www.ningtaostudy.cn';
let INFO = [];

export default class MainComponent extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
      refreshing: true,
      isStudentID: false,
      isID: false,
      isOther: false,
      searchText: '',
      username: '',
    };
    AsyncStorage.getItem('username', (err, res) => {
      this.setState({
        username: res,
      });
    });
  }

  timer = null;
  componentWillMount(){
    this.timer = setTimeout(() => {
      this.getLosts();
    }, 700);
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
        {/*<ScrollView showsVerticalScrollIndicator={false}/>*/}
        <View style={ css.inputContainer }>
          <TextInput
            underlineColorAndroid='transparent'
            selectionColor='#fff'
            onChangeText={(s)=> this.state.searchText = s}
            onSubmitEditing={ () => this.search() }
            ref="input"
            style={ css.input }
          />
          <Ripple
            onPress={ () => this.search() }
            style={ css.searchIconContainer }
            rippleColor='#fff'
            rippleOpacity={0.1}>
            <Icon name='ios-search-outline' size={20} color='#fff'/>
          </Ripple>
        </View>
        <View style={ css.tagContainer }>
          <Ripple style={ css.tagItem } onPress={ () => this.orderStudentID() }>
            <Text style={{color: this.state.isStudentID?'#ff0':'#fff'}}>校园卡</Text>
          </Ripple>
          <Ripple style={ css.tagItem } onPress={ () => this.orderID() }>
            <Text style={{color: this.state.isID?'#ff0':'#fff'}}>身份证</Text>
          </Ripple>
          <Ripple style={ css.tagItem } onPress={ () => this.orderOther() }>
            <Text style={{color: this.state.isOther?'#ff0':'#fff'}}>其它</Text>
          </Ripple>
        </View>
        <View style={{width: WIDTH,height: HEIGHT-220,marginLeft: -20,}}>
          <FlatList
            data={ this.state.data }
            keyExtractor={ (item, index) => index }
            refreshing={this.state.refreshing}
            onRefresh={ () => this.getLosts() }
            showsVerticalScrollIndicator={false}
            renderItem={ ({item}) => <ItemComponent item={item} username={this.state.username}/> }
            itemSeparatorComponent={ () => <DividerComponent/> }
          />
        </View>
      </LinearGradient>
    );
  }

  //  获取数据
  getLosts(s = '', isBtn){
    this.setState({
      data: [],
      refreshing: true,
    });

    s = trim(this.state.searchText);

    //  下拉刷新会清除输入信息，而搜索按钮会清除
    // if(!isBtn){
    //   this.state.searchText = '';
    //   this.refs.input.clear();
    // }
    let limit = 100,
        offset = 0;
    let url = `http://${HOST_NAME}/appClassWork/search.php?limit=${limit}&offset=${offset}&searchText=${s}`;
    fetch(url)
    .then((s)=>s.text())
    .then((res) => {
      let data = JSON.parse(res);
      INFO = res;
      this.setState({
        data: data.losts,
        refreshing: false,
        isStudentID: false,
        isID: false,
        isOther: false,
      });
    })
    .catch((err) => {
      alert(err);
    });
  }

  //  搜索
  search(){
    let txt = trim(this.state.searchText);
    if(txt){
      this.getLosts(txt);
    } else {
      this.refs.input.focus();
    }
  }

  //  显示校园卡数据
  orderStudentID(){
    if(!this.state.isStudentID){
      let data = JSON.parse(INFO);
      data = data.losts.filter((val) => {
        return val.type === 'studentCard';
      });
      this.setState({
        data: data,
        isStudentID: true,
        isID: false,
        isOther: false,
      });
    }
  }

  //  显示身份证数据
  orderID(){
    if(!this.state.isID){
      let data = JSON.parse(INFO);
      data = data.losts.filter((val) => {
        return val.type === 'IDCard';
      });
      this.setState({
        data: data,
        isStudentID: false,
        isID: true,
        isOther: false,
      });
    }
  }

  //  显示其它数据
  orderOther(){
    if(!this.state.isOther){
      let data = JSON.parse(INFO);
      data = data.losts.filter((val) => {
        return val.type === 'other';
      });
      this.setState({
        data: data,
        isStudentID: false,
        isID: false,
        isOther: true,
      });
    }
  }

  //  点击详细信息
  // showDetail(type){
  //   if(type === 'studentID'){
  //
  //   }
  // }
}

//  分割线组件
class DividerComponent extends Component{
  render(){
    // return <LinearGradient
    //   colors={['transparent', '#fff', 'transparent']}
    //   start={{x:0,y:0}}
    //   end={{x:1,y:0}}
    //   style={{width: '100%', height: 10,padding: 7}}
    // />;
    return <View style={{width:'100%',height:20,}}/>;
  }
}

//  渲染的每一个列表组件
class ItemComponent extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
      hasFound: false,
      createAt: '',
      username: props.username,
    };
  }

  render(){
    let data = this.props.item;
    // 存储时间戳，用来删除记录
    this.state.createAt = data.createAt;
    let d = new Date(parseInt(data.createAt)),
      y = d.getFullYear(),
      m = d.getMonth() + 1,
      date = d.getDate(),
      h = d.getHours(),
      min = d.getMinutes();
    data.createAt = `${y}.${m}.${date}  ${h}:${min}`;

    if(data.type === 'studentCard'){
      return (
        <TouchableNativeFeedback>
          <View style={ css.itemContainer }>
            <View style={ css.itemBody }>
              <TouchableOpacity onPress={ () => this.toggle() } activeOpacity={0.1} style={ css.removeTag }><Icon name={this.state.hasFound?'ios-mail-open':'ios-mail-outline'} size={20}/></TouchableOpacity>
              <View style={ css.itemLeftImg }>
                <Image source={ require('./../img/aust.png') } style={ css.itemImg }/>
                <Icon name='ios-keypad-outline' style={ css.itemIconFirst }/>
                <Icon name='ios-pin-outline' style={ css.itemIcon }/>
              </View>
              <View style={ css.itemRightTxt }>
                <Text style={ css.txtName }>{ data.name }</Text>
                <Text style={ css.txtSecond }>{ data.academy }</Text>
                <Text style={ css.txt }>{ data.studentID }</Text>
                <Text style={ css.txt }>{ data.location }</Text>
              </View>
            </View>
            <View style={ css.itemFooter }>
              <Text style={ css.itemTime }>{ data.createAt }</Text>
              <View style={ css.itemBy }>
                <Icon name='ios-eye-outline' size={20} color={TH_8[1]}/>
                <Text style={{marginLeft: 5,color:TH_8[1]}}>{ data.findBy }</Text>
              </View>
            </View>
          </View>
        </TouchableNativeFeedback>
      );
    } else if(data.type === 'IDCard'){
      return (
        <TouchableNativeFeedback>
          <View style={ css.itemContainer }>
            <View style={ css.itemBody }>
              <TouchableOpacity onPress={ () => this.toggle() } activeOpacity={0.1} style={ css.removeTag }><Icon name={this.state.hasFound?'ios-mail-open':'ios-mail-outline'} size={20}/></TouchableOpacity>
              <View style={ css.itemLeftImg }>
                <Image source={ require('./../img/china.png') } style={ css.itemImg }/>
                <Icon name='ios-keypad-outline' style={ css.itemIconFirst }/>
                <Icon name='ios-pin-outline' style={ css.itemIcon }/>
              </View>
              <View style={ css.itemRightTxt }>
                <Text style={ css.txtName }>{ data.name }</Text>
                <Text style={ css.txtSecond }>{ data.sex }</Text>
                <Text style={ css.txt }>{ data.ID }</Text>
                <Text style={ css.txt }>{ data.location }</Text>
              </View>
            </View>
            <View style={ css.itemFooter }>
              <Text style={ css.itemTime }>{ data.createAt }</Text>
              <View style={ css.itemBy }>
                <Icon name='ios-eye-outline' size={20} color={TH_8[1]}/>
                <Text style={{marginLeft: 5,color:TH_8[1]}}>{ data.findBy }</Text>
              </View>
            </View>
          </View>
        </TouchableNativeFeedback>
      );
    } else {
      return (
        <TouchableNativeFeedback>
          <View style={ css.itemContainer }>
            <View style={ css.itemBody }>
              <TouchableOpacity onPress={ () => this.toggle() } activeOpacity={0.1} style={ css.removeTag }><Icon name={this.state.hasFound?'ios-mail-open':'ios-mail-outline'} size={20}/></TouchableOpacity>
              <View style={ css.itemLeftImg }>
                <Image source={ require('./../img/other.png') } style={ css.itemImg }/>
                <Icon name='ios-paper-outline' style={ css.itemIconFirst }/>
                <Icon name='ios-pin-outline' style={ css.itemIcon }/>
              </View>
              <View style={ css.itemRightTxt }>
                <Text style={ css.txtName }>{ data.name }</Text>
                <Text style={ css.txtSecond }>{ data.sex }</Text>
                <Text style={ css.txt }>{ data.moreInfo }</Text>
                <Text style={ css.txt }>{ data.location }</Text>
              </View>
            </View>
            <View style={ css.itemFooter }>
              <Text style={ css.itemTime }>{ data.createAt }</Text>
              <View style={ css.itemBy }>
                <Icon name='ios-eye-outline' size={20} color={TH_8[1]}/>
                <Text style={{marginLeft: 5,color: TH_8[1]}}>{ data.findBy }</Text>
              </View>
            </View>
          </View>
        </TouchableNativeFeedback>
      );
    }
  }

  //  切换是否已找回
  timer = null;
  toggle(){
    clearTimeout(this.timer);
    if(!this.state.hasFound){
      //  3秒后提示用户，恭喜找到，添加找到信息，删除这条数据库记录
      this.timer = setTimeout(() => {
        let url = `http://${HOST_NAME}/appClassWork/delete.php?username=${this.state.username}&createAt=${this.state.createAt}`;
        fetch(url)
        .then((s)=> s.text())
        .then((res)=>{
          // alert(res);
          ToastAndroid.show('恭喜你，找回自己的东西！', ToastAndroid.SHORT);
        })
        .catch((err)=>{
          alert(err);
        });
      }, 3000);
    }
    this.setState({
      hasFound: !this.state.hasFound,
    });
  }
}

const css = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    padding: 20,
  },
  inputContainer: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1/PixelRatio.get()*2,
    borderColor: '#fff',
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    padding: 0,
    color: '#fff',
    flex: 1,
    paddingLeft: 5,
  },
  searchIconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagContainer: {
    padding: 15,
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tagItem: {
    width: 70,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    // elevation: 1,
  },
  itemContainer: {
    width: WIDTH-40,
    height: (HEIGHT-260)/2,
    marginLeft: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 3,
    marginBottom: 20,
    elevation: 10,
  },
  itemBody: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dotted',
    paddingBottom: 4,
    position: 'relative',
  },
  removeTag: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    alignItems: 'flex-end',
  },
  itemLeftImg: {
    marginRight: 20,
  },
  itemIconFirst: {
    textAlign: 'center',
    fontSize: 20,
    color: TH_8[1],
    lineHeight: 20,
    paddingTop: 5,
    marginTop: 2,
  },
  itemIcon: {
    textAlign: 'center',
    fontSize: 20,
    color: TH_8[1],
    lineHeight: 20,
  },
  itemImg: {
    width: 40,
    height: 40,
  },
  itemRightTxt: {
    flex: 1,
  },
  txtName: {
    lineHeight: 18,
    color: TH_8[0],
    fontWeight: 'bold',
    marginTop: 2,
    marginRight: 30,
  },
  txtSecond: {
    lineHeight: 18,
    color: TH_8[0],
    fontSize: 14,
    marginBottom: 9,
  },
  txt: {
    lineHeight: 20,
    color: TH_8[1],
    fontSize: 14,
    height: 20,
    overflow: 'hidden',
  },
  itemFooter: {
    paddingTop: 20,
    position: 'relative',
  },
  itemTime: {
    width: 100,
    color: TH_8[1],
    fontSize: 12,
  },
  itemBy: {
    position: 'absolute',
    right: 0,
    top: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});