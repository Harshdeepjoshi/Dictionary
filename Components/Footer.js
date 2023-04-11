import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Footer = ({handlePress}) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.button}>Long Button</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#0f0',
    borderRadius: 10,
    color: '#fff',
    fontSize: 16,
  },
});
export default Footer;
