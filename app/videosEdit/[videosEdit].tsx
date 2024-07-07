import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '@constants/colors'
import FormField from '@components/core/FornField'
import icons from '@constants/icons'
import Button from '@components/core/button'
import * as Document from "expo-document-picker"
import { ResizeMode, Video } from 'expo-av'
import { createNewPost, getIdurl, getPostById, updatePost } from '@services/videos'
import { useSession } from '../../context/SessionContext'
import { useLocalSearchParams } from 'expo-router'
import useAppwrite from '@hooks/useAppwrite'
import { VideoType } from '@models/db-schema'

type FormType = {
    title: string,
    video: Document.DocumentPickerAsset | null | string,
    thumbnail: Document.DocumentPickerAsset | null | string,
    prompt: string,
    creator: string
}

const Edit = () => {

    const { user } = useSession()
    const { videosEdit } = useLocalSearchParams();
    const { data, isLoading: loading } = useAppwrite<VideoType>(() => getPostById(atob(videosEdit as string)));

    const [form, setForm] = useState<FormType>({
        title: '',
        video: null,
        thumbnail: null,
        prompt: '',
        creator: user?.id!
    })
    const [isLoading, setLoading] = useState(false);

    const submit = async () => {
        setLoading(true)
        try {
            if (
                !form.prompt ||
                !form.thumbnail ||
                !form.title ||
                !form.video
            ) {
                return Alert.alert("Error", "Please insert all field")
            }

            const uplaod = await updatePost(form, data?.$id!, {thumbnail: data?.thumbnail!, video: data?.video!});
            return;
        } catch (error: any) {
            Alert.alert("Error", error.message)
        } finally {
            setForm({
                prompt: "",
                thumbnail: null,
                title: "",
                video: null,
                creator: ""
            })

            setLoading(false)
        }
    }

    const picker = async (type: "image" | "video") => {
        const pick = await Document.getDocumentAsync({
            type: type === "image" ?
                ["image/jpg", "image/png", "image/jpeg"] :
                ["video/mp4", "video/gif"]
        });

        if (!pick.canceled) {

            if (type === "image") {
                setForm(pv => ({ ...pv, thumbnail: pick.assets[0] }))
            } else if (type === "video") {
                setForm(pv => ({ ...pv, video: pick.assets[0] }))
            }
        } else {
            Alert.alert("alert", "No file picker");
        }
    }

    useEffect(() => {
        if (data) {
            setForm({
                prompt: data.prompt,
                thumbnail: data.thumbnail,
                title: data.title,
                video: data.video,
                creator: user?.id!
            })
            getIdurl(data?.thumbnail)
        }
    }, [data])
    

    return (
        <SafeAreaView
            style={{
                backgroundColor: colors.primary,
                height: "100%",
                padding: 12
            }}
        >
            <ScrollView>
                <View>
                    <Text style={styles.title}>Edit Video</Text>
                </View>

                {
                    loading ? (
                        <Text
                            style={{
                                padding: 24,
                                textAlign: "center",
                                color: "white",
                                fontSize: 16
                            }}
                        >
                            Loading
                        </Text>
                    ) : (
                        <View style={styles.form_container}>
                            <FormField
                                value={form.title}
                                handleChange={(e) => setForm(pv => ({ ...pv, title: e }))}
                                placeHolder='Insert title of video'
                                title='Title'
                            />

                            <View>
                                <Text style={styles.label}>
                                    Video
                                </Text>

                                <TouchableOpacity
                                    onPress={() => picker("video")}
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: colors.black[200],
                                        height: 160,
                                        borderRadius: 12,
                                        width: "100%"
                                    }}
                                >
                                    {
                                        form.video ? (
                                            <Video
                                                source={typeof form.video === "string" ? { uri: form.video } : form.video}
                                                resizeMode={ResizeMode.COVER}
                                                isLooping
                                                useNativeControls
                                            />
                                        ) : (
                                            <View
                                                style={{
                                                    borderWidth: 1,
                                                    borderColor: colors.secondary[200],
                                                    borderStyle: "dashed",
                                                    padding: 2,
                                                    borderRadius: 2
                                                }}
                                            >
                                                <Image
                                                    source={icons.upload}
                                                    style={{
                                                        width: 40,
                                                        height: 40
                                                    }}
                                                />
                                            </View>
                                        )
                                    }
                                </TouchableOpacity>
                            </View>

                            <View>
                                <Text style={styles.label}>
                                    Thumbnail
                                </Text>

                                <TouchableOpacity
                                    onPress={() => picker("image")}
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: colors.black[200],
                                        borderRadius: 12,
                                        width: "100%",
                                    }}
                                >
                                    {
                                        form.thumbnail ? (
                                            <Image
                                                source={typeof form.thumbnail === "string" ? { uri: form.thumbnail } : form.thumbnail}
                                                style={{
                                                    width: "100%",
                                                    height: 180,
                                                    borderRadius: 12
                                                }}
                                                resizeMode='cover'
                                            />
                                        ) : (
                                            <View
                                                style={{
                                                    display: "flex",
                                                    gap: 12,
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    padding: 16
                                                }}
                                            >
                                                <Image
                                                    source={icons.upload}
                                                    style={{
                                                        width: 25,
                                                        height: 25,
                                                    }}
                                                />

                                                <Text
                                                    style={{
                                                        color: colors.gray[100]
                                                    }}
                                                >Chose a thumbnail</Text>
                                            </View>
                                        )
                                    }
                                </TouchableOpacity>
                            </View>

                            <FormField
                                value={form.prompt}
                                handleChange={(e) => setForm(pv => ({ ...pv, prompt: e }))}
                                placeHolder='Insert prompt of AI video'
                                title='Prompt'
                            />

                            <Button
                                isLoading={isLoading}
                                handle={submit}
                                title='Update'
                                style={{
                                    marginTop: 12
                                }}
                            />
                        </View>
                    )
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default Edit

const styles = StyleSheet.create({
    title: {
        color: "white",
        fontWeight: "bold",
        fontSize: 24,
        marginBottom: 24,
        padding: 6
    },
    label: {
        fontSize: 14,
        marginLeft: 5,
        color: "white",
        marginVertical: 8
    },
    form_container: {
        display: "flex",
        flexDirection: "column",
        gap: 6
    }
})