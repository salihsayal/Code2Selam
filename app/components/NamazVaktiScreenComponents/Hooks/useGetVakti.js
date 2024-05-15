import { useState, useEffect } from 'react'
import * as Location from 'expo-location'

export const useGetVakti = () => {
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)
  const [vakti, setVakti] = useState([])
  const [address, setAddress] = useState([])

  // const fetchNamazData = async (city) => {
  //   try {
  //     const res = await fetch(
  //       `http://api.aladhan.com/v1/timingsByCity?city=${city.address.city}&country=${city.address.country}&method=13`
  //     )
  //     const data = await res.json()
  //     setVakti(data)
  //   } catch (e) {
  //     setError('Could not fetch Namaz Vakti')
  //     return [loading, error, vakti, city]
  //   } finally {
  //     setLoading(false)
  //     // setError(null)
  //   }
  // }

  // const fetchLocationData = async (location) => {
  //   try{
  //     const res1 = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.coords.latitude}&lon=${location.coords.longitude}`)
  //     const data2 = await res1.json()
  //     setCity(data2)
  //     await fetchNamazData(data2)
  //   } catch (e) {
  //     setError('Could not fetch Location Data')
  //     return [loading, error, vakti, city]
  //   }
  // }

  // useEffect(() => {
  //   ;(async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync()
  //     if (status !== 'granted') {
  //       setError('permission to access location was denied')
  //       setLoading(false)
  //       return
  //     }
  //     let location = await Location.getCurrentPositionAsync({})
  //     setLocation(location)
  //     await fetchLocationData(location)
  //   })()
  // }, [])

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setError('Permission to access location was denied')
        setLoading(false)
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)
      if (location) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
          )
          const data = await response.json()
          setAddress(data)
          if (data) {
            try {
              const response2 = await fetch(
                `http://api.aladhan.com/v1/timingsByCity?city=${data.address.city}&country=${data.address.country}&method=13`
              )
              const data2 = await response2.json()
              setVakti(data2)
            } catch (error) {
              setError('Failed to fetch namaz vakti')
            }
          }
        } catch (error) {
          setError('Failed to fetch address')
        }
      }
      setLoading(false)
    })()
  }, [])

  return [loading, error, address, vakti]
}
