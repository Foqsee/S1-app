import React from 'react';
import { View, StyleSheet } from 'react-native';

const CustomView = (props) => {
  return (
    <View
      {...props}
      style={[styles.view, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default CustomView;
