import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { colors, icons } from '@constants/index'
import { TouchableOpacity } from 'react-native'

export default function FormField({
    title,
    placeHolder,
    value,
    style,
    handleChange,
    type
}: {
    title: string,
    placeHolder: string,
    value: string,
    handleChange: (e: string) => void,
    style?: object,
    type?: "password" | "text"
}) {
    const [isEye, setEye] = useState(false);
    const [focus, setFocus] = useState(false);
    
    return (
        <View style={{
            ...styles.container,
            ...style
        }}>
            <Text style={styles.label}>{title}</Text>

            <View style={styles.input}>
                <TextInput
                    style={{
                        ...styles.field,
                        borderColor: focus ? colors.secondary[200] : colors.black[100],
                        borderWidth: 1
                    }}
                    placeholder={placeHolder}
                    onChangeText={handleChange}
                    secureTextEntry={type === "password" && !isEye}
                    placeholderTextColor={"#6b7280"}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    value={value}
                />

                {
                    type === "password" && (
                        <View
                        style={styles.icon_eye}
                        >
                            <TouchableOpacity
                            onPress={() => setEye(pv => !pv)}
                            >
                                <Image
                                    source={isEye ? icons.eyeHide : icons.eye}
                                    style={{
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        marginTop: 6,
        marginBottom: 6
    },
    label: {
        fontSize: 14,
        marginLeft: 5,
        color: "white"
    },
    input: {
        height: 62,
        backgroundColor: colors.black[200],
        position: "relative",
        borderRadius: 12
    },
    field: {
        flex: 1,
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        color: "white",
        fontSize: 18,
        borderRadius: 12,
        padding: 12
    },
    icon_eye: {
        position: "absolute",
        right: 12,
        top: "30%",
    }
})