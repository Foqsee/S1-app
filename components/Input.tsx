import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const Input = (props) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    input: {
      padding: 8,
      backgroundColor: theme === 'dark' ? '#333' : '#ccc',
      borderColor: theme === 'dark' ? '#444' : '#ddd',
      borderWidth: 1,
      borderRadius: 4,
      color: theme === 'dark' ? '#fff' : '#000',
    },
  });

  return (
    <TextInput
      {...props}
      style={[styles.input, props.style]}
      placeholderTextColor={theme === 'dark' ? '#999' : '#666'}
      selectionColor={theme === 'dark' ? '#fff' : '#000'}
    />
  );
};

export default Input;
