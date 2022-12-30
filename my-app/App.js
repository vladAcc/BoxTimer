import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';


import { 
  createStackNavigator, 
  CardStyleInterpolators,
  TransitionPresets
} from '@react-navigation/stack';

import Home from './src/screen/Home';
import Timer from './src/screen/Timer';
import Settings from './src/screen/Settings';
import SaveTime from './src/screen/SaveTime'

//loader
import AppLoading from 'expo-app-loading';
//Redux--------------------------------
import {Provider} from 'react-redux';
import store from './src/store/index'

//spalsh
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LayoutSplash from './src/components/UI/LayoutSplash'
//fons
import { useFonts, Exo2_400Regular } from '@expo-google-fonts/exo-2';
import { Oxanium_400Regular,} from '@expo-google-fonts/oxanium';
import { RussoOne_400Regular } from '@expo-google-fonts/russo-one';

//ecranu ca sa nu doarma-----------------------------------------------------
import { useKeepAwake } from 'expo-keep-awake';
//status bar
import { StatusBar } from 'expo-status-bar';
//navigatsia andrid de jos------------
import * as NavigationBar from 'expo-navigation-bar';





//const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();





export default function App() {

  //ecranu ca sa nu doarma
  useKeepAwake();


  //Color navigation bottom
  const ColorBarNavigation = async ()=>{
    await NavigationBar.setBackgroundColorAsync("#000000")
    await NavigationBar.setBehaviorAsync('overlay-swipe')
  }
  React.useEffect(()=>{
    ColorBarNavigation()
  })


  let [fontsLoaded] = useFonts({
    Oxanium_400Regular,
    Exo2_400Regular,
    RussoOne_400Regular,
  });




  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
      return (
        <Provider store={store}>
        {/*shapca culoarea--------------- */} 
        <StatusBar
            animated={true}
            hidden={true} 
            backgroundColor="transparent" />
            {/*Splash provider--------------- */}
            <SafeAreaProvider>
                {/*Layout Splash --------------- */}
                <LayoutSplash>
                      <NavigationContainer>   
                        <Stack.Navigator 
                          screenOptions={{
                            headerShown: false, //спрятать header
                            gestureEnabled: true,// пальцем goBack
                            gestureDirection: 'horizontal',// пальцем goBack
                            cardStyleInterpolator:  CardStyleInterpolators.forHorizontalIOS// переход страниц как в IOS
                          }}>
                                <Stack.Screen  name="Home"  component={Home} />
                                <Stack.Screen  name="Timer"  component={Timer} />
                                <Stack.Screen  name="Settings"  component={Settings} />
                                <Stack.Screen name="SaveTime" component={SaveTime}/>
                        </Stack.Navigator>
                      </NavigationContainer>
                </LayoutSplash>
            </SafeAreaProvider>
        </Provider>
      );
  }
}

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    padding: 10
  },
});



