import React from 'react'
import { GestureResponderEvent, Pressable, Text } from 'react-native'
export interface Props {
  title: string;
  onPress: (event: GestureResponderEvent) => void
  
}

export const CustomButton = ({ title, onPress }: Props) => {
  return (
    <Pressable
      style={{
        borderRadius: 10,
        height: 40,
        
        backgroundColor: '#a3a3a3ff',
        marginVertical: 10,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onPress={onPress}
    >
      <Text>{title}</Text>
    </Pressable>
  )
}
