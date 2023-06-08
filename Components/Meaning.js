import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Meaning = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMeaning, setSelectedMeaning] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigation = useNavigation();
  // const [savedWord , setSavedWord]=useState(props.wor)
  const handleMeaningLongPress = (meaning, index) => {
    setSelectedMeaning(meaning);
    setSelectedIndex(index);
    setModalVisible(true);
  };
  const handleDeleteMeaning = async () => {
    
    // const { selectedIndex } = props;
    console.log("Meaning to delete is ",selectedMeaning)
    console.log("The wprd from props is ", props.word)
    const firstLetter = props.word.toLowerCase()[0];
    const index = Number(selectedMeaning.split('--%')[1])
    console.log("The index to be deleted is", index)
    let  storedArray = await AsyncStorage.getItem(firstLetter);
    console.log("Got the array ")
    storedArray = JSON.parse(storedArray)
    // const updatedArray= storedArray.slice(index,1)
    console.log("The index checked from stored data", storedArray[index])
    storedArray.splice(index,1)
      await AsyncStorage.setItem(firstLetter, JSON.stringify(storedArray));
    //   // props.setSearchWord("")
    props.handleSearch(props.word)
    console.log("Done search")
    setModalVisible(false);
  };
  

  const handleEditMeaning = () => {
    const { selectedMeaning, selectedIndex } = props;
    navigation.navigate('EditMeaning', {
      selectedMeaning: selectedMeaning,
      selectedIndex: selectedIndex,
    });
    setModalVisible(false);
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        margin: 16,
        marginBottom: 0,
        marginTop: 0,
        borderRadius: 16,
        minHeight: 150,
        maxHeight: '69%',
        padding: 10,
      }}>
      <Text style={{ color: '#757575' }}>Means:</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {props.meaning.map((mean, index) => {
          const backgroundColor = index % 2 === 0 ? 'white' : '#F0F0F0';
          return (
            <TouchableOpacity
              key={index}
              onLongPress={() => handleMeaningLongPress(mean, index)}
              style={{
                flexDirection: 'row',
                backgroundColor,
                paddingHorizontal: 8,
                paddingVertical: 4,
              }}>
              <Text>- </Text>
              <Text style={{ color: 'black' }}>{mean}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Modal visible={modalVisible} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => handleDeleteMeaning()}>
              <Text style={styles.modalOption}>Delete Meaning</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEditMeaning}>
              <Text style={styles.modalOption}>Edit Meaning</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalOption}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: '80%',
  },
  modalOption: {
    fontSize: 18,
    marginVertical: 8,
    color: 'black',
  },
});
Meaning.propTypes = {
  meaning: PropTypes.array.isRequired, // Array of meanings to display
  onDeleteMeaning: PropTypes.func.isRequired, // Function to handle delete meaning option
  onEditMeaning: PropTypes.func.isRequired, // Function to handle edit meaning option
};

export default Meaning;
