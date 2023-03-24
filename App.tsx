import React, {useState} from 'react';
import {Text, View} from 'react-native';
import HomeScreen from './Screens/HomeScreen';
const App = () => {
  const [DisplayData, SetDisplayData] = useState({
    word: 'Alaaden',
    LaxialCatagory: ['Preposition'],
    meaning: ['meaning', 'meaning', 'meaning'],
  });

  return (
    <View style={[{backgroundColor: '#4CAF50', height: '100%'}]}>
      <HomeScreen word={DisplayData} SetDisplayData={SetDisplayData} />
    </View>
  );
};

export default App;
