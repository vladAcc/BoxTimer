import React from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
//format time
import {getFormatTime, formatTime, getTotalTime } from '../../utils/index';

import ItemMyTimeWorkout from './ItemMyTimeWorkout';







const MyTimeWorkout = ({work, rest, rounds, preparation, active }) =>{




    return (
 
      <View style={{ marginBottom: 10}}>

          <Text style={{
              fontFamily: 'RussoOne_400Regular', 
              color: 'white' }}>
                ВРЕМЯ ТРЕНИРОВКИ{" "}:{" "}
                <Text>
                    {getTotalTime(work, rest, rounds).totalTime}
                </Text> 
          </Text>

          <View style={{flexDirection: 'row', borderBottomWidth: 1, borderColor: '#7a7a7a'}}>

                  <View style={{ 
                      flexGrow: 2,
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingRight: 10,
                  }}>
                      <ItemMyTimeWorkout title={'ТРЕНИРОВКА'} time={work}/>
                      <ItemMyTimeWorkout title={'ОТДЫХ'} time={rest}/>

                  
                  </View>

                  <View style={{ 
                      flexGrow: 2,
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingRight: 10
                  }}>
                      
                      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{fontFamily: 'RussoOne_400Regular', fontSize: 10, color: '#868686' }}>РАУНДЫ</Text>
                            <Text style={{color: 'white', fontFamily: 'RussoOne_400Regular', fontSize: 10}}>{rounds}</Text>
                      </View>
                      <ItemMyTimeWorkout title={'ПОДГОТОВКА'} time={preparation}/>
                  </View>

                  <View style={{ 
                      flexGrow: 1,
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingRight: 10,
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                  }}>
                          <AntDesign name="checkcircle" size={20} color={active ? 'green': 'grey'} />
                  </View>

          </View>
       
      </View>
 
    )
}

export default MyTimeWorkout;
