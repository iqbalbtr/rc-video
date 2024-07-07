import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import colors from '@constants/colors'
import icons from '@constants/icons'
import ModalContext from '../../context/ModalContext'

const TabIcon = ({
    icon,
    color,
    name,
    focused
}: {
    icon: any,
    color: string,
    name: string,
    focused: boolean
}) => {
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 6
            }}
        >
            <Image
                style={{
                    width: 23,
                    height: 23,
                }}
                source={icon}
                resizeMode="contain"
                tintColor={color}
            />
            <Text
                style={{
                    color: focused ? colors.secondary[200] : color,
                    fontWeight: "bold",
                    fontSize: 12
                }}
            >
                {name}
            </Text>
        </View>
    );
}

const TabsLayout = () => {
    return (
        <ModalContext>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: colors.secondary[200],
                    tabBarShowLabel: false,
                    tabBarInactiveTintColor: colors.gray[100],
                    tabBarStyle: {
                        borderTopColor: colors.black[100],
                        borderTopWidth: 2,
                        backgroundColor: colors.primary,
                        height: 84
                    }
                }}
            >
                <Tabs.Screen
                    options={{
                        headerShown: false,
                        title: "Home",
                        tabBarIcon: ({ focused, color, size }) => (
                            <TabIcon
                                color={color}
                                focused={focused}
                                icon={icons.home}
                                name='Home'
                            />
                        )
                    }}
                    name='home'
                />
                <Tabs.Screen
                    options={{
                        headerShown: false,
                        title: "Bookmark",
                        tabBarIcon: ({ focused, color, size }) => (
                            <TabIcon
                                color={color}
                                focused={focused}
                                icon={icons.bookmark}
                                name='Bookmark'
                            />
                        )
                    }}
                    name='bookmark'
                />
                <Tabs.Screen
                    options={{
                        headerShown: false,
                        title: "Create",
                        tabBarIcon: ({ focused, color, size }) => (
                            <TabIcon
                                color={color}
                                focused={focused}
                                icon={icons.plus}
                                name='Create'
                            />
                        )
                    }}
                    name='create'
                />
                <Tabs.Screen
                    options={{
                        headerShown: false,
                        title: "Profile",
                        tabBarIcon: ({ focused, color, size }) => (
                            <TabIcon
                                color={color}
                                focused={focused}
                                icon={icons.profile}
                                name='Profile'
                            />
                        )
                    }}
                    name='profile'
                />
            </Tabs>
        </ModalContext>
    )
}

export default TabsLayout

const styles = StyleSheet.create({

})