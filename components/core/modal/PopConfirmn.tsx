import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import colors from '@constants/colors';


const PopConfirmn = ({
  title,
  handleSuccess,
  handleReject
}: {
  title: string,
  handleSuccess: () => void;
  handleReject: () => void;
}) => {
  return (
    <Pressable onPress={handleReject} style={styles.container}>
      <View style={styles.inner_container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.action_container}>
          <Pressable onPress={handleSuccess} >
            <Text style={{
              ...styles.button,
              backgroundColor: colors.secondary[100]
            }}>
              Yes
            </Text>
          </Pressable>
          <Pressable onPress={handleReject} >
            <Text style={{
              ...styles.button,
              backgroundColor: colors.secondary[200]
            }}>
              No
            </Text>
          </Pressable >
        </View>
      </View>
    </Pressable>
  )
}

export default PopConfirmn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  title: {
    fontSize: 18,
    fontWeight: "semibold",
    color: "white"
  },
  inner_container: {
    marginTop: 22,
    padding: 12,
    width: 255,
    height: 140,
    backgroundColor: colors.black[100],
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  action_container: {
    padding: 12,
    display: "flex",
    gap: 12,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  button: {
    padding: 12,
    borderRadius: 6,
    color: colors.primary,
    fontWeight: "semibold",
    width: 100,
    textAlign: "center"
  }
})