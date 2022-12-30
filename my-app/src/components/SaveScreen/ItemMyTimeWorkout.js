import React from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
//format time
import {getFormatTime, formatTime, getTotalTime } from '../../utils/index';



const ItemMyTimeWorkout = ({title, time}) =>{

    const minutes  = new formatTime(0,0,0, time).secondsandmiMutes()
    const seconds = new formatTime(0,0,0, time).secondsAndSeconds()


    return (
 
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'RussoOne_400Regular', fontSize: 10, color: '#868686'}}>{title}</Text>
            <Text style={{color: 'white', fontFamily: 'RussoOne_400Regular', fontSize: 10}}>
                {getFormatTime(minutes)}:{getFormatTime(seconds)}
            </Text>
        </View>
    )
}

export default ItemMyTimeWorkout;
