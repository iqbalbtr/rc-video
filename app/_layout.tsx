import React, { useEffect } from 'react'
import { SplashScreen, Stack } from "expo-router"
import { useFonts } from "expo-font"
import SessionProvider from '../context/SessionContext';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

  const [fonts, errorFont] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (errorFont)
      throw errorFont;
    if (fonts)
      SplashScreen.hideAsync();
  }, [fonts, errorFont])

  if (!errorFont && !fonts)
    return null;

  return (
    <SessionProvider>
      <Stack>
        <Stack.Screen
          name='index'
          options={{
            headerShown: false
          }} />
        <Stack.Screen
          name='(auth)'
          options={{
            headerShown: false
          }} />
        <Stack.Screen
          name='(tabs)'
          options={{
            headerShown: false
          }} />
        <Stack.Screen
          name='search/[search]'
          options={{
            headerShown: false
          }} />
        <Stack.Screen
          name='profileDetail/[profileDetail]'
          options={{
            headerShown: false
          }} />
        <Stack.Screen
          name='videosEdit/[videosEdit]'
          options={{
            headerShown: false
          }} />
      </Stack>
    </SessionProvider>
  )
}

export default RootLayout
