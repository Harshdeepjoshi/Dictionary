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
        flexDirection: 'row',
        height: '8%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: 'white',
          flex: 1,
          marginLeft: 25,
          justifyContent: 'center',
        }}>
        AWSOME
      </Text>
      <TouchableOpacity onPress={handlePress}>
        <View style={{textAlign: 'right', flexDirection: 'row'}}>
          <Text
            style={{
              color: 'white',
              paddingRight: 10,
              fontWeight: 'bold',
              fontSize: 12,
            }}>
            SEARCH
          </Text>
          <Image
            source={require('../images/search.png')}
            style={{
              height: 12,
              width: 12,
              resizeMode: 'stretch',
              alignItems: 'center',
              marginRight: 25,
              marginTop: 2.5,
            }}
          />
        </View>
      </TouchableOpacity>
      <Animated.View
        style={{
          transform: [{translateX}],
          position: 'absolute',
          top: '20%',
          width: '100%',
          height: 40,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          paddingHorizontal: 10,
        }}>
        <TextInput
          style={{flex: 1}}
          placeholder="Search"
          onChangeText={HandleTextChange}
          ref={inputRef}
          onSubmitEditing={handlePress}
        />
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={require('../images/searchBlack.png')}
            style={{
              height: 20,
              width: 20,
              marginTop: 5,
              resizeMode: 'stretch',
              alignItems: 'center',
            }}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default SearchBar;
