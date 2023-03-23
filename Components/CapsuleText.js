import React, {useState} from 'react';
import {View, Text} from 'react-native';

const CapsuleText = ({text}) => {
  return (
    <View
      style={{
        backgroundColor: '#00000040',
        borderRadius: 20,
        paddingHorizontal: 8,
        paddingVertical: 4,

        width: 'auto',
      }}>
      <Text
        style={{
          fontSize: 12,
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
        {text}
      </Text>
    </View>
  );
};

export default CapsuleText;
