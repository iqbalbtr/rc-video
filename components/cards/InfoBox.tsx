import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '@constants/colors'

const InfoBox = ({ title, data }: { title: string, data: string }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.data}>{data}</Text>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

export default InfoBox

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2
    },
    title: {
        fontSize: 14,
        color: colors.gray[100]
    },
    data: {

        fontSize: 22,
        fontWeight: "bold",
        color: "white"
    }
})