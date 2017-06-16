/**
 * Created by 战-不败的象征 on 2017/5/25.
 */
import React, { Component } from 'react';
import {
  AppState,
  Alert,
  Animated,
  Button,
  Image,
  View,
  ScrollView,
  ListView,
  FlatList,
  Text,
  TextInput,
  StyleSheet,
  PixelRatio,
  Vibration,
  CameraRoll,
  TouchableNativeFeedback,
  TouchableOpacity,
  NetInfo,
  Share,
  DatePickerAndroid,
  TimePickerAndroid,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// 图片网络地址
const imgURL = "http://www.ningtaostudy.cn/pic/";

export default class APIComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      currentAppState: AppState.currentState,
      photos: [],
      width: 10,
      fadeAnim: new Animated.Value(1),
      pickTime: '14:05',
      pickDate: '2017年6月5日',
    };
  }

  render(){
    // Alert.alert('放假通知', '自礼拜天开始，我校将放假两天，望同学们度过愉快的端午节！', [
    //   { text: "等会通知", onPress: () => alert("好的，同学") },
    //   { text: "取消", onPress: () => alert("什么？不要放假，好，那我们继续上课") },
    //   { text: "收到", onPress: () => alert("Happy day to you,haha") },
    // ], { cancelable: false });
    console.log(this.state.currentAppState);
    // 获取连接
    NetInfo.fetch().done(function (reachability) {
      // alert(reachability);
    });
    // 获取是否连接
    // NetInfo.isConnected.fetch().done(function (isConnected) {
    //   alert(isConnected);
    // });
    // 添加监听事件
    NetInfo.addEventListener("change", function (reachability) {
      // alert(reachability);
    });
    // 监听是否连接
    NetInfo.isConnected.addEventListener("change", function (isConnected) {
      // alert("你isConnected："+ isConnected);
    });

    // 添加图片
    let photos = this.state.photos,
        photosView = [];
    for(let i in photos){
      photosView.push(<Image
        source={{ uri: photos[i] }}
        key={ i }
        resizeMode="cover"
        style={{ width: "50%", height: 200, borderRadius: 2 }}
      />);
    }

    // setImmediate,setTimeout,setInterval
    setImmediate(function () {
      // alert('我擦嘞');
    });

    return (
      <ScrollView>
        <Text>当前appState：{ this.state.currentAppState }</Text>
        <Text>测试AlertAPI</Text>
        <View style={ css.test1}><Text>1/PixelRatio.get()</Text></View>
        <View style={ css.test2}><Text>使用普通的单位: 1</Text></View>
        <View><Text>自适应图片</Text></View>
        <Image
          source={ require("./pic/轮播图3-刘亦菲.jpg") }
          style={ css.img }
          resizeMode="contain"
        />
        {/*<TouchableNativeFeedback onPress={ () => this.saveImg("m1.jpg", "m2.jpg") }>*/}
          {/*<Text>保存图片到相册</Text>*/}
        {/*</TouchableNativeFeedback>*/}
        <View style={ css.imgContainer }>
          <Text>以下是用getPhotos读取最近的几张照片</Text>
          { photosView }
        </View>
        <View style={ [css.apiItem, { display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }] }>
          <Text style={{ width: '100%' }}>测试Vibration API</Text>
          <View style={{ width: '50%', paddingRight: 5 }}>
            <Button title="开始震动" onPress={ () => Vibration.vibrate([0,1000,0,1000], true) }/>
          </View>
          <View style={{ width: '50%' }}>
            <Button title="取消" onPress={ () => Vibration.cancel() }/>
          </View>
        </View>
        <View style={ css.apiItem }>
          <Text>测试Geolocation API</Text>
          <Button
            title="获取地理位置"
            color="#330066"
            onPress={ () => this.getLocation() }
          />
        </View>
        <View style={ css.apiItem }>
          <Text>测试fetch API，高度封装的ajax，XMLHttpRequest老了</Text>
          <Button title="获取服务器上的数据" onPress={ () => this.fetchWebsiteData() }/>
          <View style={ css.postContainer }>
            <TextInput
              value={ this.state.cao }
              underlineColorAndroid="transparent"
              placeholder="输入...."
              placeholderTextColor="#663"
              style={ css.postText }
              onChangeText={ this.changeText.bind(this) }
            />
            <Icon
              size={20}
              name="send-o"
              style={ css.postIcon }
              onPress={ () => this.fetchPostData() }
            />
          </View>
        </View>
        <View style={ css.apiItem }>
          <Text>使用requestAnimationFrame()写的一个进度条</Text>
          <View style={ css.progressContainer }>
            <View style={ [css.progress, { width: this.state.width }] }>{}</View>
          </View>
        </View>
        <View style={ css.apiItem }>
          <Text>Animated API创建动画</Text>
          <View onPress={ () => this.startFadeAnim() }>
            <Animated.View
              style={ [css.fadeAnimElement, { opacity: this.state.fadeAnim }] }
            >{}</Animated.View>
          </View>
        </View>
        <View style={ css.apiItem }>
          <Text>测试Share API</Text>
          <TouchableNativeFeedback onPress={ () => this.shareSomething() }>
            <View style={ css.shareContainer }>
              <Text style={ css.shareText }>分享</Text>
              <Icon size={20} name="share-alt" style={ css.shareIcon }/>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={ css.apiItem }>
          <Text>测试DatePickerAndroid、TimePickerAndroid这两个API</Text>
          <TouchableOpacity
            onPress={ () => this.showPicker("date") }
            activeOpacity={0.5}
            style={ css.pickerItem }
          >
            <Text>DatePickerAndroid，字面理解，取一个日期</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={ () => this.showPicker("time") }
            activeOpacity={0.5}
            style={ css.pickerItem }
          >
            <Text>TimePickerAndroid，明显取一个时间喽</Text>
          </TouchableOpacity>
          <Text>日期：{this.state.pickDate +'\n'}时间：{ this.state.pickTime }</Text>
        </View>
        <View style={ css.apiItem }>
          <Text>测试ToastAndroid API</Text>
          <Button title="显示通知" onPress={ () => this.showToast() }/>
        </View>
      </ScrollView>
    );
  }

  // 获取地址信息
  getLocation(){
    navigator.geolocation.getCurrentPosition((res) => {
      alert(JSON.stringify(res));
    }, (err) => {
      alert('出错了'+ JSON.stringify(err));
    });
  }
  changeText(val){
    this.setState({
      value: val
    });
  }
  // fetch请求的GET、POST方法
  fetchWebsiteData(){
    fetch('http://www.ningtaostudy.cn/test.php')
      .then((data) => {
        return data.text();
      })
      .then((responseText) => {
        Alert.alert('从www.ningtaostudy.cn获取的数据：', responseText, [
          { text: 'OK' }
        ]);
      })
      .catch((err) => {
        alert('出错了：'+ err);
      });
  }
  fetchPostData(){
    // let xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = function () {
    //   if(xhr.readyState === 4 && xhr.status === 200){
    //     alert(xhr.responseText);
    //   } else {
    //     console.log('出错：' +xhr.status);
    //   }
    // };
    // xhr.open('post', 'http://www.ningtaostudy.cn/test.php');
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xhr.send('data=1');
    // alert(this.state.value);
    fetch('http://www.ningtaostudy.cn/test.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/text',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'data=' +this.state.value,
    })
      .then((data) => data.text())
      .then((responseText) => {
        Alert.alert('www.ningtaostudy.cn/test.php', responseText, [{ text: 'OK' }]);
      })
      .catch((err) => alert(err));
  }

  // 开始动画效果
  startFadeAnim(){
    alert(1);
    Animated.timing(
      this.state.fadeAnim,
      {toValue: 0, duration: 2000},
    ).start();  // 注意启动
  }

  // 分享某些东西
  shareSomething(){
    Share.share({
      title: '分享到...',
      message: '这是XXX的分享链接，你将分享到XXX地方，感谢你对XXX的支持'
    }, {
      dialogTitle: '我这里改动了'
    })
      .then((res) => {
        if(res.action === Share.sharedAction){
          alert("已共享!");
        } else {
          alert("未共享！");
        }
      })
      .catch((err) => {
        alert(err);
    });
  }

  // 显示选择器
  async showPicker(type){
    try {
      if(type === 'date'){
        // 调用日期选择器
        const {action, year, month, day} = await DatePickerAndroid.open({
          date: new Date(2017,5,5)
        });
        if(action !== DatePickerAndroid.dismissedAction){
          this.setState({
            pickDate: `${year}年${month+1}月${day}日`
          });
        }
      } else if(type === 'time'){
        // 调用时间选择器
        const {action, hour, minute} = await TimePickerAndroid.open({
          hour: 14,
          minute: 5,
          // is24Hour: false
        });
        if(action !== TimePickerAndroid.dismissedAction){
          this.setState({
            pickTime: `${hour}:${minute}`
          });
        }
      }
    } catch (e){
      alert(e);
    }
  }

  // 显示浮层提示
  showToast(){
    ToastAndroid.show('我是一只小小小鸟', 10 * Math.random());
  }

  componentDidMount(){
    const _that = this;
    // 获取最近的图片
    CameraRoll.getPhotos({
      first: 10,
      // groupTypes: "All",
      assetType: "Photos"
    }).then((data) => {
      let photos = [];
      for(let i in data.edges){
        photos.push(data.edges[i].node.image.uri)
      }
      console.log(photos);
      this.setState({
        photos: photos
      });
    }).catch((err) => {
      alert("失败"+ err);
    });

    // 使用requestAnimationFrame动画效果
    function progressAnimation() {
      _that.setState({
        width: _that.state.width + 1,
      });
      if(_that.state.width < 300){
        requestAnimationFrame(progressAnimation);
      }
    }
    requestAnimationFrame(progressAnimation);
  }

  // 保存图片
  // saveImg(img1, img2){
  //   CameraRoll.saveImageWithTag(imgURL+img1, (url) => {
  //     if(url){
  //       let photos = this.state.photos;
  //       photos.push(url);
  //       this.setState({
  //         photos: photos
  //       });
  //       CameraRoll.saveImageWithTag(imgURL+img2, (url) => {
  //         this.setState({
  //           photos: photos
  //         });
  //         photos.push(url);
  //         alert("图片保存成功！");
  //       }, () => {
  //         alert("保存图片失败！");
  //       });
  //     }
  //   }, () => {
  //     alert("保存失败！");
  //   });
  // }
}
const css = StyleSheet.create({
  test1: {
    margin: 20,
    padding: 10,
    borderWidth: 1/PixelRatio.get(),
    borderColor: '#00f',
    borderStyle: 'solid',
  },
  test2: {
    margin: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#00f',
    borderStyle: 'solid',
  },
  img: {
    // width: PixelRatio.getPixelSizeForLayoutSize(180),
    // height: PixelRatio.getPixelSizeForLayoutSize(75),
    width: '100%',
    height: 100,
    margin: 20,
  },
  imgContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  apiItem: {
    padding: 5,
    paddingTop: 20,
    borderTopWidth: 1,
    borderStyle: 'solid',
    // position: 'relative',
  },
  postContainer: {
    position: 'relative',
  },
  postText: {
    borderBottomWidth: 1/PixelRatio.get(),
    borderStyle: 'solid',
    borderColor: '#663',
  },
  postIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: '#663',
  },
  progressContainer: {
    width: '100%',
    height: 3,
    backgroundColor: '#eee',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 1,
  },
  progress: {
    width: 10,
    height: 3,
    backgroundColor: '#306',
    borderRadius: 1,
  },
  fadeAnimElement: {
    width: 100,
    height: 100,
    backgroundColor: '#663',
  },
  shareContainer: {
    width: '100%',
    height: 40,
    backgroundColor: '#663',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowRadius: 1,
    shadowOpacity: 1,
    elevation: 20,
  },
  shareIcon: {
    marginLeft: 10,
    color: "#fff",
  },
  shareText: {
    // width: 50,
    color: '#fff'
  },
  pickerItem: {
    backgroundColor: '#eee',
    height: 38,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 2,
  },
});