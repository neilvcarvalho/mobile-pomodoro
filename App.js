import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'
import Timer from './components/Timer'
import TimerClock from './components/TimerClock'

export default function App() {
  const POMODORO = { id: 'POMODORO', name: 'Pomodoro', length: 1000 * 10, style: 'pomodoro' }
  const SMALL_BREAK = { id: 'SMALL_BREAK', name: 'Small Break', length: 1000 * 5, style: 'break' }
  const LONG_BREAK = { id: 'LONG_BREAK', name: 'Long Break', length: 1000 * 7, style: 'break' }

  const [pomodorosCount, setPomodorosCount] = useState(0)
  const [currentCycle, setCurrentCycle] = useState(POMODORO)
  const [timer, setTimer] = useState()


  useEffect(() => {
  }, [currentCycle])

  const start = () => {
    const now = Date.now()

    setTimer({ startTime: now, endTime: now + currentCycle.length })
  }

  const stop = () => {
    setCurrentCycle(POMODORO)
    setTimer(undefined)
  }

  const prepareNextCycle = () => {
    setTimer(undefined)

    if (currentCycle.id == POMODORO.id) {
      prepareBreakCycle()
    } else {
      setCurrentCycle(POMODORO)
    }
  }

  const prepareBreakCycle = () => {
    setPomodorosCount((prev) => prev + 1)

    if ((pomodorosCount + 1) % 4 === 0) {
      setCurrentCycle(LONG_BREAK)
    } else {
      setCurrentCycle(SMALL_BREAK)
    }
  }

  return (
    <View style={[styles.container, styles[currentCycle.style]]}>
      {timer === undefined && <TimerClock remainingTime={currentCycle.length} />}
      {timer === undefined && <Button onPress={start}>Start {currentCycle.name}</Button>}

      {timer !== undefined && <Timer timer={timer} length={currentCycle.length} prepareNextCycle={prepareNextCycle} />}
      {timer !== undefined && <Button onPress={stop}>Stop {currentCycle.name}</Button>}
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pomodoro: {
    backgroundColor: 'orange'
  },
  break: {
    backgroundColor: 'lightblue'
  }
})
