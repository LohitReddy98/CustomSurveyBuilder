import React from 'react';
import { TextInput as RNTextInput, StyleSheet, TextInputProps } from 'react-native';
import colors from '../../styles/colors';

const TextInput: React.FC<TextInputProps> = ({ style, ...rest }) => {
  return <RNTextInput style={[styles.input, style]} {...rest} />;
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.placeholder,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    color: colors.text,
  },
});

export default TextInput;
