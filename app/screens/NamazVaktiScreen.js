import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import useThemeColors from '../config/colors/useThemeColors'
import SafeAndroid from '../config/SafeAndroid'
import Namazlar from '../components/NamazVaktiScreenComponents/Namazlar'
import Clock from '../components/NamazVaktiScreenComponents/Clock'
import NextNamaz from '../components/NamazVaktiScreenComponents/NextNamaz'
import { ActivityIndicator } from 'react-native'
import { useGetVakti } from '../components/NamazVaktiScreenComponents/Hooks/useGetVakti'

const NamazVaktiScreen = () => {
  const colors = useThemeColors()
  const [loading, error, vakti] = useGetVakti()
  if (vakti) {
    console.log(vakti)
  }

  if (loading) {
    return (
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator size={'large'} color={colors.fontColor} />
      </View>
    )
  }

  if (error) {
    return (
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <Text style={{ color: colors.fontColor }}>{error}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={SafeAndroid.AndroidSafeArea}>
      <View style={{ height: '25%' }}>
        <Text style={{ color: colors.fontColor, fontSize: 50 }}>
        </Text>
        <Text style={{ color: colors.fontColor, fontSize: 30 }}>
        </Text>
      </View>
      <View style={{ height: '25%' }}>
        <Clock />
        <NextNamaz DATA={vakti} />
      </View>
      <View>
        <Namazlar DATA={vakti} />
      </View>
    </SafeAreaView>
  )
}

export default NamazVaktiScreen
