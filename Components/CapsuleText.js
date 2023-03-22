import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

const CapsuleText = ({text}) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const widths = {
    Noun: 50,
    Verb: 47,
    Adjective: 71,
    Adverb: 61,
    Preposition: 83,
  };
  useEffect(() => {
    if (widths[text]) {
      setContainerWidth(widths[text]);
    }
  }, [text]);

  return (
    <View style={{width: containerWidth}}>
      <View
        style={{
          backgroundColor: '#00000040',
          borderRadius: 20,
          paddingHorizontal: 10,
          paddingVertical: 5,
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
    </View>
  );
};

export default CapsuleText;
