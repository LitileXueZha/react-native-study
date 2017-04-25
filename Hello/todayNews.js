/**
 * Created by 战-不败的象征 on 2017/4/20.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    PixelRatio
} from 'react-native';

export default class todayNews extends Component{
    show(title){
        alert(title);
    }
    render(){
        let news = [];
        for(let i of this.props.new){
            // console.log(i);
            let txt = <Text
                onPress={ this.show.bind(this, i) }
                numberOfLines={2}
                style={ css.news_item }
                key={ i.toString() }
            >
                { i }
            </Text>;
            news.push(txt);
        }
        return <View>
            <Text style={ css.news_title }>今日要闻</Text>
            { news }
        </View>;
    }
}
const css = StyleSheet.create({
    news_title: {
        fontSize: 24,
        marginLeft: 10,
        marginTop: 15,
        color: '#cd1d1c',
        fontWeight: 'bold'
    },
    news_item: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        fontSize: 14,
        // lineHeight: 20
    }
});