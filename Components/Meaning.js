import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
const Meaning = props => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        margin: 16,
        marginBottom: 0,
        marginTop: 0,
        borderRadius: 16,
        minHeight: 150,
        maxHeight: '64%',
        padding: 10,
      }}>
      <Text style={{color: '#757575'}}>Means:</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {props.meaning.map((mean, index) => {
          const backgroundColor = index % 2 === 0 ? 'white' : '#F0F0F0';
          return (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                backgroundColor,
                paddingHorizontal: 8,
                paddingVertical: 4,
              }}>
              <Text>- </Text>
              <Text style={{color: 'black'}}>{mean}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
});
export default Meaning;
