import { View, Text, FlatList, StyleSheet, StatusBar, Image, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '@constants/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@constants/images'
import SearchField from '@components/core/SearchField'
import Trending from '@components/Home/Trending'
import EmptyState from '@components/EmptyState'
import useAppwrite from '@hooks/useAppwrite'
import { getAllPost, searchVideo } from '@services/videos'
import { VideoType } from '../../models/db-schema'
import VideoCard from '@components/cards/VideoCard'
import { useLocalSearchParams } from 'expo-router'
import { getUserBookmark } from '@services/bookmarkf'
import { useSession } from '../../context/SessionContext'


const Bookmark = () => {

  const [refresh, setRefresh] = useState(false);
  const { search } = useLocalSearchParams();
  const {user} = useSession()
  const { data, refersh, handleData } = useAppwrite<VideoType[]>(() => getUserBookmark(user?.id!));

  const onRefresh = async () => {
    setRefresh(true);
    refersh();
    setRefresh(false);
  }
  
  useEffect(() => {
    refersh();
  }, [search])


  return (
    <SafeAreaView
      style={{
        ...styles.container,
        height: "100%",
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
          <VideoCard item={item} handleData={handleData} />
        )}
        ListHeaderComponent={() => (
          <View
            style={{
              paddingHorizontal: 10
            }}
          >
            <View
              style={styles.header_container}
            >
              <View
                style={styles.header_content}
              >
                <Text
                  style={styles.head_text}
                  numberOfLines={1}
                  ellipsizeMode='tail'
                >
                  Saved Video
                </Text>
              </View>

            </View>

            <SearchField
              placeHolder='Search saved videos'
            />


          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Bookmark

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
  latest_video_container: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginVertical: 24
  },
  latest_video_text: {
    fontSize: 18,
    color: "white"
  }
})