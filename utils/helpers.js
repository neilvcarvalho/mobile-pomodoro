import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'

const NOTIFICATION_KEY = 'mobile-flashcards:notification'

export async function clearLocalNotification () {
  await AsyncStorage.removeItem(NOTIFICATION_KEY)
  Notifications.cancelAllScheduledNotificationsAsync()
}

export async function setLocalNotification (notification) {
  setNotificationHandler()

  const notification_data = JSON.parse(await AsyncStorage.getItem(NOTIFICATION_KEY))

  if (notification_data === null || notification_data === undefined) {
    const { status } = await Notifications.requestPermissionsAsync()

    if (status === 'granted') {
      Notifications.cancelAllScheduledNotificationsAsync()
      Notifications.scheduleNotificationAsync(notification)

      AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
    }
  }
}

export function formatNotification (triggerTime, title, body) {
  return {
    content: {
      title: title,
      body: body
    },
    trigger: triggerTime
  }
}

function setNotificationHandler() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  })
}