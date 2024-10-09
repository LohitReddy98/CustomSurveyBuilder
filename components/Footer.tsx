// components/Footer.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>© 2024 Aidar. All rights reserved.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: 60,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Footer;
