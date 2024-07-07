import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '@constants/index'

const Button = ({
  title,
  handle,
  style,
  text,
  isLoading
}: {
  title: string,
  handle: () => void,
  style?: object,
  text?: object,
  isLoading?: boolean 
}) => {
  return (
    <TouchableOpacity
      onPress={handle}
      style={{
        ...styles.container,
        opacity: isLoading ? .5 : 1,
        ...style
    }}
    disabled={isLoading}
    >
      <Text
      style={{
        ...styles.text,
        ...text
      }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  container: {
    height: 63,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondary[200],
    borderRadius: 12
  },
  text: {
    color: colors.primary,
    fontWeight: 700,
    fontSize: 16
  }
})