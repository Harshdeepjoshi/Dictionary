import React, {useState} from 'react';
import {Text, View} from 'react-native';
import HomeScreen from './Screens/HomeScreen';
const App = () => {
  const [DisplayData, SetDisplayData] = useState({
    word: 'Alaaden',
    LaxialCatagory: 'Preposition',
    meaning: ['meaning'],
  });

  return (
    <View style={[{backgroundColor: '#00E9B2', height: '100%'}]}>
      <HomeScreen word={DisplayData} SetDisplayData={SetDisplayData} />
    </View>
  );
};

export default App;
