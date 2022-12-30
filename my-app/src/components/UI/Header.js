import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//dimension
import { Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;




//--------------------------------------------
const Header = React.memo(({children}) =>{



    return (
        <View style={styles.header}>
            {children}
        </View> 
    )
});


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: windowHeight < 700 
                        ?  (windowHeight / 100 ) * 1 
                        :  20
      }
});


export default Header;