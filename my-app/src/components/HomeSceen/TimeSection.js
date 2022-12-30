import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { AntDesign, Ionicons  } from '@expo/vector-icons'; 

//format data
import {getFormatTime, formatTime } from '../../utils/index';
//redux
import {useSelector, useDispatch} from 'react-redux';
//selector
import {themeReducerSelector} from '../../store/reducers/Selectors'
//color
import { colorObj } from '../../const/color_const';
//popup modal
import MyModalCustom from '../UI/MyModalCustomStart/index'
//Piker
import Piker from '../UI/Piker'

//dimension
import { Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;






const TimeSectionWork = ({title, time, actionType, rounds}) =>{

  const { themeToggle } = useSelector(s => themeReducerSelector(s))
  const dispatch = useDispatch()

  const minutes = getFormatTime(Math.floor(time / 60)); //150 / 60 = 2 
  const seconds = getFormatTime(time  - minutes * 60); //150 - 2 * 60 = 30 
  const raunds = time  - minutes * 60; //150 - 2 * 60 = 30 

  const [visibPopupBeack, setVisibPopupBeack] = React.useState(false)//popup

  //piker-----------------------------------------------------------------------------------
  const [selectedIndexMinuts, setSelectedIndexMinuts] = React.useState(new formatTime(0,0,0, time).secondsandmiMutes());
  const [selectedIndexSeconds, setSelectedIndexSeconds] = React.useState(new formatTime(0,0,0, time).secondsAndSeconds());


  //start timer-----------------
  const startTimerFunc = () =>{
    let hoursAndSeconds = new formatTime(selectedIndexSeconds, selectedIndexMinuts).minutAndSecond()
    if(hoursAndSeconds) {
      //console.log(hoursAndSeconds)
      dispatch({type: actionType[2], payload: hoursAndSeconds})
      setVisibPopupBeack(false)
      }
  }


    return (
        <View style={styles(themeToggle).wrapperSection}>


                  <MyModalCustom  //modal goBack =================================================================================
                            visible={visibPopupBeack} 
                           //</View> setVisible={setVisibPopupBeack}
                           > 
                            
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
                                                  time={time} 
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
                                                  backgroundColor: colorObj.dark.backgroundColorSeconds,
                                                  alignItems: 'center',
                                                  width: '50%', 
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
                                                    backgroundColor: colorObj.dark.backgroundColorSeconds,
                                                    alignItems: 'center',
                                                    width: '50%', 
                                                    fontFamily: 'RussoOne_400Regular', 
                                                     padding: 10}}>
                                                      <Text style={{
                                                          fontFamily: 'RussoOne_400Regular', 
                                                          color:  themeToggle 
                                                                      ? colorObj.dark.accentColorOne 
                                                                      : colorObj.light.accentColorOne,
                                                          fontSize: 12}}>
                                                              YES
                                                      </Text>
                                        </TouchableOpacity>
                                    </View>
                        </MyModalCustom>





              {!rounds &&
                <TouchableOpacity onPress={()=>setVisibPopupBeack(true)} style={{ flex: 3 }}>
                    <Text style={styles().title}>
                          {title}
                    </Text>
                    <Text style={styles(themeToggle).number}>
                        {minutes}:{seconds}
                    </Text>
                </TouchableOpacity>
              }

              {rounds  &&
                  <View style={{ flex: 3 }}>
                        <Text style={styles().title}>
                          {title}
                      </Text>
                      <Text style={styles(themeToggle).number}>
                       
                         {raunds}
                      </Text>
                  </View>
              }


              <View style={styles().iconsContainer}>
                  <AntDesign 
                      onPress={()=>dispatch({type: actionType[0]})}
                      name="minuscircleo" 
                      size={30} 
                      color={themeToggle 
                                ? colorObj.dark.textColorOne
                                : colorObj.light.textColorOne}
                      style={{marginRight: 15}}/>
                  <AntDesign 
                      onPress={()=>dispatch({type: actionType[1]})}
                      name="pluscircleo" 
                      size={30} 
                      color={themeToggle 
                                ? colorObj.dark.textColorOne
                                : colorObj.light.textColorOne}/>
              </View>
     
              
        </View>
    )
}

//-----------------------------------------------------------
const styles = (props) => StyleSheet.create({
    wrapperSection: {
      width: '100%',
      flexDirection:  'row',
      flexWrap: 'nowrap',
      borderColor: 'grey',
      backgroundColor: props 
                         ? colorObj.dark.backgroundColorSeconds
                         : colorObj.light.backgroundColorSeconds,
      alignItems: 'center',
      borderRadius: 10,
      padding: windowHeight > 700  ? 12 : 10,
      marginBottom: windowHeight > 700  ? 15 : 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      elevation: 2,
    },

    title: {
      color: '#777777',
      fontSize: windowHeight > 700  ? 16 : 14, 
      fontFamily: 'RussoOne_400Regular' 
    },

    number: {
      color: props 
                ? colorObj.dark.textColorOne
                : colorObj.light.textColorOne,
      fontSize: windowHeight > 700  ? 24 : 20,
      fontFamily: 'RussoOne_400Regular' 
    },

    iconsContainer: {
      flexDirection:  'row', 
      justifyContent: 'flex-end',
      flex: 1
    }
})


//-----------------------------------------------------------------------
export default TimeSectionWork;