import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Button} from 'react-native';
const DictionaryPage = () => {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [category, setCategory] = useState('');

  const handleAddWord = () => {
    console.log(
      `Added word: ${word} with meaning "${meaning}" and category "${category}"`,
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Word:</Text>
      <TextInput
        style={styles.input}
        value={word}
        onChangeText={setWord}
        placeholder="Word"
      />

      <Text style={styles.label}>Meaning:</Text>
      <TextInput
        style={styles.input}
        placeholder="Meaning "
        value={meaning}
        onChangeText={setMeaning}
      />

      <Text style={styles.label}>Category:</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
        <Picker.Item label="Noun" value="noun" />
        <Picker.Item label="Verb" value="verb" />
        <Picker.Item label="Adjective" value="adjective" />
        <Picker.Item label="Adverb" value="adverb" />
      </Picker>

      <Button title="Add Word" onPress={handleAddWord} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});

export default DictionaryPage;
