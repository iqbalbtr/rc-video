import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { colors, images } from '@constants/index'
import SignUpForm from '@components/fragments/signUpForm'

const SignUp = () => {
    return (
        <>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.inner}>
                        <Image
                            style={{
                                width: 100,
                                height: 60
                            }}
                            resizeMode='contain'
                            source={images.logo}
                        />
                        <Text style={styles.text}>Log in to Aora</Text>

                        <View>
                            <SignUpForm />
                        </View>
                    </View>
                </ScrollView>

                <StatusBar
                    style='light'
                    backgroundColor={colors.primary}
                />
            </SafeAreaView>
        </>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        minHeight: "100%",
        backgroundColor: colors.primary,
    },
    text: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    inner: {
        display: "flex",
        flexDirection: 'column',
        gap: 18,
        marginTop: 64,
        marginBottom: 64,
        paddingRight: 16,
        paddingLeft: 16,
        justifyContent: "center",
    }
})