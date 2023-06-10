import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import LaxCatogries from '../Components/LaxCatogries.js';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AddWord = () => {
  const [word, setWord] = useState('');
  const [meanings, setMeanings] = useState(['']); // Using an array to store multiple meanings
  const [category, setCategory] = useState('');
  const [partOfSpeech, setPartOfSpeech] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Add error message state variable
  const navigation = useNavigation();
  const handleAddWord = () => {
    // Check if the word value contains spaces
    if (word.includes(' ')) {
      setErrorMessage('Error: Word should not contain spaces.'); // Set error message
      return; // Return early and do not proceed further
    }

    console.log(
      `Added word: ${word} with meanings "${meanings}" and category "${category}"`,
    );
  };

  const storeData = async meaning => {
    console.log(meaning);
    console.log('storeData Called');
    let retrievedData = [];
    try {
      const value = await AsyncStorage.getItem('addedMeanings');
      if (value !== null) {
        console.log('Got Value');
        console.log(value);
        retrievedData = JSON.parse(value);
        // console.log(retrievedData.length);
      }
    } catch (error) {
      console.log('Error while getting data from AsyncStorage: ' + error);
    }
    // console.log(retrievedData.length);
    let foundMeaning = false;
    console.log('Start');

    for (let i = 0; i < retrievedData.length; i++) {
      if (retrievedData[i].word === meaning.word) {
        foundMeaning = true;
        console.log('retrievedData[i].meanings', retrievedData[i].meanings);

        for (let j = 0; j < meaning.meanings.length; j++) {
          retrievedData[i].meanings.push(meaning.meanings[j]);
        }
      }
    }
    console.log('Doneee');
    if (!foundMeaning) {
      retrievedData.push(meaning);
    }
    console.log('Finalizing string');
    const finalString = JSON.stringify(retrievedData);
    console.log('finalString', finalString);
    try {
      await AsyncStorage.setItem('addedMeanings', finalString);
    } catch (error) {
      console.log('Error while saving data to AsyncStorage: ' + error);
    }
  };

  const retrieveData = async () => {
    console.log('retrieveData Called');
    let retrievedData = [];
    try {
      const value = await AsyncStorage.getItem('addedMeanings');
      if (value !== null) {
        console.log('Got Value');
        retrievedData = JSON.parse(value);
      }
    } catch (error) {
      console.log('Error while getting data from AsyncStorage: ' + error);
    }
    return retrievedData;
  };

  const handleAddMeaning = () => {
    const lastMeaning = meanings[meanings.length - 1];
    if (lastMeaning !== '') {
      setMeanings([...meanings, '']); // Adding a new empty meaning to the array
    }
  };

  const handleSubmit = event => {
    console.log('Handle submit called');
    event.preventDefault();
    const errors = [];

    if (word === '') {
      errors.push('Word is required.');
    }

    if (word.includes(' ')) {
      errors.push('Word should not contain spaces.');
    }

    // Check if any meaning is empty
    const emptyMeaningIndex = meanings.findIndex(meaning => meaning === '');
    if (emptyMeaningIndex !== -1) {
      errors.push('All meanings should be filled.');
    }

    // Display all errors at once
    if (errors.length > 0) {
      setErrorMessage(`❗Error: ${errors.join('\n❗Error: ')}`);
      return;
    }

    // Form data is valid, proceed with submitting
    setErrorMessage('');

    // storeData({
    //   word: word,
    //   meanings: meanings,
    // });
    const formattedMeanings = meanings.map(meaning => {
      if (meaning) {
        return `${word} (${partOfSpeech}) ${meaning}`;
      } else {
        return '';
      }
    });

    const filteredMeanings = formattedMeanings.filter(
      meaning => meaning !== '',
    );
    // console.log(meanings);
    const formattedMeaningsString = filteredMeanings.join(', ');

    console.log(formattedMeaningsString);
  };

  // Reset error message when the input changes
  const handleInputChange = () => {
    setErrorMessage('');
  };

  const handleMeaningChange = (index, meaning) => {
    const updatedMeanings = [...meanings];
    updatedMeanings[index] = meaning; // Updating the meaning at the given index
    setMeanings(updatedMeanings);
  };
  const handleRemoveMeaning = index => {
    if (meanings.length > 1) {
      // Check if there are more than one meanings
      const updatedMeanings = [...meanings];
      updatedMeanings.splice(index, 1); // Removing the meaning at the given index
      setMeanings(updatedMeanings);
    }
  };

  return (
    <View style={{backgroundColor: '#4CAF50', height: '100%'}}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled" // Add keyboardShouldPersistTaps prop
      >
        {/* Back button */}
        <View
          style={{
            borderRadius: 20,
            backgroundColor: '#e0e0e0',
            width: '17%',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={styles.backButtonText}>{'< Back'}</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          value={word}
          placeholder="Word"
          onChangeText={text => {
            setWord(text);
            handleInputChange();
          }} // Call handleInputChange on onChangeText
        />

        <LaxCatogries setPartOfSpeech={setPartOfSpeech} />

        {/* Render meanings */}
        {meanings.map((meaning, index) => (
          <View style={styles.meaningContainer} key={index}>
            <TextInput
              style={styles.meaningInput}
              placeholder={`Meaning ${index + 1}`}
              value={meaning}
              onChangeText={text => handleMeaningChange(index, text)}
              multiline={true}
            />
            {/* Remove meaning button */}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleRemoveMeaning(index)}>
              <Text style={styles.deleteButtonText}>-</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={{flexDirection: 'row-reverse', alignSelf: 'flex-end'}}>
          {/* Add meaning button */}
          <TouchableOpacity style={styles.addButton} onPress={handleAddMeaning}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={meanings.length === 0} // Disable the button when no meanings are entered
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>

        {/* Render error message */}
        {errorMessage !== '' && (
          <View
            style={{
              backgroundColor: 'white',
              marginTop: 5,
              padding: 10,
              paddingTop: 0,
              borderRadius: 6,
            }}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 20,
  },
  backButton: {
    // marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    paddingHorizontal: 4,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    width: 40,
    height: 40,
    marginLeft: 10,
    // marginRight: ,
  },
  addButtonText: {
    fontSize: 20,
    color: '#fff',
  },
  deleteButton: {
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  deleteButtonText: {
    fontSize: 20,
    color: 'red',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    width: '85%',
    borderRadius: 5,
  },
  meaningContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  meaningInput: {
    backgroundColor: 'white',
    flex: 1,
    marginRight: 10,
    marginBottom: 10,
    minHeight: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'black',
    fontSize: 16,
    lineHeight: 25,
    marginTop: 10,
  },
});

export default AddWord;
