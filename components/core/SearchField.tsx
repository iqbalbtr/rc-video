import { Alert, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { colors, icons } from '@constants/index'
import { TouchableOpacity } from 'react-native'
import { usePathname, useRouter } from 'expo-router'

export default function SearchField({
    placeHolder,
    style,
}: {
    placeHolder: string,
    style?: object
}) {
    const [focus, setFocus] = useState(false);
    const [search, setSearch] = useState("");
    const router = useRouter();
    const pathname = usePathname();

    const handleSearch = () => {

        if (!search) {
            return Alert.alert("fill input search")
        }

        if (pathname.startsWith("/search"))
            router.setParams({ search })
        else
            router.push(`/search/${search}`)
    }

    return (
        <View style={{
            ...styles.container,
            ...style
        }}>
            <View style={styles.input}>
                <TextInput
                    style={{
                        ...styles.field,
                        borderColor: focus ? colors.secondary[200] : colors.black[100],
                        borderWidth: 1
                    }}
                    placeholder={placeHolder}
                    onChangeText={(e) => setSearch(e)}
                    placeholderTextColor={"#6b7280"}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                />

                <View
                    style={styles.icon_eye}
                >
                    <TouchableOpacity
                        onPress={handleSearch}
                    >
                        <Image
                            source={icons.search}
                            style={{
                                width: 20,
                                height: 20
                            }}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        marginTop: 6,
        marginBottom: 6
    },
    label: {
        fontSize: 14,
        marginLeft: 5,
        color: "white"
    },
    input: {
        height: 62,
        backgroundColor: colors.black[200],
        position: "relative",
        borderRadius: 12
    },
    field: {
        flex: 1,
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        color: "white",
        fontSize: 18,
        borderRadius: 12,
        padding: 12
    },
    icon_eye: {
        position: "absolute",
        right: 18,
        top: "30%",
    }
})