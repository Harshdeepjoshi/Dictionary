import React, {useState} from 'react';
import {View, Text} from 'react-native';

const CapsuleText = props => {
  console.log(props.text);
  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
      {props.text.map(text => {
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
      })}
    </View>
  );
};

export default CapsuleText;
