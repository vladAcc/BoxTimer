import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
//popup
import MyModalCustom from '../../components/UI/MyModalCustomStart/index';
//piker
import MyPikerCastom from '../MyPikerCustom/index';
//time format
import {getFormatTime , formatTime } from '../../utils/index'
//Piker
import Piker from '../../components/UI/Piker'
import PikerRounds from '../../components/UI/PikerRounds'









//==========================================================================================
const ItemTimeSave = ({title, count, rounds, dispatch, typeItem}) =>{







  const minutes = getFormatTime(Math.floor(count / 60)); //150 / 60 = 2 
  const seconds = getFormatTime(count - minutes * 60); //150 - 2 * 60 = 30 

  //======================================================================
  const [visibPopupBeack, setVisibPopupBeack] = React.useState(false)//popup
  //piker-----------------------------------------------------------------------------------
  const [selectedIndexMinuts, setSelectedIndexMinuts] = React.useState(new formatTime(0,0,0, count).secondsandmiMutes());
  const [selectedIndexSeconds, setSelectedIndexSeconds] = React.useState(new formatTime(0,0,0, count).secondsAndSeconds());
  //=================================================================


  //start timer-----------------
  const startTimerFunc = () =>{
    let hoursAndSeconds = new formatTime(selectedIndexSeconds, selectedIndexMinuts).minutAndSecond()
    let typeValue;
        if(typeItem == 'work') {typeValue = 'SET_WORK'}
        if(typeItem == 'rest') {typeValue = 'SET_REST'}
        if(typeItem == 'rounds') {typeValue = 'SET_ROUNDS'}
    if(hoursAndSeconds) {
        dispatch({type: typeValue, payload: hoursAndSeconds})
        setVisibPopupBeack(false)
      }
  }













  return (
      <View style={{
            borderBottomWidth: 1,
            borderColor: '#7a7a7a',
            paddingTop: 12,
            paddingBottom: 12,
            flexDirection: 'row', 
            flewWrap: 'no-wrap',
            justifyContent: 'space-between' }}>

                <View style={{
                        justifyContent: 'center'}}>
                    <Text style={{
                      fontFamily: 'RussoOne_400Regular', 
                      color:  'white' }}>{title}</Text>
                </View>
              
              <TouchableOpacity onPress={()=>setVisibPopupBeack(true)}>
                <View style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center' }}>
                      
                    <Text style={{
                        fontFamily: 'RussoOne_400Regular',
                        color: 'white',
                        fontSize: 24,
                        marginRight: 10}}>
                            {typeItem !== 'rounds' ? minutes + ":" + seconds : count}
                    </Text>

                      <AntDesign name="right" size={20} color="grey" />
                  </View> 
              </TouchableOpacity>



            {typeItem  != 'rounds'    
                &&  <MyModalCustom  //modal goBack =================================================================================
                          visible={visibPopupBeack}> 
        
                          <View style={{
                                  alignItems:'center', 
                                  justifyContent: 'center',
                                  paddingVertical: 50
                              }}>
                                  <Text style={{ 
                                          fontSize: 18,
                                          color: 'white', 
                                          fontFamily: 'RussoOne_400Regular'
                                      }}>
                                          <Piker 
                                            //time={50} 
                                                selectedIndexSeconds={selectedIndexSeconds}
                                                setSelectedIndexSeconds={setSelectedIndexSeconds}
                                                selectedIndexMinuts={selectedIndexMinuts}
                                                setSelectedIndexMinuts={setSelectedIndexMinuts}/>
                                  </Text>
                          </View>

                          <View style={{ 
                                  flexShrink: 1,//'#1a1a1a'
                                  backgroundColor: 'white', 
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  borderBottomRightRadius: 5,
                                  borderBottomLeftRadius: 5 
                              }}>
                                  <TouchableOpacity  
                                          onPress={()=>setVisibPopupBeack(false)} 
                                          style={{ 
                                          alignItems: 'center',
                                          width: '50%', 
                                          borderBottomRightRadius: 5,
                                          padding: 10}}>
                                              <Text style={{
                                                  fontFamily: 'RussoOne_400Regular', 
                                                  color: 'red', 
                                                  fontSize: 12,}}>
                                                      CANCEL
                                              </Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity 
                                          onPress={()=>{
                                            startTimerFunc()
                                            
                                          }}
                                          style={{
                                          alignItems: 'center',
                                          width: '50%', 
                                          fontFamily: 'RussoOne_400Regular',
                                          borderBottomLeftRadius: 5, 
                                          padding: 10}}>
                                              <Text style={{
                                                  fontFamily: 'RussoOne_400Regular', 
                                                  color: 'green', 
                                                  fontSize: 12,}}>
                                                      YES
                                              </Text>
                                  </TouchableOpacity>
                              </View>
                      </MyModalCustom>}
            





            {typeItem  == 'rounds'    
                &&  <MyModalCustom  //modal goBack =================================================================================
                          visible={visibPopupBeack}> 
        
                          <View style={{
                                  alignItems:'center', 
                                  justifyContent: 'center',
                                  paddingVertical: 50
                              }}>
                                  <Text style={{ 
                                          fontSize: 18,
                                          color: 'white', 
                                          fontFamily: 'RussoOne_400Regular'
                                      }}>
                                          <PikerRounds
                                            time={50} 
                                            selectedIndexSeconds={selectedIndexSeconds}
                                            setSelectedIndexSeconds={setSelectedIndexSeconds}
                                            selectedIndexMinuts={selectedIndexMinuts}
                                            setSelectedIndexMinuts={setSelectedIndexMinuts}/>
                                  </Text>
                          </View>

                          <View style={{ 
                                  flexShrink: 1,//'#1a1a1a'
                                  backgroundColor: 'white', 
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  borderBottomRightRadius: 5,
                                  borderBottomLeftRadius: 5 
                              }}>
                                  <TouchableOpacity  
                                          onPress={()=>setVisibPopupBeack(false)} 
                                          style={{ 
                                          alignItems: 'center',
                                          width: '50%', 
                                          borderBottomRightRadius: 5,
                                          padding: 10}}>
                                              <Text style={{
                                                  fontFamily: 'RussoOne_400Regular', 
                                                  color: 'red', 
                                                  fontSize: 12,}}>
                                                      CANCEL
                                              </Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity 
                                          onPress={()=>{
                                            startTimerFunc()
                                            
                                          }}
                                          style={{
                                          alignItems: 'center',
                                          width: '50%', 
                                          fontFamily: 'RussoOne_400Regular',
                                          borderBottomLeftRadius: 5, 
                                          padding: 10}}>
                                              <Text style={{
                                                  fontFamily: 'RussoOne_400Regular', 
                                                  color: 'green', 
                                                  fontSize: 12,}}>
                                                      YES
                                              </Text>
                                  </TouchableOpacity>
                              </View>
                      </MyModalCustom>}
            





        </View>
 
    )
}

export default ItemTimeSave;
