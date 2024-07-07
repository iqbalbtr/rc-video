import { FlatList, StyleSheet, Text, View, ViewToken } from 'react-native'
import React, { useState } from 'react'
import useAppwrite from '@hooks/useAppwrite'
import { getLatestPost } from '@services/videos'
import { VideoType } from '@models/db-schema'
import TrendingCard from '@components/cards/TrendingCard'



const Trending = () => {

    const { data } = useAppwrite<VideoType[]>(getLatestPost)

    const [activeItem, setActiveItem] = useState<string>("");

    const viewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken<VideoType>[] }) => {
        if(viewableItems.length > 0){
            setActiveItem(viewableItems[0].key)
        }
    }

    return (
        <FlatList
            data={data ? [...data] : []}
            keyExtractor={item => item.$id}
            horizontal
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 170
            }}
            contentOffset={{
                x: 170,
                y: 0
            }}
            renderItem={({ item, }) => (
                <TrendingCard item={item} activeItem={activeItem} />
            )}
            contentContainerStyle={{
                paddingTop: 12,
            }}
        />
    )
}

export default Trending

const styles = StyleSheet.create({
    item: {
        fontSize: 26,
        color: "white"
    }
})