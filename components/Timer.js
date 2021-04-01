import { useKeepAwake } from 'expo-keep-awake';
import React, { useEffect, useState } from 'react'
import TimerClock from './TimerClock';

export default function Timer ({ timer, prepareNextCycle, length }) {
  useKeepAwake()

  const [remainingTime, setRemainingTime] = useState(length)

  useEffect(() => {
    const interval = setInterval(calculateRemainingTime, 100);
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (remainingTime <= 0) {
      prepareNextCycle()
    }
  }, [remainingTime])

  const calculateRemainingTime = () => {
    const now = Date.now()
    setRemainingTime(Math.ceil((timer.endTime - now) / 1000) * 1000)
  }

  return (
    <TimerClock remainingTime={remainingTime} />
  )
}