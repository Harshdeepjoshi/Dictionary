import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native'; // Import Modal from react-native
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import {useNavigation} from '@react-navigation/native'; // Import the useNavigation hook

const Meaning = props => {
  const [modalVisible, setModalVisible] = useState(false); // State to control the visibility of the modal
  const [selectedMeaning, setSelectedMeaning] = useState(''); // State to keep track of selected meaning
  const [selectedIndex, setSelectedIndex] = useState(-1); // State to keep track of selected index
  const navigation = useNavigation(); // Get the navigation object

  // Function to handle long press on a meaning
  const handleMeaningLongPress = (meaning, index) => {
    setSelectedMeaning(meaning); // Set the selected meaning
    setSelectedIndex(index); // Set the selected index
    setModalVisible(true); // Set the modal visible
  };

  // Function to handle delete meaning option
  const handleDeleteMeaning = () => {
    props.onDeleteMeaning(); // Call the onDeleteMeaning prop which should be passed from parent component
    setModalVisible(false); // Close the modal
  };

  // Function to handle edit meaning option
  const handleEditMeaning = () => {
    navigation.navigate('EditMeaning', {
      selectedMeaning: selectedMeaning, // Pass the selected meaning as prop
      selectedIndex: selectedIndex, // Pass the selected index as prop
    }); // Navigate to AddWord screen
    // (selectedMeaning, selectedIndex); // Pass the selected meaning and its index
    setModalVisible(false); // Close the modal
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
      <Text style={{color: '#757575'}}>Means:</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {props.meaning.map((mean, index) => {
          const backgroundColor = index % 2 === 0 ? 'white' : '#F0F0F0';
          return (
            <TouchableOpacity
              key={index}
              onLongPress={() => handleMeaningLongPress(mean, index)} // Handle long press on a meaning
              style={{
                flexDirection: 'row',
                backgroundColor,
                paddingHorizontal: 8,
                paddingVertical: 4,
              }}>
              <Text>- </Text>
              <Text style={{color: 'black'}}>{mean}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Modal for delete/edit meaning options */}
      <Modal visible={modalVisible} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={handleDeleteMeaning}>
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
