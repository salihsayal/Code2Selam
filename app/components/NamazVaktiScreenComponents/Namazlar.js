import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import useThemeColors from '../../config/colors/useThemeColors'
import usePrayerTimes from './Hooks/usePrayerTimes'

const Namazlar = ({ DATA }) => {
  const colors = useThemeColors()

  const { currentPrayer } = usePrayerTimes(DATA)
  const isCurrentTime = (prayerName) => currentPrayer === prayerName

  return (
    <View
      style={{
        borderRadius: 25,
        backgroundColor: colors.fontColor,
        margin: 10,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >
      <View>
        <Text
          style={{
            color: isCurrentTime('Fajr') ? colors.hlColor : colors.bgColor,
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          İmsak
        </Text>
        <Text
          style={{
            color: isCurrentTime('Fajr') ? colors.hlColor : colors.bgColor,
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          {DATA.data.timings.Fajr}
        </Text>
      </View>
      <View>
        <Text
          style={{
            color: isCurrentTime('Sunrise') ? colors.hlColor : colors.bgColor,
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          Güneş
        </Text>
        <Text
          style={{
            color: isCurrentTime('Sunrise') ? colors.hlColor : colors.bgColor,
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          {DATA.data.timings.Sunrise}
        </Text>
      </View>
      <View>
        <Text
          style={{
            color: isCurrentTime('Dhuhr') ? colors.hlColor : colors.bgColor,
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          Öğle
        </Text>
        <Text
          style={{
            color: isCurrentTime('Dhuhr') ? colors.hlColor : colors.bgColor,
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          {DATA.data.timings.Dhuhr}
        </Text>
      </View>
      <View>
        <Text
          style={{
            color: isCurrentTime('Asr') ? colors.hlColor : colors.bgColor,
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          İkindi
        </Text>
        <Text
          style={{
            color: isCurrentTime('Asr')  ? colors.hlColor : colors.bgColor,
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          {DATA.data.timings.Asr}
        </Text>
      </View>
      <View>
        <Text
          style={{
            color: isCurrentTime('Maghrib') ? colors.hlColor : colors.bgColor,
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          Akşam
        </Text>
        <Text
          style={{
            color: isCurrentTime('Maghrib') ? colors.hlColor : colors.bgColor,
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          {DATA.data.timings.Maghrib}
        </Text>
      </View>
      <View>
        <Text
          style={{
            color: isCurrentTime('Isha') ? colors.hlColor : colors.bgColor,
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          Yatsı
        </Text>
        <Text
          style={{
            color: isCurrentTime('Isha') ? colors.hlColor : colors.bgColor,
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          {DATA.data.timings.Isha}
        </Text>
      </View>
    </View>
  )
}

export default Namazlar
