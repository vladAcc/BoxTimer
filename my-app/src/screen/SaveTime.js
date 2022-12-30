import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView   } from 'react-native';

import { AntDesign, Ionicons} from '@expo/vector-icons'; 


import ItemTimeSave from '../components/SaveScreen/ItemTimeSave';
import AddButtonTime from '../components/SaveScreen/AddButtomTime';
import MyTimeWorkout from '../components/SaveScreen/MyTimeWorkout';


import {useSelector, useDispatch} from 'react-redux';
import {timeReducerSelector, saveTimerReducerSelector} from '../store/reducers/Selectors';

//popup modal
//import MyModalCustom from '../components/UI/MyModalCustomStart/index'
//Piker
//import Piker from '../components/UI/Piker'





//-----------------------------------------------------------------------------------------
const SaveTime = ({ navigation }) => {



    const {work, rest, rounds} = useSelector(s=>timeReducerSelector(s));
    const {arrTime} = useSelector(s=>saveTimerReducerSelector(s))
    const dispatch = useDispatch();
    //-------------------------------------------------------------------



    console.log(arrTime)
    return (
        <View  style={styles.container}>

                {/*Header========================================================== */}
                <View style={styles.header}>
                        <View >
                            <TouchableOpacity onPress={()=> navigation.goBack() }>
                                <AntDesign 
                                    name="arrowleft" 
                                    size={24} color="white"/>
                            </TouchableOpacity>
                        </View>   
                </View>




        

                <View style={{//container item timer ================================================================
                    flexDirection: 'column', 
                    flewWrap: 'no-wrap',   
                    justifyContent: 'space-between',
                    width: '100%',
                    marginBottom: 12
                }}>
               
                        <ItemTimeSave 
                            title='ТРЕНИРОВКА' 
                            count={work} 
                            dispatch={dispatch} 
                            typeItem={'work'}
                            rounds={rounds}/>
                   
                        <ItemTimeSave 
                            title='ОТДЫХ'
                            count={rest} 
                            dispatch={dispatch} 
                            typeItem={'rest'}
                            rounds={rounds}/>

                        <ItemTimeSave 
                            title='РАУНДЫ' 
                            count={rounds} 
                            dispatch={dispatch} 
                            typeItem={'rounds'} 
                            rounds={rounds}/>
            

                </View>

     
                {/** Add Time Button ===================================================================== */}
                <View style={{  width: '100%', marginBottom: 12 }}>
                    <AddButtonTime />
                </View>

                <View style={{  
                          width: '100%',
                          marginBottom: 12,  
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#3f3f3f' }}>
                                <Text style={{
                                  fontSize: 14,
                                  paddingTop: 12,
                                  paddingBottom: 12,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  color: '#b6b6b6',
                                  fontFamily: 'RussoOne_400Regular',
                                  backgroundColor: '#3f3f3f' 
                                }}>МОИ УПРАЖНЕНИЯ</Text>
                    </View>
                    









                <ScrollView style={{width: '100%'}}>


                                {arrTime.map((item, i)=>{
                                    return(
                                        <MyTimeWorkout 
                                            key={i} 
                                            work={item.work} 
                                            rest={item.rest} 
                                            rounds={item.rounds}
                                            preparation={item.preparation}
                                            active={true}
                                        />
                                    )
                                })}


                 
                            {false && <View>
                                <MyTimeWorkout  
                                    work={"05:00"} 
                                    rest={"00:30"} 
                                    round={5}
                                    preparation={"00:05"}
                                    totalTime={'50:00'}
                                    colorButton={'green'} />
                                <MyTimeWorkout  
                                    work={"10:00"} 
                                    rest={"00:20"} 
                                    round={3}
                                    preparation={"00:10"}
                                    totalTime={'60:00'} />
                                <MyTimeWorkout  
                                    work={"02:00"} 
                                    rest={"00:10"} 
                                    round={8}
                                    preparation={"00:15"}
                                    totalTime={'20:00'} />
                            </View> }
                    

                </ScrollView >

               



            

        </View >
    );
}

export default SaveTime;



//------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#282828'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 25,
    marginBottom: 10
  }
});
  
