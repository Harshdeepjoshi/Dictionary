import React from 'react';
import {Text, View} from 'react-native';

const Meaning = props => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: '100%',
        width: '95%',
        margin: 10,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
      }}>
      <Text style={{margin: 10}}>{props.meaning[0]}</Text>
    </View>
  );
};

export default Meaning;
