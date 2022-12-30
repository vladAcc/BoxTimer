import React from 'react'

import { StyleSheet, Text, View, TouchableOpacity, BackHandler } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons'; 
import { Dimensions } from 'react-native';

import Header from '../components/UI/Header';
import Busola from '../components/TimerScreen/Busola';
import Layout from '../components/UI/Layout';
import MyButton  from '../components/UI/MyButton';

//redux
import {useSelector, useDispatch} from 'react-redux';
//selector
import { timeReducerSelector} from '../store/reducers/Selectors';
//modal
import MyModalCustom from '../components/UI/MyModalCustomStart/index';
import { themeReducerSelector } from '../store/reducers/Selectors'
//color
import { colorObj } from '../const/color_const';
//height
const windowHeight = Dimensions.get('window').height;








//=====================================================================================================
const Timer = ({ navigation }) => {
    

    //store selector------------------------------------------------
    const store = useSelector(s => timeReducerSelector(s))
    const { themeToggle } = useSelector(s => themeReducerSelector(s))
    
    const [work, setWork] = React.useState(store.work)//work - Lucru
    const [rest, setRest] = React.useState(store.rest) //rest - odihna
    const [rounds, setRounds] = React.useState(store.rounds) // kite raunduri

    const [isCounting, setIsCounting] = React.useState(false)   //play || pause

    const [startFetch, setStartFetch] = React.useState(true) //h1 start show hide
    const [fetchWorkRestH1, setFetchWorkRestH1] = React.useState(false) //h1

  
    const [visibleButton, setVisibleButton] = React.useState(false) //hide shov button play
    const [finichH1, setFinichH1] = React.useState(true) //finish h1

    const [visibPopupBeack, setVisibPopupBeack] = React.useState(false)//popup




    
    //goBeackFunc------------------
    const goBeackFunc = () =>{
        navigation.goBack()
    }


    React.useEffect(() => {
        const backAction = () => {
            setVisibPopupBeack(true)
          return true;
        };
        //Aparatnia  cnopca---------------------------------------------
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => {
            backAction()  //
            backHandler.remove();
        } 
      }, []);


    //==============================================================================================
    return (
          <Layout>

               
            {/*Header --------------------------------------------------------------------- */}
            <Header>

                    <View> 
                        <TouchableOpacity onPress={()=> { //button goBack
                                setVisibPopupBeack(true)
                            }}>
                            <AntDesign 
                                name="arrowleft" 
                                size={24} 
                                color={themeToggle
                                    ? colorObj.dark.textColorOne
                                    : colorObj.light.textColorOne} />
                        </TouchableOpacity>

                        <MyModalCustom  //modal goBack =================================================================================
                            visible={visibPopupBeack} 
                            setVisible={setVisibPopupBeack}> 
                            
                                <View style={{
                                        alignItems:'center', 
                                        justifyContent: 'center',
                                        paddingVertical: 50
                                    }}>
                                        <Text style={{ 
                                                fontSize: 18,
                                                color: themeToggle ? colorObj.light.backgroundColorFirst: colorObj.dark.backgroundColorFirst, 
                                                fontFamily: 'RussoOne_400Regular'
                                            }}>
                                                STOP TIMER?
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
                                               // borderBottomRightRadius: 5,
                                                padding: 10}}>
                                                    <Text style={{
                                                        fontFamily: 'RussoOne_400Regular', 
                                                        color: colorObj.light.accentColorSeconds, 
                                                        fontSize: 12,}}>
                                                            CANCEL
                                                    </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                                onPress={goBeackFunc}
                                                style={{
                                                    backgroundColor: colorObj.dark.backgroundColorSeconds,
                                                    alignItems: 'center',
                                                    width: '50%', 
                                                    fontFamily: 'RussoOne_400Regular',
                                                    //borderBottomLeftRadius: 5, 
                                                    padding: 10}}>
                                                    <Text style={{
                                                        fontFamily: 'RussoOne_400Regular', 
                                                        color: colorObj.dark.accentColorOne, 
                                                        fontSize: 12,}}>
                                                            YES
                                                    </Text>
                                        </TouchableOpacity>
                                    </View>
                        </MyModalCustom>
                    </View>

                   

            </Header>{/*End header-----------------------------------------------------*/}



            <View style={{marginBottom: 20}}>{/* Work || Rest*/}
                    <Text style={{
                        color: themeToggle
                        ? colorObj.dark.textColorOne
                        : colorObj.light.textColorOne,
                        fontFamily: 'RussoOne_400Regular',
                        fontSize: 30 }}>
                            {finichH1 &&  (!startFetch && !fetchWorkRestH1 &&  'WORK')}
                            {finichH1 &&  (!startFetch && fetchWorkRestH1 && 'REST')}
                            {startFetch  && 'START'}
                            {!finichH1  && <Text style={{ 
                                color: themeToggle 
                                            ? colorObj.dark.backgroundColorFirst
                                            : colorObj.light.backgroundColorFirst
                            }}>FINISH</Text>}
                    </Text> 
            </View>



            <Busola 
                work={work} 
                rest={rest} 
                rounds={rounds} 
                preparation={store.preparation}

                isCounting={isCounting}

                setStartFetch={setStartFetch}
                setFetchWorkRestH1={setFetchWorkRestH1}

                
                setIsCounting={setIsCounting}
                setVisibleButton={setVisibleButton}
                setFinichH1={setFinichH1}
            />
             




            <View style={{
                    position: 'absolute', 
                    bottom: windowHeight < 800 
                                        ?  (windowHeight / 100 ) * 5 
                                        :  (windowHeight / 100 ) * 13
                    }}>
                {visibleButton && 
                    (isCounting 
                        ?   <TouchableOpacity onPress={()=>setIsCounting(false)}>
                                <MyButton >
                                    <AntDesign name="pause" size={24} color="white"  />
                                </MyButton >
                            </TouchableOpacity>
                        :   <TouchableOpacity  onPress={()=>setIsCounting(true)}>
                                <MyButton >
                                    <Ionicons name="play-outline" size={24} color="white"  />
                                </MyButton >
                            </TouchableOpacity>)}





                    {!finichH1 &&  
                            <TouchableOpacity  onPress={()=>goBeackFunc()}>
                                <MyButton >
                                    <Text style={{    
                                        color: themeToggle 
                                                    ? colorObj.dark.backgroundColorFirst
                                                    : colorObj.light.backgroundColorFirst, 
                                        fontFamily: 'RussoOne_400Regular',
                                        fontSize: 16}}>FINISH</Text>
                                </MyButton >
                        </TouchableOpacity>
                    }
            </View>
          
          
                

          </Layout>
    );
}
  

//-------------------------------------------------------------------------------

const styles = StyleSheet.create({

});
  
export default Timer;

