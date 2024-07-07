import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import FormField from '../core/FornField'
import Button from '../core/button'
import { Link, router } from 'expo-router'
import { colors } from '@constants/index'
import { signIn } from '@services/user'
import { useSession } from '../../context/SessionContext'

const SignInForm = () => {

    const [login, setLogin] = useState({
        username: "",
        password: ""
    })
    const {signin} = useSession()

    
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async() => {
        try {
            if(
                !login.username ||
                !login.password 
            ) {
                throw new Error("Harap isi semua kolom");
            }
            setLoading(true);
            await signin(login.username, login.password)

            router.replace("/home");
        } catch (error: any) {
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false)
        }
    }
    

    return (
        <View>
            <FormField
            value={login.username}
                title='username'
                placeHolder='Jhon Dea'
                handleChange={(e) => setLogin(pv => ({...pv, username: e}))}
            />
            <FormField
            value={login.password}
                title='password'
                placeHolder='***'
                handleChange={(e) =>setLogin(pv => ({...pv, password: e}))}
                type='password'
            />
            <Button
                style={{
                    marginTop: 18
                }}
                handle={() => handleSubmit()}
                isLoading={isLoading}
                title='Log in'
            />
            <View style={styles.footer_container}>
                <Text style={{
                    fontSize: 16,
                    color: "white",
                }}>
                    Don't have account?
                </Text>
                <Link style={{
                    color: colors.secondary[200]
                }} href={"sign-up"}>Sign Up</Link>
            </View>
        </View>
    )
}

export default SignInForm

const styles = StyleSheet.create({
    footer_container: {
        width: "100%",
        display: "flex",
        flexDirection: 'row',
        gap: 6,
        justifyContent: "center",
        marginTop: 32,
        marginBottom: 16
    }
})