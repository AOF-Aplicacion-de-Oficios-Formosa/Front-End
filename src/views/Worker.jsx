import React from 'react'
import { View, Text } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

const Worker = () => {
  return (
    <View style={styles.container}>
      <Text>Worker</Text>
    </View>
  )
}

const styles = ScaledSheet.create({
    container: {
        backgroundColor: 'rgba(2,96,182,1)'
    }
})

export default Worker;