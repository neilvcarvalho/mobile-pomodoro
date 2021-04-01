import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Vibration } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Timer from './components/Timer'
import TimerClock from './components/TimerClock'
import RoundedButton from './components/RoundedButton'

export default function App() {
  const POMODORO = { id: 'POMODORO', name: 'Pomodoro', length: 1000 * 60 * 25, colors: ['red', 'orange'] }
  const SMALL_BREAK = { id: 'SMALL_BREAK', name: 'Small Break', length: 1000 * 60 * 5, colors: ['blue', 'cyan'] }
  const LONG_BREAK = { id: 'LONG_BREAK', name: 'Long Break', length: 1000 * 60 * 15, colors: ['blue', 'cyan'] }

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
    Vibration.vibrate()

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
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient colors={currentCycle.colors} style={styles.background}>
        {timer === undefined && <TimerClock remainingTime={currentCycle.length} />}
        {timer === undefined && <RoundedButton onPress={start} mode='contained'>Start {currentCycle.name}</RoundedButton>}

        {timer !== undefined && <Timer timer={timer} length={currentCycle.length} prepareNextCycle={prepareNextCycle} />}
        {timer !== undefined && <RoundedButton onPress={stop} mode='contained'>Stop {currentCycle.name}</RoundedButton>}
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    width: '100%'
  }
})
