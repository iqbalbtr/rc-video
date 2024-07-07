import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { VideoType } from '@models/db-schema'
import * as Animatable from "react-native-animatable";
import { ResizeMode, Video } from 'expo-av';

const zoomIn = {
    0: {
        transform: [{ scale: .9 }],
    },
    1: {
        transform: [{ scale: 1.1 }]
    }
}

const zoomOut = {
    0: {
        transform: [{ scale: 1 }]
    },
    1: {
        transform: [{ scale: .9 }]
    }
}


const TrendingCard = ({ activeItem, item }: { activeItem: string, item: VideoType }) => {

    const [play, setPlay] = useState(false);    

    return (
        <Animatable.View
            style={styles.container}
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={500}
        >
            {
                item.$id !== "0" ? (
                    <>
                        {
                            play ? (
                                <Video
                                style={styles.image}
                                    useNativeControls
                                    resizeMode={ResizeMode.CONTAIN}
                                    shouldPlay
                                    source={{ uri: item.video }}
                                    onPlaybackStatusUpdate={(status) => {
                                        if (status.isLoaded && status.didJustFinish) {
                                            setPlay(false);
                                        }
                                    }}
                                />
                            ) : (
                                <TouchableOpacity
                                onPress={() => setPlay(true)}
                                >
                                    <ImageBackground
                                        style={styles.image}
                                        source={{ uri: item.thumbnail }}
                                        resizeMode='cover'
                                    />
                                    <View style={styles.desc_container}>
                                        <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                    </>
                ) : (
                    <ImageBackground
                        style={{
                            width: 50
                        }}
                    />
                )
            }
        </Animatable.View>
    )
}

export default TrendingCard

const styles = StyleSheet.create({
    container: {
        marginVertical: 14,
        marginHorizontal: 6,
        position: "relative",
        borderRadius: 8,
        overflow: "hidden"
    },
    desc_container: {
        bottom: 0,
        padding: 5,
        position: "absolute",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, .5)",
        height: "25%"
    },
    title: {
        color: "white"
    },
    image: {
        borderRadius: 8,
        width: 162,
        height: 232
    }
})