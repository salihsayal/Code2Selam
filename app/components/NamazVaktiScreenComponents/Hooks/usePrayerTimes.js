import { useState, useEffect } from 'react'
import moment from 'moment'
import 'moment/locale/de'

const usePrayerTimes = (DATA) => {
  moment.locale('de')

  const [currentTime, setCurrentTime] = useState(moment().format('LT'))
  const [currentPrayer, setCurrentPrayer] = useState(null)

  useEffect(() => {
    // Update the current time every second
    const timerId = setInterval(() => {
      setCurrentTime(moment().format('LT'))
    }, 1000)
    return () => clearInterval(timerId)
  }, [])

  useEffect(() => {
    const prayers = DATA.data.timings
    const prayerNames = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']
    let current = null

    for (let i = 0; i < prayerNames.length; i++) {
      const nextPrayerIndex = (i + 1) % prayerNames.length
      const nextPrayerTime =
        nextPrayerIndex === 0
          ? moment(prayers[prayerNames[nextPrayerIndex]], 'HH:mm').add(
              1,
              'days'
            )
          : moment(prayers[prayerNames[nextPrayerIndex]], 'HH:mm')
      const currentTimeMoment = moment(currentTime, 'HH:mm')
      if (
        currentTimeMoment.isBetween(
          moment(prayers[prayerNames[i]], 'HH:mm'),
          nextPrayerTime,
          null,
          '[)'
        )
      ) {
        current = prayerNames[i]
        break
      }
      // Special case for Isha, which goes until the next day's Fajr
      if (
        i === prayerNames.length - 1 &&
        (currentTimeMoment.isAfter(moment(prayers['Isha'], 'HH:mm')) ||
          currentTimeMoment.isBefore(moment(prayers['Fajr'], 'HH:mm')))
      ) {
        current = 'Isha'
      }
    }

    setCurrentPrayer(current)
  }, [DATA, currentTime])

  return { currentPrayer, currentTime }
}

export default usePrayerTimes
