import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Animated,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Import the useNavigation hook

const SearchBar = params => {
  const [openSearch, setOpenSearch] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0));
  const inputRef = useRef(null);
  const HandleTextChange = text => {
    params.setSearchWord(text);
  };
  const handlePress = () => {
    if (params.searchWord != '') {
      params.handleSearch();
      Keyboard.dismiss();
    }
  };

  const navigation = useNavigation(); // Get the navigation object

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: openSearch ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [openSearch]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0],
  });

  const navigateToAddWord = () => {
    navigation.navigate('AddWord'); // Navigate to AddWord screen
  };

  return (
    <View
      style={{
        height: 72,
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginTop: 13,
        flexDirection: 'row',
      }}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          height: 40,
          width: '90%',
          borderRadius: 20,
          marginRight: 5,
        }}>
        <View style={{padding: 12, justifyContent: 'center'}}>
          <Image
            source={require('../images/searchBlack.png')}
            style={{
              height: 16,
              width: 16,
              resizeMode: 'stretch',
              alignItems: 'center',
            }}
          />
        </View>
        <TextInput
          style={{flex: 1, width: '100%'}}
          placeholder="Search a word"
          onChangeText={HandleTextChange}
          ref={inputRef}
          onSubmitEditing={handlePress}
        />
        <TouchableOpacity
          onPress={handlePress}
          style={{
            paddingHorizontal: 10,
            borderBottomRightRadius: 20,
            borderTopRightRadius: 20,
            justifyContent: 'center',
            backgroundColor: '#03A9F4',
          }}>
          <Text
            style={{
              color: '#212121',
            }}>
            Search
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={navigateToAddWord}
        style={{
          backgroundColor: 'green',
          height: 38,
          width: 38,
          justifyContent: 'center',
          borderRadius: 30,
        }}>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={navigateToAddWord}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            +
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
