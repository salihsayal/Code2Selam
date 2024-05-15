import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import moment from 'moment/moment'
import 'moment/locale/de'
import useThemeColors from '../../config/colors/useThemeColors'

const Clock = () => {
  const colors = useThemeColors()

  moment.locale('de')
  const [currentTime, setCurrentTime] = useState(moment().format('LT'))
  useEffect(() => {
    // Update the current time every second
    const timerId = setInterval(() => {
      setCurrentTime(moment().format('LT'))
    }, 1000)
    return () => clearInterval(timerId)
  }, [])

  return (
    <View>
      <Text
        style={{
          color: colors.fontColor,
          textAlign: 'center',
          fontSize: 50,
          fontWeight: 'bold'
        }}
      >
        {currentTime}
      </Text>
    </View>
  )
}

export default Clock
