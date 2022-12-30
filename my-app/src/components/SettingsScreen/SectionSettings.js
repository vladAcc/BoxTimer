import React from 'react'
import { View } from 'react-native';

import {useDispatch, useSelector} from 'react-redux'
import {colorObj} from '../../const/color_const';




const SectionSettings = ({themeToggle, children}) =>{

    //console.log(themeToggle)

    return (
        
        <View style={{ 
            backgroundColor: themeToggle 
                                ? colorObj.dark.backgroundColorSeconds
                                : colorObj.light.backgroundColorSeconds,
            borderRadius: 10,
            marginBottom: 10,
            paddingVertical: 5,
            paddingHorizontal: 10,
            flexDirection: 'row',    
            justifyContent: 'space-between'}}> 
                    {children}
        </View>
    )
}

export default SectionSettings;