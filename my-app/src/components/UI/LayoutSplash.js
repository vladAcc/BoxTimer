import React, { useEffect, useRef } from 'react'
import { Animated, Dimensions, Image, Text, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Logo....
import Logo from '../../../assets/adaptive-icon.png';

//redux
import {useSelector, useDispatch} from 'react-redux';
import { themeReducerSelector } from '../../store/reducers/Selectors'
//color
import { colorObj } from '../../const/color_const';






export default function LayoutSplash({children}) {

    const { themeToggle } = useSelector(s => themeReducerSelector(s))
    // SafeArea Value...
    const edges = useSafeAreaInsets();

    // Animation Values....
    const startAnimation = useRef(new Animated.Value(0)).current;
    const boambele = useRef(new Animated.Value(1)).current;



    // Animation Done....
    useEffect(() => {

        // Starting Animation after 500ms....
        let timerFunc = setTimeout(() => {

            Animated.parallel([
                Animated.timing(
                    boambele,
                    {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: true
                    }
                ), 
                Animated.timing(
                    startAnimation,
                    {
                        // For same Height for non safe Area Devices...
                        duration: 500,
                        toValue: -Dimensions.get('window').height,
                        useNativeDriver: true
                    }
                ),           
            ]).start();

        }, 3000);

        return ()=>{
            timerFunc()
        }

    }, [])

    // Going to Move Up like Nav Bar...
    return (

        <View style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        }}>
            <Animated.View style={{
                flex: 1,
                backgroundColor: themeToggle 
                                    ? colorObj.dark.backgroundColorFirst 
                                    :  colorObj.light.backgroundColorFirst,
                zIndex: 1,
               // opacity: boambele,
                transform: [
                    { translateY: startAnimation }
                ]
            }}>

                <Animated.View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: boambele,
               
                }}>
                    <Animated.Image source={Logo} style={{
                        width: 300,
                        height: 300,
                        marginBottom: 20,
                    }}></Animated.Image>


                </Animated.View>
            </Animated.View>

            <Animated.View style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0,0.04)',
                zIndex: 0,
                transform: [
                    //{ translateY: contentTransition }
                ]
            }}>

                        {children}

            </Animated.View>

        </View>
    );
}
