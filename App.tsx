import React, {useState} from 'react';
import {Text, View, StatusBar} from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import EditMeaning from './Screens/EditMeaning';
import AddWord from './Screens/AddWord';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import NavigationStack from './NavigationStack';
const Stack = createStackNavigator();

const App = () => {
  const [DisplayData, SetDisplayData] = useState({
    word: 'Alaaden',
    LaxialCatagory: ['Preposition'],
    meaning: ['meaning', 'meaning', 'meaning'],
  });

  return (
    <View style={{backgroundColor: '#4CAF50', height: '100%'}}>
      <NavigationContainer>
        <NavigationStack
          DisplayData={DisplayData}
          SetDisplayData={SetDisplayData}
        />
      </NavigationContainer>
    </View>
  );
};

export default App;
