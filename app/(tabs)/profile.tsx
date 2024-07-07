import { FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '@constants/colors'
import images from '@constants/images'
import useAppwrite from '@hooks/useAppwrite'
import { UserType, VideoType } from '@models/db-schema'
import { getAllPost, getUserPost } from '@services/videos'
import VideoCard from '@components/cards/VideoCard'
import EmptyState from '@components/EmptyState'
import InfoBox from '@components/cards/InfoBox'
import { useSession } from '../../context/SessionContext'
import icons from '@constants/icons'
import { StatusBar } from 'expo-status-bar'
import { getDetailInfoUser, getUserById } from '@services/user'
import { convertNum } from '../profileDetail/[profileDetail]'

const Profile = () => {

  const [refresh, setRefresh] = useState(false);
  const { user, sessionRefresh, signout } = useSession()
  const profileInfo = useAppwrite<UserType>(() => getUserById(user?.id!));
  const { data, refersh, handleData } = useAppwrite<VideoType[]>(() => getUserPost(user?.id!));
  const userInfo = useAppwrite(() => getDetailInfoUser(user?.id!));

  const onRefresh = async () => {
    setRefresh(true);
    await refersh();
    await userInfo.refersh()
    sessionRefresh()
    setRefresh(false);
  }

  useEffect(() => {
    
  }, [])


  return (
    <SafeAreaView
      style={{
        height: "100%"
      }}
    >
      <FlatList
        style={styles.container_list}
        data={data ?? []}
        refreshControl={<RefreshControl
          refreshing={refresh}
          onRefresh={onRefresh}
        />}
        keyExtractor={(item) => item?.$id}
        ListEmptyComponent={<EmptyState title='No Videos' subtitle='Be one fisrt upload video' />}
        renderItem={({ item }) => (
          <VideoCard item={item} handleData={handleData} currentUser={profileInfo.data as UserType}/>
        )}
        ListHeaderComponent={() => (
          <View
            style={{
              paddingTop: 92,
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
            <TouchableOpacity
              style={styles.logout}
              onPress={signout}
            >
              <Image
                style={{
                  width: 25,
                  height: 25,
                }}
                source={icons.logout}
              />
            </TouchableOpacity>

            <Image
              style={{
                width: 65,
                height: 65,
                borderRadius: 12
              }}
              source={{ uri: user?.avatar }}
            />

            <View style={styles.user_info_container}>
              <Text style={styles.name}>
                {user?.name}
              </Text>
              <Text style={styles.username}>
                {user?.username}
              </Text>
            </View>

            <View style={styles.profile_container}>
              <InfoBox
                title='Post'
                data={convertNum(userInfo.data ? userInfo.data.post : 0)}
              />
              <InfoBox
                title='Followers'
                data={convertNum(userInfo.data ? userInfo.data.followers : 0)}
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