import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const LaxCatogries = props => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {id: 1, label: 'Noun'},
    {id: 2, label: 'Verb'},
    {id: 3, label: 'Adjective'},
    {id: 4, label: 'Adjective'},
  ];

  const handleCategorySelect = category => {
    setSelectedCategory(category);
    props.setPartOfSpeech(category.label);
  };

  return (
    <View style={styles.container}>
      {categories.map(category => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryContainer,
            selectedCategory && selectedCategory.id === category.id
              ? styles.selectedCategory
              : null,
          ]}
          onPress={() => handleCategorySelect(category)}>
          <Text
            style={[
              styles.categoryLabel,
              selectedCategory && selectedCategory.id === category.id
                ? styles.selectedCategoryLabel
                : null,
            ]}>
            {category.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  categoryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 4,
  },
  selectedCategory: {
    backgroundColor: 'blue', // Change to desired color for selected category
  },
  categoryLabel: {
    color: 'black',
  },
  selectedCategoryLabel: {
    color: 'white', // Change to desired color for selected category label
  },
});

export default LaxCatogries;
