import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'

export default function App() {
  const POMODORO_LENGTH = 60 * 25
  const SMALL_BREAK_LENGTH = 60 * 5
  const LONG_BREAK_LENGTH = 60 * 15

  const POMODORO = 'POMODORO'
  const SMALL_BREAK = 'SMALL_BREAK'
  const LONG_BREAK = 'LONG_BREAK'

  const [remainingTime, setRemainingTime] = useState(POMODORO_LENGTH)
  const [currentInterval, setCurrentInterval] = useState()
  const [pomodorosCount, setPomodorosCount] = useState(0)
  const [breaksCount, setBreaksCount] = useState(0)
  const [currentCycle, setCurrentCycle] = useState(POMODORO)

  const start = () => {
    setCurrentInterval(setInterval(decrement, 1000))
  }

  const pause = () => {
    clearCurrentInterval()
  }

  const resume = () => {
    setCurrentInterval(setInterval(decrement, 1000))
  }

  const stop = () => {
    clearCurrentInterval()
    setCurrentInterval(undefined)
    setRemainingTime(POMODORO_LENGTH)
  }

  const clearCurrentInterval = () => {
    clearInterval(currentInterval)
    setCurrentInterval(undefined)
  }

  const decrement = () => {
    setRemainingTime((prev) => prev - 1)
  }

  const prepareNextCycle = () => {
    switch (currentCycle) {
      case POMODORO:
        clearCurrentInterval()
        setPomodorosCount((prev) => prev + 1)

        if ((pomodorosCount + 1) % 4 === 0) {
          setRemainingTime(LONG_BREAK_LENGTH)
          setCurrentCycle(LONG_BREAK)
        } else {
          setRemainingTime(SMALL_BREAK_LENGTH)
          setCurrentCycle(SMALL_BREAK)
        }
        break
      case SMALL_BREAK:
      case LONG_BREAK:
        setCurrentCycle(POMODORO)
        clearCurrentInterval()
        setRemainingTime(POMODORO_LENGTH)
        setBreaksCount((prev) => prev + 1)
      default:
        setCurrentCycle(POMODORO)
        break
    }
  }

  if (remainingTime <= 0) {
    prepareNextCycle()
  }

  console.log('Current interval', currentInterval)

  const formattedTime = new Date(remainingTime * 1000).toISOString().substr(14, 5)

  return (
    <View style={[styles.container, currentCycle === POMODORO ? styles.pomodoroBackground : styles.breakBackground]}>
      <Text style={{fontSize: 30}}>{formattedTime}</Text>

      {currentInterval === undefined && <Button onPress={start}>Start</Button>}
      {currentInterval !== undefined && <Button onPress={stop}>Stop</Button>}
      {currentInterval !== undefined && <Button onPress={pause}>Pause</Button>}
      {currentInterval === undefined && <Button onPress={resume}>Resume</Button>}
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pomodoroBackground: {
    backgroundColor: 'orange'
  },
  breakBackground: {
    backgroundColor: 'lightblue'
  }
})
