import { Alert, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { UserType, VideoType } from '@models/db-schema'
import icons from '@constants/icons';
import colors from '@constants/colors';
import { ResizeMode, Video } from 'expo-av';
import { usePathname, useRouter } from 'expo-router';
import { useSession } from '../../context/SessionContext';
import { existFromBookmark, removeFromBookmark, savedToBookmark } from '@services/bookmarkf';
import { existFromSubscribe, removeFromSubscribe, subscribeUser } from '@services/subscribe';
import { removePost } from '@services/videos';
import ModalLayout from '@components/core/modal';
import PopConfirmn from '@components/core/modal/PopConfirmn';

const VideoCard = ({
    item,
    handleData,
    currentUser,
}: {
    item: VideoType,
    handleData: Dispatch<SetStateAction<VideoType[] | null | undefined>>,
    currentUser?: UserType
}) => {

    const [isPlay, setPlay] = useState(false);
    const { user } = useSession();

    const [isSaved, setSaved] = useState(false);
    const [isSubcribe, setSubscribe] = useState(false);

    const router = useRouter();
    const pathname = usePathname()

    useEffect(() => {
        existFromBookmark(user?.id!, item.$id)
            .then(res => {
                setSaved(res ? true : false)
            }).finally(() => {

            })
        existFromSubscribe(user?.id!, item.creator.$id)
            .then(res => {
                setSubscribe(res ? true : false)
            }).finally(() => {

            })
    }, [])

    const saveVideo = async () => {
        if (!isSaved) {
            const save = await savedToBookmark(item.$id, user?.id!);
            if (save) {
                setSaved(true)
            }
        } else {
            const unsaved = await removeFromBookmark(user?.id!, item.$id);
            if (unsaved) {
                setSaved(false)
                console.log(pathname);

                if (pathname.startsWith("/bookmark")) {
                    handleData && handleData(pv => pv && pv.filter(fo => fo.$id !== item.$id))
                }
            }
        }
    }

    const subscribePost = async () => {
        try {
            if (!isSubcribe) {
                const save = await subscribeUser(user?.id!, item?.creator.$id!);
                if (save) {
                    setSubscribe(true)
                }
            } else {
                const unsubscribe = await removeFromSubscribe(user?.id!, item?.creator.$id!);
                if (unsubscribe) {
                    setSubscribe(false)
                }
            }
        } catch (error: any) {
            Alert.alert("Error", error.message)
        }
    }

    const handleremove = async () => {
        try {
            await removePost(item.$id, item.thumbnail, item.video);
            handleData && handleData(pv => pv?.filter(fo => fo.$id !== item.$id))
        } catch (error: any) {
            Alert.alert("Error", error.message)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inner_container}>
                <View style={styles.head_container}>
                    <View>
                        <Image
                            style={styles.profile}
                            source={{
                                uri: item.creator.avatar || ""
                            }}
                        />
                    </View>
                    <View style={styles.detail_container}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.title}>{item.title}</Text>
                        <Text style={styles.profile_name}>{item.creator.username}</Text>
                    </View>
                </View>
                <View
                    style={styles.tgl_container}
                >


                    {
                        <ModalLayout
                            prefix={(handle) => (
                                <TouchableOpacity
                                    onPress={handle}
                                >
                                    <Image
                                        style={{
                                            width: 20,
                                            height: 20,
                                        }}
                                        resizeMode='contain'
                                        source={icons.menu}
                                    />
                                </TouchableOpacity>
                            )}
                        >
                            {(handle) => (
                                <Pressable
                                    onPress={handle}
                                    style={styles.modal_container}
                                >
                                    <View
                                        style={styles.modal_menu}
                                    >
                                        <View style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            padding: 12
                                        }}>
                                            <View
                                                style={styles.border_strip}
                                            />
                                        </View>
                                        {
                                            item.creator.$id !== currentUser?.$id && (
                                                <TouchableOpacity
                                                    onPress={() => router.push(`/profileDetail/${btoa(item.creator.$id)}`)}
                                                >
                                                    <Text style={{ color: "white" }}>See Profile</Text>
                                                </TouchableOpacity>
                                            )
                                        }
                                        <TouchableOpacity
                                            onPress={saveVideo}
                                        >
                                            <Text style={{ color: "white" }}>{isSaved ? "Remove from save" : "Save video"}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={subscribePost}
                                        >
                                            <Text style={{ color: "white" }}>{isSubcribe ? "Unsubscribe" : "Subscribe"}</Text>
                                        </TouchableOpacity>
                                        {
                                            item.creator.$id === user?.id && (
                                                <>
                                                    <TouchableOpacity
                                                        onPress={() => router.push(`/videosEdit/${(btoa(item.$id))}`)}
                                                    >
                                                        <Text style={{ color: "white" }}>Edit</Text>
                                                    </TouchableOpacity>
                                                    <ModalLayout
                                                        prefix={(handle) => (
                                                            <TouchableOpacity
                                                                onPress={handle}
                                                            >
                                                                <Text style={{ color: "white" }}>Remove</Text>
                                                            </TouchableOpacity>
                                                        )}
                                                    >
                                                        {(close, tgl) => (
                                                            <PopConfirmn
                                                                handleReject={() => close()}
                                                                handleSuccess={() => handleremove()}
                                                                title='Are you sure deleting this video?'
                                                            />
                                                        )}
                                                    </ModalLayout>
                                                </>
                                            )
                                        }
                                    </View>
                                </Pressable>
                            )}
                        </ModalLayout>
                    }
                </View>
            </View>


            <View style={styles.image_container}>
                {
                    isPlay ? (
                        <Video
                            style={{
                                width: "100%",
                                height: 200
                            }}
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
                            style={{ position: "relative" }}>
                            <Image
                                source={{
                                    uri: item.thumbnail
                                }}
                                style={{
                                    width: "100%",
                                    height: 200,
                                    borderRadius: 12
                                }}
                            />

                            <Image
                                style={{
                                    position: "absolute",
                                    width: 40,
                                    height: 40,
                                    top: "50%",
                                    right: "50%",
                                    transform: [{ translateX: 10 }, { translateY: -20 }],
                                }}
                                source={icons.play}
                            />
                        </TouchableOpacity>
                    )
                }

            </View>
        </View>
    )
}

export default VideoCard

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 12,
        marginVertical: 24
    },
    head_container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },
    inner_container: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
    },
    profile: {
        width: 45,
        height: 45,
        borderRadius: 8
    },
    detail_container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 3
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white"
    },
    profile_name: {
        fontSize: 14,
        color: "white"
    },
    image_container: {
        marginTop: 24,
        position: "relative",
        zIndex: 1
    },
    tgl_container: {
        position: "relative"
    },
    modal_container: {
        flex: 1,
        justifyContent: "flex-end"
    },
    modal_menu: {
        width: "100%",
        paddingHorizontal: 36,
        paddingBottom: 24,
        borderRadius: 12,
        backgroundColor: colors.primary,
        zIndex: 99,
        borderColor: colors.black[100],
        borderTopWidth: 3,
        display: "flex",
        flexDirection: "column",
        gap: 24
    },
    border_strip: {
        width: "25%",
        height: 4,
        backgroundColor: colors.gray[100],
        borderRadius: 999,
    }
})