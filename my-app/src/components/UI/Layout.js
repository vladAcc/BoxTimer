import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//redux
import { useSelector } from 'react-redux';
import { themeReducerSelector } from '../../store/reducers/Selectors'
//color
import { colorObj } from '../../const/color_const';




//---------------------------------------------------------
const Layout = React.memo(({children}) =>{

    const { themeToggle } = useSelector(s => themeReducerSelector(s))

    return (
        <View style={styles(themeToggle).container}>
            {children}
        </View>
    ) 
});

//-----------------------------------------------------------
const styles = (props) => StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: props 
                            ? colorObj.dark.backgroundColorFirst 
                            :  colorObj.light.backgroundColorFirst,
        alignItems: 'center',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
      }
});


export default Layout;