/**
 * Created by 战-不败的象征 on 2017/6/8.
 */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import IconF from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';

// 定义属性前缀(_type_0_1选中tab一第二项)、选择背景色
const prefixType = "_type_",
      prefixStyle = "_style_",
      defaultBg = {backgroundColor: "#fff"};

export default class MenuListComponent extends Component{
  constructor(props){
    super(props);
    // this.state = {
    //   wholeArea: false,
    //   hostBusiness: true,
    //   hostDistrict: false,
    //   wholeAreaBg: {},
    //   hostBusinessBg: {backgroundColor: '#fff'},
    //   hostDistrictBg: {},
    // };
    // 获取传值，即data、nSelected、tabSelected
    const data = props.data,
          nSelected = props.nSelected,
          tabSelected = props.tabSelected;
    // 定义初始state对象，循环指针
    let obj = {}, kIndex = 0;
    for(let k in data){
      // 循环选项卡，指定选项循环指针
      let infoData = data[k], cIndex = 0;
      for(let c in infoData){
        // 循环选项，指定每一个选项默认属性(不选择，无背景)，如果是icon名称，不做任何操作
        if(c !== "IconName"){
          let type = `${prefixType + k}_${c}`,
            style = `${prefixStyle + k}_${c}`;
          obj[type] = false;
          obj[style] = {};
          if(kIndex === tabSelected && cIndex === nSelected){
            obj[type] = true;
            obj[style] = defaultBg;
          }
          cIndex ++;
        }
      }
      kIndex ++;
    }
    obj.nSelected = nSelected;
    obj.tabSelected = tabSelected;
    this.state = obj;
  }
  render(){
    return (
      <View style={ css.container }>
        <View style={ css.menuHeader }>
          {/*<View style={ css.menuHeaderItem }>*/}
            {/*<Icon size={20} name="location"/>*/}
            {/*<Text style={ css.menuHeaderItemText }>全部区域</Text>*/}
          {/*</View>*/}
          {/*<View style={ css.menuHeaderItem }>*/}
            {/*<IconF size={20} name="subway"/>*/}
            {/*<Text style={ css.menuHeaderItemText }>地铁沿线</Text>*/}
          {/*</View>*/}
          { this.renderHeader() }
        </View>
        <View style={ css.menuBody }>
          <ScrollView style={ css.menuBodyItem }>
            { this.renderMenuFirst() }
            {/*<TouchableNativeFeedback onPress={ () => this.wholeArea() }>*/}
              {/*<View style={ [css.menuFirst, this.state.wholeAreaBg] }>*/}
                {/*<Text>全部区域</Text>*/}
              {/*</View>*/}
            {/*</TouchableNativeFeedback>*/}
            {/*<TouchableNativeFeedback onPress={ () => this.hostBusiness() }>*/}
              {/*<View style={ [css.menuFirst, this.state.hostBusinessBg] }>*/}
                {/*<Text>热门商圈</Text>*/}
              {/*</View>*/}
            {/*</TouchableNativeFeedback>*/}
            {/*<TouchableNativeFeedback onPress={ () => this.hostDistrict() }>*/}
              {/*<View style={ [css.menuFirst, this.state.hostDistrictBg] }>*/}
                {/*<Text>热门行政区</Text>*/}
              {/*</View>*/}
            {/*</TouchableNativeFeedback>*/}
          </ScrollView>
          <ScrollView style={ [css.menuBodyItem, css.menuBodyItemRight] }>
            { this.renderMenuSecond() }
          </ScrollView>
          {/*{*/}
            {/*this.state.wholeArea ?*/}
            {/*<ScrollView style={ [css.menuBodyItem, css.menuBodyItemRight] }>*/}
              {/*<Text style={ css.menuSecond }>全部区域</Text>*/}
            {/*</ScrollView>*/}
            {/*: null*/}
          {/*}*/}
          {/*{*/}
            {/*this.state.hostBusiness ?*/}
              {/*<ScrollView style={ [css.menuBodyItem, css.menuBodyItemRight] }>*/}
                {/*<Text style={ css.menuSecond }>虹桥地区</Text>*/}
                {/*<Text style={ css.menuSecond }>徐家汇地区</Text>*/}
                {/*<Text style={ css.menuSecond }>淮海路商业区</Text>*/}
                {/*<Text style={ css.menuSecond }>静安寺</Text>*/}
                {/*<Text style={ css.menuSecond }>上海火车站地区</Text>*/}
                {/*<Text style={ css.menuSecond }>浦东陆家嘴金融商贸区</Text>*/}
                {/*<Text style={ css.menuSecond }>四川北路商业区</Text>*/}
                {/*<Text style={ css.menuSecond }>人民广场地区</Text>*/}
                {/*<Text style={ css.menuSecond }>南翔、安亭汽车城</Text>*/}
                {/*<Text style={ css.menuSecond }>永新怀忠镇</Text>*/}
              {/*</ScrollView>*/}
              {/*: null*/}
          {/*}*/}
          {/*{*/}
            {/*this.state.hostDistrict ?*/}
            {/*<ScrollView style={ [css.menuBodyItem, css.menuBodyItemRight] }>*/}
              {/*<Text style={ css.menuSecond }>静安区</Text>*/}
              {/*<Text style={ css.menuSecond }>徐汇区</Text>*/}
              {/*<Text style={ css.menuSecond }>长宁区</Text>*/}
              {/*<Text style={ css.menuSecond }>黄浦区</Text>*/}
              {/*<Text style={ css.menuSecond }>虹口区</Text>*/}
              {/*<Text style={ css.menuSecond }>宝山区</Text>*/}
            {/*</ScrollView>*/}
            {/*: null*/}
          {/*}*/}
        </View>
      </View>
    );
  }

