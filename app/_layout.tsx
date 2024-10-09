
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Slot />
      </View>
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingBottom: 70,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60, 
    backgroundColor: 'transparent',
  },
});
