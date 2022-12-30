import React from 'react';
import {View,  Text} from 'react-native';
//format data
import { createTimerItems } from '../../utils/index'
//piker
import WheelPicker from 'react-native-wheely';

const Piker = ({
    selectedIndexSeconds, 
    selectedIndexMinuts,
    setSelectedIndexSeconds,
    setSelectedIndexMinuts
}) => {
  //piker state
  //const [selectedIndexMinuts, setSelectedIndexMinuts] = React.useState(new formatTime(0,0,0, time).secondsandmiMutes());
  //const [selectedIndexSeconds, setSelectedIndexSeconds] = React.useState(new formatTime(0,0,0, time).secondsAndSeconds());


 


    return (
    
            <View style={{ 
                flexDirection: 'row',  
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                paddingRight: 30
            }}>
         
                  <Text style={{
                    fontSize: 10,
                    fontFamily: 'RussoOne_400Regular',
                    color: '#7e7e7e',
                    marginRight: 1,
                    marginLeft: 10}}>
                      M.
                    </Text>
                  <WheelPicker
                        visibleRest={1}
                        containerStyle={{
                          width: 60, 
                          backgroundColor: '#1a1a1a',
                          borderRadius: 5}}
                        selectedIndicatorStyle={{backgroundColor: '#000'}}
                        itemTextStyle={{
                            color: 'white',
                            fontFamily: 'RussoOne_400Regular'}}
                        selectedIndex={selectedIndexMinuts}
                        options={createTimerItems(60)} /*['00','01','02','03','04','05'] */
                        onChange={(index)=>setSelectedIndexMinuts(index)}
                      />
                  <Text style={{
                      fontSize: 10,
                      fontFamily: 'RussoOne_400Regular',
                      color: '#7e7e7e',
                      marginRight: 2,
                      marginLeft: 10}}>S.</Text>
                  <WheelPicker
                      visibleRest={1}
                      containerStyle={{
                        width: 60, 
                        backgroundColor: '#1a1a1a',
                        borderRadius: 5}}
                      selectedIndicatorStyle={{backgroundColor: '#000'}}
                      itemTextStyle={{
                          color: 'white',
                          fontFamily: 'RussoOne_400Regular'}}
                      selectedIndex={selectedIndexSeconds}
                      options={createTimerItems(60)}  /*['00','01','02','03','04','05'] */
                      onChange={(index)=>setSelectedIndexSeconds(index)}
                    />
        </View>
    )
}

export default Piker