import { StyleSheet, Text, View } from 'react-native'
import useThemeColors from './app/config/colors/useThemeColors'
import NamazVaktiScreen from './app/screens/NamazVaktiScreen'

const App = () => {
  const colors = useThemeColors()

  return (
    <View style={{ flex: 1, backgroundColor: colors.bgColor }}>
      <NamazVaktiScreen />
    </View>
  )
}

export default App
