import React from 'react';
import {View, Text} from 'react-native';
import MyPiker  from './MyPiker';




const MyPikerCastom = ({ namePiker, setPikerTime, rounds = 1, count }) =>{

    //format time---------------------------------------------------------------------
    const minutes = Math.floor(count / 60); //150 / 60 = 2 
    const seconds = count - minutes * 60; //150 - 2 * 60 = 30 

    //--------------------------------------------------------------------------------
    let [date, setDate] = React.useState(()=>{
            if(namePiker == 'minutes') {
                return  minutes
            }
            if(namePiker == 'seconds'){
                return  seconds
            }
            else{
                return rounds
            } 
        });

   // let [number, setNumber] = React.useState(1)

    //let funcNumber = (val) =>{
        //setNumber(val)
       // setPikerTime(number)
   // }

/*
    React.useEffect(()=>{
        console.log(number, '---', namePiker)
    }, [number])
*/

    return (
        <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center'}}>
            <MyPiker
                //getNumberFunc={funcNumber}
                namePiker={namePiker}
                getNumberFunc={setPikerTime}
                value={date}
                onChange={(value) => {setDate(value)}}
                format="number"/>
        </View >
    )

}

export default MyPikerCastom;