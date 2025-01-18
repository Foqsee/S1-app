import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const CustomTextInput = (props) => {
  return (
    <TextInput
      {...props}
      style={[styles.input, props.style]}
      placeholderTextColor="#999"
      selectionColor="#000"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    color: '#000',
  },
});

export default CustomTextInput;
