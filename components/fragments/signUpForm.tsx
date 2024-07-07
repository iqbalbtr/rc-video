import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import FormField from '../core/FornField'
import Button from '../core/button'
import { Link, router } from 'expo-router'
import { colors } from '@constants/index'
import { register } from '@services/user'

const SignUpForm = () => {

    const [regis, setRegis] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    });

    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async() => {
        try {
            if(
                !regis.email ||
                !regis.name ||
                !regis.password ||
                !regis.username
            ) {
                throw new Error("Harap isi semua kolom");
            }
            setLoading(true);
            await register(regis.name, regis.username, regis.email, regis.password);

            router.replace("/home");
        } catch (error: any) {
            Alert.alert("Error", error.message);
            console.log(error.message);
            
        } finally {
            setLoading(false)
        }
    }

    return (
        <View>
            <FormField
            value={regis.name}
                title='name'
                placeHolder='Jhon Dea'
                handleChange={(e) => setRegis(pv => ({...pv, name: e}))}
            />
            <FormField
            value={regis.username}
                title='username'
                placeHolder='Jhon Dea'
                handleChange={(e) => setRegis(pv => ({...pv, username: e}))}
            />
            <FormField
            value={regis.email}
                title='email'
                placeHolder='Jhon Dea'
                handleChange={(e) => setRegis(pv => ({...pv, email: e}))}
            />
            <FormField
            value={regis.password}
                title='password'
                placeHolder='***'
                handleChange={(e) => setRegis(pv => ({...pv, password: e}))}
                type='password'
            />
            <Button
                style={{
                    marginTop: 18
                }}
                handle={() => handleSubmit()}
                isLoading={isLoading}
                title={isLoading ? "Loading" : "Sign up"}
            />
            <View style={styles.footer_container}>
                <Text style={{
                    fontSize: 16,
                    color: "white",
                    textAlign: "center"
                }}>
                    Have any account?
                </Text>
                <Link style={{
                    color: colors.secondary[200]
                }} href={"sign-in"}>Sign up</Link>
            </View>
        </View>
    )
}

export default SignUpForm

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