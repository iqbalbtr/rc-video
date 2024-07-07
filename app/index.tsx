import { Text, View, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'
import { Redirect, router } from 'expo-router'
import { SafeAreaView } from "react-native-safe-area-context"
import { colors, images } from "@constants/index"
import Button from '@components/core/button'
import { StatusBar } from 'expo-status-bar'
import { useSession } from '../context/SessionContext'

const Home = () => {

  const { isLogged, isLoading } = useSession();

  if (isLogged && !isLoading)
    return <Redirect href={"/home"} />

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            height: "100%",
            paddingRight: 24,
            paddingLeft: 24
          }}>
          <View style={styles.header}>
            <Image
              style={{
                width: 100,
                height: 30
              }}
              source={images.logo}
            />
            <Image
              source={images.cards}
              style={{
                height: 230,
                width: "100%",
                marginTop: 40
              }}
              resizeMode='contain'
            />

            <Text style={styles.head_text}>
              Discover Endless Possibilies with
              <Text style={{
                color: colors.secondary[200],
                paddingLeft: 12
              }}>
                Aora
              </Text>
            </Text>

            <Text style={styles.desc_text}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis ad cupiditate ab aliquam necessitatibus. In dolorum saepe dolores.
            </Text>
          </View>

          <Button
            title='Continue With Email'
            handle={() => router.push("sign-in")}
            style={{
              width: "100%",
            }}
          />
        </ScrollView>

        <StatusBar
          backgroundColor={colors.primary}
          style='light'
        />
      </SafeAreaView>
    </>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: "100%"
  },
  header: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    padding: 32,
    gap: 20,
    alignItems: "center"
  },
  head_text: {
    fontSize: 26,
    color: '#fff',
    textAlign: "center",
    fontWeight: "bold",
    position: "relative"
  },
  desc_text: {
    fontSize: 19,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 12
  }
})