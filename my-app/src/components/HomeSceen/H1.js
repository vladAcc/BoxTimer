import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//redux
import {useSelector, useDispatch} from 'react-redux';
import { themeReducerSelector } from '../../store/reducers/Selectors'
//color
import { colorObj } from '../../const/color_const';




const H1 = ({title}) =>{

    const { themeToggle } = useSelector(s => themeReducerSelector(s))

    return (
        <Text style={styles(themeToggle).title}>
            {title}
        </Text>
    )
}


const styles = (props) => StyleSheet.create({
    title: {
        fontSize: 25, 
        color: props 
                ? colorObj.light.backgroundColorSeconds
                : colorObj.dark.backgroundColorSeconds,
        marginBottom: 20,
        fontFamily: 'RussoOne_400Regular' 
    }
})


export default H1;