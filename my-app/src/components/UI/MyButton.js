import React from 'react';
import { View, StyleSheet } from 'react-native';
//redux
import { useSelector } from 'react-redux';
//selector
import {themeReducerSelector} from '../../store/reducers/Selectors'
//theme color
import { colorObj } from '../../const/color_const';


//'#FF4C15'

const MyButton = React.memo(({children}) => {

    const { themeToggle } = useSelector(s => themeReducerSelector(s))


    return (
        <View style={styles(themeToggle).play}>
            {children}
        </View>
    )
});


const styles = (props) => StyleSheet.create({
    play: {
        backgroundColor: props 
                            ? colorObj.dark.accentColorOne
                            : colorObj.light.accentColorOne,
        width: 95,
        height: 45,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    }
});



export default MyButton;