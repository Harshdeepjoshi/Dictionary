import React from 'react';
import {Text, View} from 'react-native';

const Meaning = props => {
  const arr = ['a', 'b', 'c', 'd'];

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

      {props.meaning.map(mean => {
        return (
          <View style={{flexDirection: 'row'}}>
            <Text>- </Text>
            <Text style={{color: 'black'}}>{mean}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default Meaning;
