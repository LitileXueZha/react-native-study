/**
 * Created by 战-不败的象征 on 2017/6/14.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class CalenderComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      holiday: props.holiday || {
        "10-1": "国庆节",
        "9-10": "教师节",
        "6-1": "儿童节",
        "5-4": "青年节",
      },
      start: props.start || new Date(),
      num: props.num || 6,
      press: props.touchEvent || function (s) {
        alert(s);
      },
    };
  }

  render(){
    let months = [];
    let startYear = this.state.start.getFullYear(),
        startMonth = this.state.start.getMonth() + 1,
        currentDate = new Date(),
        currentYear = currentDate.getFullYear(),
        currentMonth = currentDate.getMonth(),
        currentDay = currentDate.getDate();
    // 填充月份，共num个
    for(let i=0;i<this.state.num;i++){
      let dayCount = new Date(startYear, startMonth, 0).getDate(),
          startWeek = new Date(startYear, startMonth-1, 1).getDay(),
          weekCount = Math.ceil((dayCount + startWeek) / 7);

      // 填充每一周，即每一行
      let weeks = [];
      for(let j=0;j<weekCount;j++){
        // 填充日期，例：1号
        let days = [];
        for(let k=j*7;k<(j+1)*7;k++){
          let forItemDate = new Date(startYear, startMonth-1, k-startWeek+1);

          // 判断是否为节假日
          let simpleDay = startMonth +'-'+ (k-startWeek+1),
              holiday = '';
          for(let d in this.state.holiday){
            if(simpleDay === d){
              holiday = this.state.holiday[d];
            }
          }

          // 判断是否为周末，为周末则添加颜色
          let weekdayText = {},
              week = forItemDate.getDay();
          if(week === 0 || week === 6){
            weekdayText = { color: 'rgba(255,0,0,0.8)' }
          }

          // 判断是否小于今天，则全为灰色。。
          let oldDay = {};
          if(currentDate > forItemDate){
            oldDay = { color: '#cdc' };
          }

          // 判断是否为今天
          if(currentYear === forItemDate.getFullYear() && currentMonth === forItemDate.getMonth() && currentDay === forItemDate.getDate()){
            holiday = '今天';
            oldDay = { color: '#000' };
          }

          // 填充非空白天数，k代表循环次数，startWeek为偏移天数
          if(k-startWeek >=0 && k < dayCount+startWeek){
            days.push(
              <TouchableOpacity
                key={k}
                activeOpacity={0.5}
                style={ css.dayContainer }
                onPress={ () => this.state.press(forItemDate.toLocaleDateString()) }
              >
                <View>
                  <Text style={[ css.dayText, weekdayText, oldDay ]}>{ holiday ? holiday : k-startWeek+1 }</Text>
                  <View style={ css.iconContainer }>
                    { holiday === '' ? null : <Icon size={10} name="heart-o" style={[ weekdayText, oldDay ]}/> }
                  </View>
                </View>
              </TouchableOpacity>
            );
          } else {
            days.push(
              <TouchableOpacity key={k} activeOpacity={0.5} style={ css.dayContainer }>
                <View><Text> </Text></View>
              </TouchableOpacity>
            );
          }
        }

        weeks.push(
          <View style={ css.weekRowContainer } key={ 'w'+ startMonth + j }>
            { days }
          </View>
        );
      }

      months.push(
        <View style={ css.monthContainer } key={ 'm'+ i }>
          <Text style={ css.monthHeader }>{ startYear }年{ startMonth }月</Text>
          { weeks }
        </View>
      );

      // 判断月份是否为12，是则年数加一；否则月份加一
      if(startMonth >= 12){
        startMonth = 1;
        startYear ++;
      } else {
        startMonth ++;
      }
    }

    StatusBar.setHidden(true);

    return (
      <View style={ css.container }>
        <View style={[ css.header, css.rowContainer ]}>
          <Icon size={20} name="angle-left" style={ css.headerIcon }/>
          <Text style={ css.headerText }>哪天更方便？</Text>
        </View>
        <View style={[ css.weekContainer, css.rowContainer ]}>
          <Text style={ css.weekdayText }>日</Text>
          <Text style={ css.weekText }>一</Text>
          <Text style={ css.weekText }>二</Text>
          <Text style={ css.weekText }>三</Text>
          <Text style={ css.weekText }>四</Text>
          <Text style={ css.weekText }>五</Text>
          <Text style={ css.weekdayText }>六</Text>
        </View>
        <ScrollView>
          <View style={{ padding: 5, paddingBottom: 75 }}>{ months }</View>
        </ScrollView>
      </View>
    );
  }
}

const css = StyleSheet.create({
  container: {
    padding: 0,
    margin: 0,
  },
  rowContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 40,
    backgroundColor: '#603',
    paddingLeft: 10,
  },
  headerIcon: {
    color: '#fff',
    width: 40,
    position: 'relative',
    top: -1,
  },
  headerText: {
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    paddingRight: 40,
  },
  weekContainer: {
    width: '100%',
    height: 35,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(102,0,51, 0.1)',
    backgroundColor: 'rgba(221,221,221,0.2)',
    elevation: 2,
  },
  weekText: {
    flex: 1,
    fontSize: 12  ,
    textAlign: 'center',
  },
  weekdayText: {
    flex: 1,
    textAlign: 'center',
    color: 'rgba(255,0,0,0.8)',
  },
  monthContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(102,0,51, 0.1)',
    backgroundColor: '#fff',
  },
  monthHeader: {
    padding: 10,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
  weekRowContainer: {
    width: '100%',
    height: 40,
    display: 'flex',
    flexDirection: 'row',
  },
  dayContainer: {
    flex: 1,
  },
  dayText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});