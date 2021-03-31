import React from 'react'
import { Text, View } from 'react-native'

export default function TimerClock ({ remainingTime }) {
  const formattedTime = new Date(remainingTime).toISOString().substr(14, 5)

  return (
    <View>
      <Text style={{fontSize: 50, color: 'white'}}>{formattedTime}</Text>
    </View>
  )
}