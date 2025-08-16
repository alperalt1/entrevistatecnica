import React from 'react'
import { Text, TextInput, View } from 'react-native'

export interface Props {
  title: string;
  onchange: ((text: string) => void) | undefined;
  value?: string;
}
export const CustomInput = ({ title, onchange, value }: Props) => {
  return (
    <View
      style={{
        borderRadius: 10
      }}
    >
      <Text
        style={{
          marginHorizontal: 10
        }}
      >{title}</Text>
      <TextInput
        value={value}
        style={{
          borderRadius: 10,
          height: 40,
          backgroundColor: '#828080ff',
          marginVertical: 10,
          marginHorizontal: 10
        }}
        onChangeText={onchange}
      >
      </TextInput>
    </View >
  )
}
