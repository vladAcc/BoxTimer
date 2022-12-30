import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//format time
import {getFormatTime, formatTime, getTotalTime } from '../../utils/index';
//redux
import {useSelector, useDispatch} from 'react-redux';
import { themeReducerSelector } from '../../store/reducers/Selectors'
//color
import { colorObj } from '../../const/color_const';

//dimension
import { Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;





//===============================================================================
const TotalTime = ({work, rest, rounds}) =>{

    const { themeToggle } = useSelector(s => themeReducerSelector(s))

    //-----------------------------------------------------------------------
    const totalTime = (work + rest) * rounds;

    const hours   =  new formatTime(0,0,0, totalTime).secondsAndHours()

    const result = getTotalTime(work, rest, rounds).totalTime
    //console.log(result)

    
    //-----------------------------------------------------------------------
    return (
        <View style={styles().wrapperTime}>

            <View style={[styles(themeToggle).circleTime]}></View>

           
            <Text style={[
                    styles(themeToggle).totalTime,{
                    fontSize: hours !== 0 ? 70 : 100, 
                }]}>
                    {getTotalTime(work, rest, rounds).totalTime} 
            </Text>
            <Text style={{
                    fontFamily: 'Oxanium_400Regular',
                    top: -45,
                    fontSize: 16,
                    color: themeToggle 
                                    ? colorObj.light.backgroundColorSeconds
                                    : colorObj.dark.backgroundColorSeconds,
                }}>TIME IN TOTAL</Text>
        </View>
    )
}


//------------------------------------------------------
const styles = (props) => StyleSheet.create({
   wrapperTime:{
        position: 'relative', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom:   windowHeight > 700  ? 130 : 100,
        marginTop: windowHeight > 700 ? 100 : 80,

   },
    circleTime: {
        position: 'absolute',
        borderColor: props 
                        ?  colorObj.dark.accentColorOne
                        :  colorObj.light.accentColorOne
    },
    totalTime:{
        position: 'absolute',
        color: props 
                ?  colorObj.dark.accentColorOne
                :  colorObj.light.accentColorOne,
        fontFamily: 'Oxanium_400Regular'
   }
})


export default TotalTime;