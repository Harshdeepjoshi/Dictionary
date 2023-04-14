import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const EditMeaning = ({navigation, route}) => {
  const [errorMessage, setErrorMessage] = useState(''); // Add error message state variable
  const selectedMeaning = route.params.selectedMeaning;
  const selectedIndex = route.params.selectedIndex;

  const [meaning, serMeaning] = useState(selectedMeaning);

  // Handle back button press
  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  // Handle submit button press
  const handleSubmitButtonPress = () => {
    // Implement submit button functionality here
  };

  // Handle delete button press
  const handleDeleteButtonPress = () => {
    // Implement delete button functionality here
  };

  return (
    <View style={{padding: 10, height: '100%', backgroundColor: '#4CAF50'}}>
      {/* Back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBackButtonPress}>
        <Text style={styles.backButtonText}>{'< Back'}</Text>
      </TouchableOpacity>
      <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
        <TextInput
          style={styles.meaningInput}
          value={meaning}
          placeholder="Meaning"
          onChangeText={text => {
            serMeaning(text);
            //   handleInputChange();
          }} // Call handleInputChange on onChangeText
          multiline={true} // Allow multiple lines in input
          // numberOfLines={4} // Set initial number of lines to 4
        />
      </View>

      {/* Submit Button */}
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitButtonPress}>
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
    alignSelf: 'flex-start',
    width: '18%',
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    padding: 170,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    paddingHorizontal: 4,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    alignSelf: 'center',
  },
  DeleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    margin: 5,
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
  meaningContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // marginBottom: 10,
  },
  meaningInput: {
    backgroundColor: 'white',
    flex: 1,
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

export default EditMeaning;
