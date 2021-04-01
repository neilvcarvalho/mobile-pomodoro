import { useKeepAwake } from 'expo-keep-awake';
import React, { useEffect, useState } from 'react'
import TimerClock from './TimerClock';

export default function Timer ({ timer, prepareNextCycle, length }) {
  useKeepAwake()

  const [remainingTime, setRemainingTime] = useState(length)

  useEffect(() => {
    const interval = setInterval(calculateRemainingTime, 300);
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (remainingTime <= 0) {
      prepareNextCycle()
    }
  }, [remainingTime])

  const calculateRemainingTime = () => {
    const now = Date.now()
    setRemainingTime(timer.endTime - now)
  }

  return (
    <TimerClock remainingTime={remainingTime} />
  )
}