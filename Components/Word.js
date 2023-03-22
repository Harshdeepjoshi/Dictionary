import React, {useState, useEffect} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import CapsuleText from './CapsuleText';
import Tts from 'react-native-tts';

const Word = params => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speak = () => {
    setIsSpeaking(true);
    Tts.setDefaultPitch(1.5);
    Tts.setDefaultRate(0.5);
    Tts.setDefaultVoice('com.apple.ttsbundle.Samantha-compact');
    Tts.speak(params.word);
  };

  useEffect(() => {
    const startListener = Tts.addEventListener('tts-start', () => {
      setIsSpeaking(true);
    });
    const finishListener = Tts.addEventListener('tts-finish', () => {
      setIsSpeaking(false);
    });
    return () => {
      startListener.remove();
      finishListener.remove();
    };
  }, []);

  return (
    <View style={{marginLeft: 25}}>
      <Text style={{fontSize: 60, color: 'white'}}>{params.word}</Text>
      <View style={{flexDirection: 'row', marginTop: 8}}>
        <CapsuleText text={params.LaxialCatagory} />
        <TouchableOpacity onPress={speak} disabled={isSpeaking}>
          <Image
            source={require('../images/speaker.png')}
            style={{
              height: 25,
              width: 25,
              marginLeft: 30,
              resizeMode: 'stretch',
              alignItems: 'center',
              marginRight: 25,
              opacity: isSpeaking ? 0.2 : 0.5,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Word;
