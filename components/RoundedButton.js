import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

export default function RoundedButton ({ onPress, children }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'white',
    padding: 15,
  },
  text: {
    fontSize: 15,
    color: 'white'
  }
})