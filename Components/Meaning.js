import React from 'react';
import {Text, View} from 'react-native';

const Meaning = props => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        margin: 16,
        marginTop: 0,
        borderRadius: 16,
        minHeight: 150,
        padding: 10,
      }}>
      <Text style={{color: '#757575'}}>Means:</Text>
      <Text style={{color: 'black'}}>- {props.meaning[0]}</Text>
    </View>
  );
};

export default Meaning;
