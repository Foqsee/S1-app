import React from 'react';
import { Button, StyleSheet } from 'react-native';

const CustomButton = (props) => {
  return (
    <Button
      {...props}
      color={props.color || styles.button.color}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    color: '#0ea5e9',
  },
});

export default CustomButton;
