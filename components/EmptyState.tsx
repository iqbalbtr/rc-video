import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import images from '@constants/images'

const EmptyState = ({ title, subtitle }: { title: string, subtitle: string }) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.icon}
                source={images.empty}
            />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
    )
}

export default EmptyState

const styles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        width: 270,
        height: 250
    },
    title: {
        fontSize: 24,
        color: "white",
        fontWeight: "bold"
    },
    subtitle: {
        fontSize: 16,
        color: "white",
        fontWeight: "semibold"
    }
})