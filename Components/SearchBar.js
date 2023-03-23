import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Animated,
  Keyboard,
} from 'react-native';

const SearchBar = params => {
  const [openSearch, setOpenSearch] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0));
  const inputRef = useRef(null);
  const HandleTextChange = text => {
    params.setSearchWord(text);
  };
  const handlePress = () => {
    setOpenSearch(!openSearch);
    if (openSearch === true && params.searchWord != '') {
      params.handleSearch();
      Keyboard.dismiss();
    } else {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.clear(); // clear input field
      }
    }
  };

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

  return (
    <View
      style={{
        height: 72,
        justifyContent: 'center',
        paddingHorizontal: 16,
      }}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          height: 40,
          borderRadius: 20,
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
      </View>
    </View>
  );
};

export default SearchBar;