  // 渲染头部选项卡
  renderHeader(){
    let headerItems = [],
        data = this.props.data,
        tabSelected = this.state.tabSelected,
        index = 0;
    for(let i in data){
      headerItems.push(
        <TouchableOpacity onPress={ () => this.tabHeader(i) } key={ i } style={ css.menuHeaderItem }>
          <View style={ css.menuHeaderItem } key={ index }>
            <Icon size={20} name={ data[i]["IconName"] } style={ index===tabSelected ? {color:"#00f"} : {} }/>
            <Text style={ index===tabSelected ? {color: "#00f", marginLeft: 5}:{marginLeft: 5} }>{ i }</Text>
          </View>
        </TouchableOpacity>
        );
      index ++;
    }
    return headerItems;
  }

  // 渲染一级菜单，即左侧视图
  renderMenuFirst(){
    let menuFirst = [],
        data = this.props.data,
        tabSelected = this.state.tabSelected,
        index = 0;
    for(let i in data){
      if(index === tabSelected){
        for(let j in data[i]){
          if(j !== "IconName"){
            let s = `${prefixStyle + i}_${j}`;
            console.log(this.state[s]);
            menuFirst.push(<TouchableNativeFeedback onPress={ () => this.menuSecond(i, j) } key={ j }>
              <View style={ [css.menuFirst, this.state[s]] }>
                <Text>{ j }</Text>
              </View>
            </TouchableNativeFeedback>);
          }
        }
        break;
      }
      index ++;
    }
    return menuFirst;
  }

  // 渲染二级菜单，即右侧视图
  renderMenuSecond(){
    let menuSecond = [],
      data = this.props.data,
      nSelected = this.state.nSelected,
      tabSelected = this.state.tabSelected,
      index = 0;
    for(let i in data){
      if(index === tabSelected){
        for(let j in data[i]){
          // console.log(j);
          if(j !== "IconName"){
            let s = `${prefixType + i}_${j}`;
            // console.log(s);
            // console.log(this.state);
            if(this.state[s]){
              for(let k in data[i][j]){
                menuSecond.push(<Text style={ css.menuSecond } key={ k } onPress={ () => this.props.click(data[i][j][k]) }>
                  { data[i][j][k] }
                </Text>);
              }
            }
          }
        }
       break;
      }
      index ++;
    }
    return menuSecond;
  }

  // 点击切换选项卡
  tabHeader(s){
    let index = 0,
        obj = {},
        data = this.props.data;
    for(let i in data){
      if(s === i){
        this.setState({
          tabSelected: index
        });
        let justOnce = 0;
        for(let j in data[i]){
          if(j !== "IconName"){
            if(justOnce > 0){
              obj[`${prefixType + i}_${j}`] = false;
              obj[`${prefixStyle + i}_${j}`] = {};
            } else {
              obj[`${prefixType + i}_${j}`] = true;
              obj[`${prefixStyle + i}_${j}`] = defaultBg;
            }
            justOnce ++;
          }
        }
        this.setState(obj);
      }
      index ++;
    }
  }

  // 点击切换一级菜单
  menuSecond(firstName, secondName){
    let obj = {};
    for(let i in this.state){
      if(i.indexOf(prefixType) > -1){
        obj[i] = false;
      }
      if(i.indexOf(prefixStyle) > -1){
        obj[i] = {};
      }
    }
    obj[`${prefixType + firstName}_${secondName}`] = true;
    obj[`${prefixStyle + firstName}_${secondName}`] = defaultBg;
    this.setState(obj);
  }

  // 点击全部区域
  wholeArea(){
    this.setState({
      wholeArea: true,
      hostBusiness: false,
      hostDistrict: false,
      wholeAreaBg: {backgroundColor: '#fff'},
      hostBusinessBg: {},
      hostDistrictBg: {},
    });
  }

  // 点击热门商圈
  hostBusiness(){
    this.setState({
      wholeArea: false,
      hostBusiness: true,
      hostDistrict: false,
      wholeAreaBg: {},
      hostBusinessBg: {backgroundColor: '#fff'},
      hostDistrictBg: {},
    });
  }

  // 点击热门行政区
  hostDistrict(){
    this.setState({
      wholeArea: false,
      hostBusiness: false,
      hostDistrict: true,
      wholeAreaBg: {},
      hostBusinessBg: {},
      hostDistrictBg: {backgroundColor: '#fff'},
    });
  }
}
const css = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    height: 300,
    width: '100%',
  },
  menuHeader: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#ddd',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuHeaderItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  menuHeaderItemText: {
    marginLeft: 5,
  },
  menuBody: {
    display: 'flex',
    width: '100%',
    height: 260,
    flexDirection: 'row',
  },
  menuBodyItem: {
    flex: 1,
  },
  menuBodyItemRight: {
    backgroundColor: '#fff',
  },
  menuFirst: {
    paddingLeft: 20,
    paddingVertical: 10,
  },
  menuSecond: {
    paddingLeft: 20,
    paddingVertical: 10,
  },
});