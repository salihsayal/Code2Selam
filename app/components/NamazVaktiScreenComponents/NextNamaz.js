import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import moment from 'moment/moment'
import 'moment/locale/de'
import countdown from 'countdown'
import useThemeColors from '../../config/colors/useThemeColors'
import usePrayerTimes from './Hooks/usePrayerTimes'

const NextNamaz = ({ DATA }) => {
  // Standardblock
  const colors = useThemeColors()

  const { currentPrayer } = usePrayerTimes(DATA)
  const isCurrentTime = (prayerName) => currentPrayer === prayerName

  const [nextNamaz, setNextNamaz] = useState()
  useEffect(() => {
    const namazSequence = ['İmsak', 'Güneş', 'Öğle', 'İkindi', 'Akşam', 'Yatsı']

    const currentNamazBooleans = [
      isCurrentTime('Fajr'),
      isCurrentTime('Sunrise'),
      isCurrentTime('Dhuhr'),
      isCurrentTime('Asr'),
      isCurrentTime('Maghrib'),
      isCurrentTime('Isha')
    ]

    // This part was missing: actually finding the index of the current Namaz.
    const currentNamazIndex = currentNamazBooleans.findIndex(
      (value) => value === true
    )

    let nextNamazName = ''
    if (currentNamazIndex !== -1) {
      // If a current Namaz is found
      if (currentNamazIndex < namazSequence.length - 1) {
        nextNamazName = namazSequence[currentNamazIndex + 1]
      } else {
        // If the current Namaz is Isha, set the next Namaz to Fajr (cycle back to the start)
        nextNamazName = namazSequence[0]
      }
    }

    setNextNamaz(nextNamazName)
  }, [
    isCurrentTime('Fajr'),
    isCurrentTime('Sunrise'),
    isCurrentTime('Dhuhr'),
    isCurrentTime('Asr'),
    isCurrentTime('Maghrib'),
    isCurrentTime('Isha')
  ])

  const [remainingTime, setRemainingTime] = useState()
  useEffect(() => {
    const timerId = setInterval(() => {
      const now = new Date()
      let prayerTimes = [
        // Assuming DATA[0].data.timings.* are in 'HH:mm' format
        { name: 'Fajr', time: DATA.data.timings.Fajr },
        { name: 'Sunrise', time: DATA.data.timings.Sunrise },
        { name: 'Dhuhr', time: DATA.data.timings.Dhuhr },
        { name: 'Asr', time: DATA.data.timings.Asr },
        { name: 'Maghrib', time: DATA.data.timings.Maghrib },
        { name: 'Isha', time: DATA.data.timings.Isha }
      ].map((prayer) => ({
        ...prayer,
        time: (() => {
          const [hours, minutes] = prayer.time.split(':').map(Number)
          const date = new Date()
          date.setHours(hours, minutes, 0, 0)
          if (date < now) {
            // If the prayer time is earlier than now, move it to the next day
            date.setDate(date.getDate() + 1)
          }
          return date
        })()
      }))

      // Sort by the closest future time
      prayerTimes = prayerTimes.sort((a, b) => a.time - b.time)

      // Find the next prayer
      const nextPrayer = prayerTimes[0] // After sorting, the first one is the next

      // Assuming you have a countdown function correctly imported/setup
      const timespan = countdown(now, nextPrayer.time)

      const stunden =
        timespan.hours < 2 ? (timespan.hours == 0 ? '' : ' Stunde') : ' Stunden'
      const minuten =
        timespan.minutes < 2
          ? timespan.minutes == 0
            ? ''
            : ' Minute'
          : ' Minuten'
      const sekunden =
        timespan.seconds < 2
          ? timespan.seconds == 0
            ? ''
            : ' Sekunde'
          : ' Sekunden'
      // Construct the string manually
      const remainingString = [
        timespan.hours == 0 ? '' : timespan.hours + stunden,
        timespan.minutes == 0 ? '' : timespan.minutes + minuten,
        timespan.seconds == 0 ? '' : timespan.seconds + sekunden
      ].join(' ')

      setRemainingTime(remainingString)
    }, 1000)
    return () => clearInterval(timerId)
  }, [DATA])

  return (
    <View>
      <View>
        <Text style={{ color: colors.fontColor, textAlign: 'center' }}>
          Nächste Vakti: {nextNamaz}
        </Text>
      </View>
      <View>
        <Text style={{ color: colors.fontColor, textAlign: 'center' }}>
          {remainingTime}
        </Text>
      </View>
    </View>
  )
}

export default NextNamaz
