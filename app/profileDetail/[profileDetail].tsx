import { FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '@constants/colors'
import useAppwrite from '@hooks/useAppwrite'
import { UserType, VideoType } from '@models/db-schema'
import { getUserPost } from '@services/videos'
import VideoCard from '@components/cards/VideoCard'
import EmptyState from '@components/EmptyState'
import InfoBox from '@components/cards/InfoBox'
import { StatusBar } from 'expo-status-bar'
import { useLocalSearchParams } from 'expo-router'
import { getDetailInfoUser, getUserById } from '@services/user'

export const convertNum = (num: number) => {
    return (num >= 1000 ? (num / 1000).toFixed(2) : num) as string;
}

const Profile = () => {

    const [refresh, setRefresh] = useState(false);
    const { profileDetail } = useLocalSearchParams();
    const videos = useAppwrite<VideoType[]>(() => getUserPost(atob(profileDetail as string)));
    const profileInfo = useAppwrite<UserType>(() => getUserById(atob(profileDetail as string)));
    const profileDetailInfo = useAppwrite<any>(() => getDetailInfoUser(atob(profileDetail as string)));
    
    const onRefresh = async () => {
        setRefresh(true);
        await profileInfo.refersh();
        await profileDetailInfo.refersh();
        await videos.refersh();
        setRefresh(false);
    }


    return (
        <SafeAreaView
            style={{
                height: "100%"
            }}
        >
            <FlatList
                style={styles.container_list}
                data={videos.data ?? []}
                refreshControl={<RefreshControl
                    refreshing={refresh}
                    onRefresh={onRefresh}
                />}
                keyExtractor={(item) => item?.$id}
                ListEmptyComponent={<EmptyState title='No Videos' subtitle='Be one fisrt upload video' />}
                renderItem={({ item }) => (
                    <VideoCard item={item} handleData={videos.handleData} currentUser={profileInfo.data as UserType} />
                )}
                ListHeaderComponent={() => (
                    <View
                        style={{
                            paddingVertical: 32,
                            padding: 10,
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 18,
                            width: "100%",
                        }}
                    >

                        <View style={{width: "100%"}}>
                            <Text style={{
                                fontSize: 26,
                                paddingBottom: 36,
                                color: "white",
                                fontWeight: "bold",
                                textAlign: "left"
                            }}>
                                Profile
                            </Text>
                        </View>
      

                        <Image
                            style={{
                                width: 65,
                                height: 65,
                                borderRadius: 12
                            }}
                            source={{ uri: profileInfo.data?.avatar }}
                        />

                        <View style={styles.user_info_container}>
                            <Text style={styles.name}>
                                {profileInfo.data?.name}
                            </Text>
                            <Text style={styles.username}>
                                {profileInfo.data?.username}
                            </Text>
                        </View>

                        <View style={styles.profile_container}>
                            <InfoBox
                                title='Post'
                                data={convertNum(profileDetailInfo.data ? profileDetailInfo.data.post : 0)}
                                />
                            <InfoBox
                                title='Followers'
                                data={convertNum(profileDetailInfo.data ? profileDetailInfo.data.followers : 0)}
                            />
                        </View>
                    </View>
                )}
            />

            <StatusBar
                backgroundColor={colors.primary}
                style='light'
            />
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
    },
    container_list: {
        backgroundColor: colors.primary,
        padding: 6,
        height: "120%"
    },
    header_container: {
        display: "flex",
        flexDirection: "row",
        paddingVertical: 12,
        justifyContent: "space-between",
        alignItems: "center",
    },
    header_content: {
        display: "flex",
        flexDirection: "column",
    },
    head_text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 24,
    },
    sub_head_text: {
        fontWeight: "semibold",
        fontSize: 12,
        color: "white"
    },
    profile_container: {
        display: 'flex',
        flexDirection: 'row',
        gap: 24
    },
    user_info_container: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    },
    name: {
        color: "white",
        fontSize: 22,
        fontWeight: "semibold"
    },
    username: {
        color: colors.gray[100],
        fontSize: 16,
    },
    logout: {
        position: "absolute",
        top: 12,
        right: 12
    }
})