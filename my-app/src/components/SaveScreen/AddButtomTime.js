import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons'; 






const AddButtonTime = ({title, count}) =>{


    return (
      <TouchableOpacity 
        style={{  
          backgroundColor: '#707070',
          alignItems: 'center',
          padding: 20,
          borderRadius: 8 }}
        activeOpacity={0.7}>
              <View style={{ flexDirection: 'row',  alignItems: 'center',}}>
                  <Ionicons 
                        style={{marginRight: 10}}
                        name="timer-outline" 
                        size={24} color="white" />
                  <Text style={{
                    fontFamily: 'RussoOne_400Regular',
                    color: 'white',
                    fontSize: 12}}>ДОБАВИТЬ НОВЫЙ ТАЙМЕР</Text>
              </View>
      </TouchableOpacity>
      
 
    )
}

export default AddButtonTime;