import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import AddWord from './Screens/AddWord';
import EditMeaning from './Screens/EditMeaning';
const Stack = createStackNavigator();

const NavigationStack = props => {
  const MainHomeScreen = () => {
    return (
      <HomeScreen
        word={props.DisplayData}
        SetDisplayData={props.SetDisplayData}
      />
    );
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Set headerShown to false to hide the header bar
      }}>
      <Stack.Screen name="Home" component={MainHomeScreen} />
      <Stack.Screen name="AddWord" component={AddWord} />
      <Stack.Screen
        name="EditMeaning"
        component={EditMeaning}
        options={({route}) => ({
          props: {
            selectedMeaning: route.params.selectedMeaning,
            selectedIndex: route.params.selectedIndex,
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default NavigationStack;
