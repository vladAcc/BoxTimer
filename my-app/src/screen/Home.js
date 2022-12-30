import React from 'react'

import { StyleSheet, Text, View,  TouchableOpacity   } from 'react-native';

import { Ionicons, Feather   } from '@expo/vector-icons'; 

import { Dimensions } from 'react-native';

import TimeSection from '../components/HomeSceen/TimeSection';
import H1 from '../components/HomeSceen/H1';
import TotalTime  from '../components/HomeSceen/TotalTime';
import Layout from '../components/UI/Layout';
import Header from '../components/UI/Header';
import MyButton from '../components/UI/MyButton';

//storage
import AsyncStorage from '@react-native-async-storage/async-storage';
//redux
import {useSelector, useDispatch} from 'react-redux';
//selectors
import { timeReducerSelector, themeReducerSelector } from '../store/reducers/Selectors';
//color
import { colorObj } from '../const/color_const';
//height
const windowHeight = Dimensions.get('window').height;




//-----------------------------------------------------------------------------------------
const Start = ({ navigation }) => {

    const dispatch = useDispatch()
    const { themeToggle } = useSelector(s => themeReducerSelector(s))
    const {work, rest, rounds} = useSelector(s => timeReducerSelector(s))



    //themeFunc---------------------
    const themeToggleFunc = async (type, bool) => {
        dispatch({type: type})
        //console.log(bool)
        await AsyncStorage.setItem('Theme', JSON.stringify(bool));
    }
    //async store---------------------------------
    async function fetchData() {
        const res = await AsyncStorage.getItem('Theme') 
        let resPars = await JSON.parse(res)
        if(res){
            console.log(resPars, 'Async store------------------------------------')
            dispatch({type: resPars ? 'DARK_THEME' : 'LIGHT_THEME'}) 
        }
        else{
            console.log(resPars, 'Async store------------------------------------')
            await AsyncStorage.setItem('Theme', JSON.stringify(true));
        }
    }
    
      
      React.useEffect(() => {
        console.log(windowHeight)
        fetchData();
        return ()=> {
          fetchData()
        }
      }, []); 

    //-------------------------------------------------------------------
    return (
          <Layout>
   

            <Header>
                <View >
                    {false && 
                        <View >
                            <Feather 
                                name="save" 
                                size={24} 
                                color={themeToggle  
                                    ? colorObj.dark.textColorOne
                                    : colorObj.light.textColorOne}
                                onPress={()=> navigation.navigate('SaveTime')}/>
                        </View>
                    }
                     

                    {themeToggle  
                        ?    <TouchableOpacity 
                                    onPress={()=> themeToggleFunc('LIGHT_THEME', false)}>
                                        <Feather 
                                            name="sun"
                                            size={24} 
                                            color={themeToggle  
                                                        ? colorObj.dark.textColorOne
                                                        : colorObj.light.textColorOne} />
                                </TouchableOpacity> 
                        : 
                            <TouchableOpacity 
                                    onPress={()=>themeToggleFunc('DARK_THEME', true)}>
                                    <Ionicons 
                                        name="sunny" 
                                        size={24} 
                                        color={themeToggle 
                                                    ? colorObj.dark.textColorOne
                                                    : colorObj.light.textColorOne} />  
                                </TouchableOpacity> 
                    }
                </View>  


                <View >
                    <TouchableOpacity  onPress={()=> navigation.navigate('Settings')}>
                        <Ionicons 
                            name="settings-outline" 
                            size={24} 
                            color={themeToggle  
                                    ? colorObj.dark.textColorOne
                                    : colorObj.light.textColorOne}/>
                    </TouchableOpacity>
                    
                </View>  

            </Header>



            {/* ВРЕМЯ ТРЕНИРОВКИ */}
            <H1 title={'BOXING TIMER'}/> 



            <TotalTime work={work} rest={rest} rounds={rounds}/>


        
            <View style={{marginBottom: 50}}>
                    {/*ВРЕМЯ РАУНДА */}
                    <TimeSection 
                            title={"ROUND LENGTH"} 
                            actionType={['MINUS_WORK','PLUS_WORK',"SET_WORK"]} 
                            time={work} 
                            rounds={false}/> 
                    {/*ВРЕМЯ РАУНДА */}               
                    <TimeSection 
                            title={"REST"} 
                            actionType={['MINUS_REST','PLUS_REST',"SET_REST"]} 
                            time={rest} 
                            rounds={false}/>
                    {/*КОЛИЧЕСТВО РАУНДОВ*/}  
                    <TimeSection 
                            title={"ROUNDS"}  
                            actionType={['MINUS_ROUND', 'PLUS_ROUND']} 
                            time={rounds} 
                            rounds={true}/>
            </View>
                                    
            



            <View style={{ 
                    position: 'absolute', 
                    bottom: windowHeight < 800 
                                        ?  (windowHeight / 100 ) * 5 
                                        :  (windowHeight / 100 ) * 13
                    }}>  
                <TouchableOpacity 
                        onPress={()=> navigation.navigate('Timer')}
                        activeOpacity={0.9} 
                        underlayColor= {'orange'}>
                            <MyButton >
                                <Text style={{    
                                    color: 'white', 
                                    fontFamily: 'RussoOne_400Regular',
                                    fontSize: 16}}>START</Text>
                            </MyButton >
                    </TouchableOpacity >
            </View>
             

          </Layout>
    );
}

export default Start;



//------------------------------------------------------
const styles = StyleSheet.create({

});
  
