import React from 'react'

import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import { AntDesign, Ionicons,  MaterialIcons, Feather    } from '@expo/vector-icons'; 
//import RNCheckboxCard from 'react-native-checkbox-card';
//redux===========================================================================
import {useSelector, useDispatch} from 'react-redux';
//selector
import {
    timeReducerSelector, 
    themeReducerSelector, 
    audioReducerSelector,
    vibroReducerSelector
} from '../store/reducers/Selectors';
//color
import { colorObj } from '../const/color_const';
//const redux
//import {TOGGLE_VIBRO, TOTGGLE_AUDIO} from '../store/reducers/VibroReducer';
//storage
import AsyncStorage from '@react-native-async-storage/async-storage';

import Layout from '../components/UI/Layout';
import Header from '../components/UI/Header';
import SectionSettings from '../components/SettingsScreen/SectionSettings';


//format data
import {getFormatTime, formatTime, getTotalTime } from '../utils/index';
//popup modal
import MyModalCustom from '../components/UI/MyModalCustomStart/index'
//Piker
import Piker from '../components/UI/Piker'






//====================================================================================
const Settings = ({ navigation }) => {


 
    const dispatch = useDispatch()

    const {preparation} = useSelector(s=>timeReducerSelector(s))
    const {audio} = useSelector(s=>audioReducerSelector(s))
    const {vibro} = useSelector(s=>vibroReducerSelector(s))
    const {themeToggle} = useSelector(s => themeReducerSelector(s))




    //themeFunc---------------------
    const themeToggleFunc = async (bool) => {
        dispatch({type: bool ? 'LIGHT_THEME' : 'DARK_THEME'})
        await AsyncStorage.setItem('Theme', JSON.stringify(bool));
    }


    const [visibPopupBeack, setVisibPopupBeack] = React.useState(false)//popup
    //piker-----------------------------------------------------------------------------------
    const [selectedIndexMinuts, setSelectedIndexMinuts] = React.useState(new formatTime(0,0,0, preparation).secondsandmiMutes());
    const [selectedIndexSeconds, setSelectedIndexSeconds] = React.useState(new formatTime(0,0,0, preparation).secondsAndSeconds());
   
    //start timer-----------------
    const startTimerFunc = () =>{
        let hoursAndSeconds = new formatTime(selectedIndexSeconds, selectedIndexMinuts).minutAndSecond()
        if(hoursAndSeconds) {
            console.log(hoursAndSeconds)
            dispatch({type: "SET_PREPARATION", payload: hoursAndSeconds})
            setVisibPopupBeack(false)
        }
    }



    return (
      <Layout>


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
                                                        color: themeToggle 
                                                        ? colorObj.dark.accentColorOne 
                                                        : colorObj.light.accentColorOne,
                                                        fontSize: 12,}}>
                                                            YES
                                                    </Text>
                                        </TouchableOpacity>
                                    </View>
            </MyModalCustom>





            <Header>
                <View >
                    <TouchableOpacity onPress={()=> navigation.goBack() }>
                        <AntDesign 
                            name="arrowleft" 
                            size={24} 
                            color={themeToggle  
                                        ? colorObj.dark.textColorOne
                                        : colorObj.light.textColorOne}/>
                    </TouchableOpacity>
                </View> 
            </Header>



            <View style={{ 
                height: '100%',
                width: '100%',
              }}>


         
                {/* Звук */}
                <SectionSettings themeToggle={themeToggle}> 
                      <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                          <MaterialIcons 
                                name="music-note" 
                                size={24} 
                                color={themeToggle  
                                            ? colorObj.dark.textColorOne
                                            : colorObj.light.textColorOne}
                                style={{marginRight: 20}}/>
                            <Text style={{ 
                                    fontFamily: 'RussoOne_400Regular',  
                                    fontSize: 14, 
                                    color: themeToggle  
                                            ? colorObj.dark.textColorOne
                                            : colorObj.light.textColorOne
                                    }}>
                                        SOUND
                            </Text>
                      </View>
                      <Switch
                          trackColor={{ false: colorObj.light.textColorOne, true: colorObj.dark.accentColorOne  }}
                          thumbColor={audio 
                                        ? colorObj.light.textColorOne
                                        : colorObj.dark.textColorOne
                                    }
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={()=>{dispatch({type: 'TOGGLE_AUDIO'})}}
                          value={audio} />
                </SectionSettings>

                
                {/* Выбрация */}
                <SectionSettings themeToggle={themeToggle}> 
                      <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <MaterialIcons 
                                name="vibration" 
                                size={24} 
                                color={themeToggle  
                                    ? colorObj.dark.textColorOne
                                    : colorObj.light.textColorOne}
                                style={{marginRight: 20}}/>
                            <Text style={{ 
                                    fontFamily: 'RussoOne_400Regular', 
                                    fontSize: 14, 
                                    color:  themeToggle  
                                                ? colorObj.dark.textColorOne
                                                : colorObj.light.textColorOne}}>
                                        VIBRATION
                            </Text>
                      </View>
                      <Switch
                          trackColor={{ false: colorObj.light.textColorOne, true: colorObj.dark.accentColorOne  }}
                          thumbColor={vibro 
                                        ? colorObj.light.textColorOne
                                        : colorObj.dark.textColorOne}
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={()=>dispatch({type: 'TOGGLE_VIBRO'})}
                          value={vibro} />
                </SectionSettings>


                {/* тема */}
                <SectionSettings themeToggle={themeToggle}> 
                      <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{ marginRight: 20}}>
                                {themeToggle  
                                        ?    
                                            <Feather 
                                                name="sun"
                                                size={24} 
                                                color={themeToggle  
                                                            ? colorObj.dark.textColorOne
                                                            : colorObj.light.textColorOne} />
                    
                                        : 
                                    
                                            <Ionicons 
                                                name="sunny" 
                                                size={24} 
                                                color={themeToggle 
                                                            ? colorObj.dark.textColorOne
                                                            : colorObj.light.textColorOne} />  
                
                                    }
                            </View>
                            
                                <Text style={{ 
                                        fontFamily: 'RussoOne_400Regular', 
                                        fontSize: 14, 
                                        color: themeToggle  
                                                    ? colorObj.dark.textColorOne
                                                    : colorObj.light.textColorOne}}>
                                                        THEME
                                </Text>
                        </View>

                         <Switch
                            trackColor={{ false: colorObj.light.textColorOne, true: colorObj.dark.accentColorOne }}
                            thumbColor={themeToggle  
                                            ? colorObj.light.textColorOne
                                            : colorObj.dark.textColorOne}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={()=>dispatch({type: themeToggleFunc(themeToggle)})}
                            value={themeToggle} />
                </SectionSettings>




                {/*Подготовка*/}
                <SectionSettings themeToggle={themeToggle}> 
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                          <MaterialIcons 
                                name="vibration" 
                                size={24} 
                                color={themeToggle  
                                    ? colorObj.dark.textColorOne
                                    : colorObj.light.textColorOne}
                                style={{marginRight: 20}}/>
                            <Text style={{ 
                                    fontFamily: 'RussoOne_400Regular', 
                                    fontSize: 14, 
                                    color: themeToggle  
                                                ? colorObj.dark.textColorOne
                                                : colorObj.light.textColorOne}}>
                                        PREPARATION
                            </Text>
                        </View>

                        <View  style={{paddingVertical: 15}}>
                            <TouchableOpacity onPress={()=>setVisibPopupBeack(true)}>
                                <View style={{ 
                                    flexDirection: 'row', 
                                    alignItems: 'center' }}>
                                    <Text style={{
                                        fontFamily: 'RussoOne_400Regular',
                                        fontSize: 16,
                                        color: themeToggle  
                                                ? colorObj.dark.textColorOne
                                                : colorObj.light.textColorOne}}>
                                                    {getFormatTime(selectedIndexMinuts)}:
                                                    {getFormatTime(selectedIndexSeconds)}
                                    </Text>
                                    <AntDesign 
                                            name="right" 
                                            size={20} 
                                            color={themeToggle  
                                                    ? colorObj.dark.textColorOne
                                                    : colorObj.light.textColorOne} />
                                </View> 
                            </TouchableOpacity>
                        </View>

        
                </SectionSettings>



              

            </View>
      </Layout>
    );
}

export default Settings;



//------------------------------------------------------
const styles = StyleSheet.create({


});
  
