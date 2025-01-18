import React from 'react';
import { Picker as RNPicker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const Picker = ({ selectedValue, onValueChange, style, dropdownIconColor, children }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    picker: {
      padding: 8,
      backgroundColor: theme === 'dark' ? '#333' : '#ccc',
      borderColor: theme === 'dark' ? '#444' : '#ddd',
      borderWidth: 1,
      borderRadius: 4,
      color: theme === 'dark' ? '#fff' : '#000',
    },
  });

  return (
    <RNPicker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={[styles.picker, style]}
      dropdownIconColor={dropdownIconColor}
    >
      {children}
    </RNPicker>
  );
};

export default Picker;
