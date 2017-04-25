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

export default class header extends Component{
    render(){
        return <View style={ css.container }>
            <Text style={ css.text }>
                <Text>網易</Text>
                <Text style={ css.text1 }>新闻</Text>
                <Text>有态度°</Text>
            </Text>
        </View>;
    }
}

const css = StyleSheet.create({
    container: {
        marginTop: 25,
        height: 50,
        borderBottomWidth: 3/PixelRatio.get(),
        borderBottomColor: '#330033'
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    text1: {
        backgroundColor: '#330000',
        color: '#fff'
    }
});