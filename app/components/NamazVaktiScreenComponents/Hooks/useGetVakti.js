import { useState, useEffect } from 'react'
import * as Location from 'expo-location'

export const useGetVakti = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [vakti, setVakti] = useState([])
  let location;


  const fetchNamazVakti = async (location) => {
    try {
      let date = new Date()
      const res = await fetch(
        `http://api.aladhan.com/v1/timings/${date.getDay}-${date.getMonth}-${date.getFullYear}?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&method=13`
      )
      const data = await res.json()
      setVakti(data)
    } catch (err) {
      setError('could not fetch namaz data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        setError('permission to access location was denied')
        setLoading(false)
        return [loading, error]
      }
      location = await Location.getCurrentPositionAsync({})
      await fetchNamazVakti(location)
    })();
  }, []);

  return [loading, error, vakti]
}
