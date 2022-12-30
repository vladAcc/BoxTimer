import React from 'react';
import { StyleSheet, Text, View, Vibration } from 'react-native';

//import { AntDesign, Ionicons   } from '@expo/vector-icons'; 
import BusolaSvgComp from '../../assest/svgComponent/BusolaSvgComp';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'



//format data
import {getFormatTime, formatTime} from '../../utils/index'
//audio
import { Audio } from 'expo-av';
//redux
import {useSelector, useDispatch} from 'react-redux';
//selector
import {themeReducerSelector, audioReducerSelector, vibroReducerSelector} from '../../store/reducers/Selectors'
//theme color
import { colorObj } from '../../const/color_const';






//========================================================================================
const Busola = ({
    work, 
    rest, 
    rounds, 
    preparation,

    isCounting,  //play pause

    setStartFetch, //h1 start show hide
    setFetchWorkRestH1, //h1
   
    setIsCounting, //play pause
    setVisibleButton, //hide shov button play
    setFinichH1 //finish h1

}) => {
 
    const { themeToggle } = useSelector(s => themeReducerSelector(s))
    const [key, setKey] = React.useState(0);//repetarea timerului
    const [fetchWorkRest, setFetchWorkRest] = React.useState(true); //skimbul  ?  work : rest
    const [raund, setRaund] = React.useState(rounds); //raund
    const [raundInapoi, setRaundInapoi] = React.useState(1); //raund inapoi
    const [repeat, setRepeat] = React.useState(true); //repetare

    //const [isCounting, setIsCounting] = React.useState(false); //play || pause

    const [startCount, setStartCount] = React.useState(preparation); //inceputul taimer
    const [fetchStart, setFetchStart] = React.useState(true); //inceputul fetch

    const [fetchEnd, setFetchEnd] = React.useState(false); //inceputul fetch

    //  const {audio, vibro} = useSelector(s=>audioVibroReducerSelector(s))
    const {audio} = useSelector(s=>audioReducerSelector(s))
    const {vibro} = useSelector(s=>vibroReducerSelector(s))
    //Sound================================================================================
    const [soundWork, setSoundWork] = React.useState();
    const [soundRest, setSoundRest] = React.useState();






 

    async function playSoundWork() {
       // console.log('playSoundWork')
        if(audio){
            //console.log('Loading Sound');
            const { sound } = await Audio.Sound.createAsync(
                require('../../assest/sound/work.mp3')

            );
            setSoundWork(sound);
            //nsole.log('Playing Sound');
            await sound.playAsync(); 
        }
        //vibration
        vibro && Vibration.vibrate()
    }
  

    async function playSoundRest() {
        if(audio){
            //console.log('Loading Sound');
            const { sound } = await Audio.Sound.createAsync(
                require('../../assest/sound/rest.mp3')
            );
            setSoundRest(sound);
            //nsole.log('Playing Sound');
            await sound.playAsync(); 
        }
        //vibration
        vibro && Vibration.vibrate()
    }

    //======================================================================================


 

    //start time---------------------------------------
    function startTimerFunc(){
        setStartCount((startCount) => startCount >= 1 ?  startCount -1 : 0)
        if(startCount === 0){
            playSoundWork() //sound work
            setFetchStart(false) //ascunde startu
            setIsCounting(true)// button play || pause
            setVisibleButton(true)//arata ascunde cnopca
            setStartFetch(false) //h1 START show hide
        }
    }

    //start time-------------------------------------
    React.useEffect(()=>{
        let timeFunc = setInterval(()=>{
            fetchStart && startTimerFunc()
        }, 1000)
        return ()=>clearInterval(timeFunc)
    },[fetchStart, isCounting, startCount])





    //end Sound----------------------------------------
    React.useEffect(()=>{
        let endSound = ()=>{
            fetchEnd  &&  playSoundRest()
        }  
        endSound()
        return async ()=>{
            await sound.stopAsync()
            return endSound()
        }
    },[fetchEnd])

 



    


    //format timpului pentru circle bar---------------------------
    const children = ({remainingTime}) => {

            if(raund !== 1){
                if(remainingTime === 0){
                    setKey(key + 1)//repetare
                    setFetchWorkRest(fetchWorkRest ? false : true ) //work || rest
                    setFetchWorkRestH1(fetchWorkRest ? true : false )
                    if(!fetchWorkRest) {
                        playSoundWork()
                        setRaund(raund - 1)
                        setRaundInapoi(raundInapoi + 1) //raund inapoi
                    }else{
                        playSoundRest()
                    }   
                 }
            }
            if(raund === 1){
                setRepeat(false)
                if(remainingTime === 0){ //Finish------------------------------
                    setFetchEnd(true)
                    setVisibleButton(false)
                    setFinichH1(false)
                }
              
            }

        const minutes =  new formatTime(0,0,0, remainingTime).secondsandmiMutes()
        const seconds =  new formatTime(0,0,0, remainingTime).secondsAndSeconds()    
 
    return `${minutes < 10 ? '0' + minutes :  minutes}:${seconds < 10 ? '0' + seconds : seconds}`
}




    //==================================================================================
        return (
            <View style={styles().wrapper}>   
               <View style={{
                        posiziton: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center'}}>





                    <View style={{paddingTop: 4, zIndex: 100}}>  
                        <BusolaSvgComp 
                            width={340} 
                            height={340}
                            theme={themeToggle  ?
                                colorObj.dark.textColorFirst: colorObj.light.textColorOne }/>
                    </View>



                    <View style={{position: 'absolute'}}>
                            <CountdownCircleTimer
                                    key={key}
                                    duration={fetchWorkRest ? work : rest} //kit tsine
                                    trailColor={themeToggle  
                                                    ? colorObj.dark.textColorFirst 
                                                    : colorObj.light.textColorOne} //culoare ce ramine
                                    updateInterval={0} //peste kite sec  face update taimeru
                                    isPlaying={isCounting} //start | stop
                                    size={298} // width la tot 280
                                    strokeWidth={12} //width cercului
                                    //trailStrokeWidth={6} 
                                    strokeLinecap={'round'} //felul de animatsie 
                                    colors={[
                                        fetchWorkRest 
                                            ? themeToggle ? colorObj.dark.accentColorOne  :  colorObj.light.accentColorOne
                                            : colorObj.light.accentColorSeconds ]}
                                    //colorsTime={[10, 6, 3, 0]}
                                    onComplete={() => ({ shouldRepeat: repeat, delay: 0 /*shouldRepeat: true,delay: 2*/})}
                                    >
                                            {({ remainingTime }) => (
                                                    <Text style={{
                                                        color: themeToggle
                                                                    ? colorObj.dark.textColorOne
                                                                    : colorObj.light.textColorOne,
                                                        fontSize: 60,
                                                        fontFamily: "Oxanium_400Regular"}}>
                                                       
                                                            {children({remainingTime})}
                                                    </Text>
                                            )}
                            </CountdownCircleTimer> 
                    </View>
                    




                    <Text style={{
                                position: 'absolute',
                                color: themeToggle
                                            ? colorObj.dark.textColorOne
                                            : colorObj.light.textColorOne,
                                bottom: 110,
                                fontFamily: 'RussoOne_400Regular',
                            }}>ROUND - {raundInapoi} / {rounds}</Text>





                     {fetchStart  && 
                        <View style={{
                            position: 'absolute', 
                            zIndex: 999,
                            width: 188,
                            height: 188,
                            backgroundColor: themeToggle
                                                ? colorObj.dark.backgroundColorFirst 
                                                :  colorObj.light.backgroundColorFirst,
                            borderRadius: 100,
                            alignItems: 'center',
                            justifyContent: 'center'
                         }}>
                            <Text style={{       
                                color: themeToggle
                                            ? colorObj.dark.textColorOne
                                            : colorObj.light.textColorOne,
                                fontSize: 60,
                                fontFamily: "Oxanium_400Regular"}}>
                                        {getFormatTime(new formatTime(0,0,0, startCount).secondsandmiMutes())}:
                                        {getFormatTime(new formatTime(0,0,0, startCount).secondsAndSeconds())}
                            </Text>
                    </View>}


                    
                    {fetchEnd  && 
                        <View style={{
                            position: 'absolute', 
                            zIndex: 199,
                            width: 188,
                            height: 188,
                            backgroundColor: '#282828',
                            borderRadius: 100,
                            alignItems: 'center',
                            justifyContent: 'center'
                         }}>
                            <Text style={{       
                                color: themeToggle
                                            ? colorObj.dark.textColorOne
                                            : colorObj.light.textColorOne,
                                fontSize: 40,
                                fontFamily: "Oxanium_400Regular"}}>
                                          FINISH
                            </Text>
                    </View>}




                    <View style={{ //polosca neagra la busola
                         position: 'absolute',    
                         width: 270,
                         height: 270,
                         borderStyle: 'solid',
                         borderColor: '#131314',
                         borderWidth: 40,
                         borderRadius: 140
                    }}></View>





               </View>         
            </View>
        )
    }


const styles = () => StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        pozition: 'relative',
        borderStyle: 'solid',
        marginBottom: 50
    },
    busolaSvg: {
        paddingTop: 4,
        zIndex: 100
    },
    busolaRound: {
        position: 'absolute',    
        width: 280,
        height: 280,
        borderStyle: 'solid',
        borderColor: '#131314',
        borderWidth: 40,
        borderRadius: 140
    },
    bar: {
        position: 'absolute', 
        zIndex: 500
    },

    startTime: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 180,
        height: 180,
        borderRadius: 140,
        position: 'absolute',   
        zIndex: 110
    },
    busolaTimerCenter: {
        color: 'white',
        fontSize: 60,
        fontFamily: "Oxanium_400Regular"
    },
    busolaTimerCenterDva: {
        position: 'relative',
        flexDirection: 'row',
        color: 'white',
        fontSize: 60,
        fontFamily: "Oxanium_400Regular"
    },
    
    startTimeText: {
        position: 'absolute',
        color: 'red',
        fontSize: 60,
        fontFamily: "Oxanium_400Regular",
        zIndex: 120
    },


    finishTime: {
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        width: 180,
        height: 180,
        borderRadius: 140,
        backgroundColor: 'white',
        position: 'absolute', 
        zIndex: 130
    },
    finishTimeText: {
        position: 'absolute',
        color: '#000',
        fontSize: 30,
        fontFamily: 'RussoOne_400Regular',
        zIndex: 131
    },


    busolaTimer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    }

})


export  default Busola;