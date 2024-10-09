// components/Header.tsx
import { getToken, removeToken, setToken } from '@/utils/tokenService';
import { useRouter, usePathname } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Header = () => {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const router = useRouter(); // Get the router instance from expo-router
  const pathname = usePathname(); // Get the current path from expo-router

  // Update sign-in state based on the current route
  useEffect(() => {
    if (pathname === '/') {
      setIsSignedIn(false); // Hide "Sign Out" if the route is '/'
    } else {
      setIsSignedIn(true); // Show "Sign Out" for other routes
    }
  }, [pathname]);

  // Handle Sign In/Sign Out action
  const handleAuth = () => {
    if (isSignedIn) {
      // If the user is signed in, remove the token and redirect to '/'
      removeToken();
      router.push('/');
    } 
  };

  return (
    <View style={styles.header}>
      {/* Company Name */}
      <Text style={styles.title}>Aidar</Text>

      {/* Conditionally render Sign In/Sign Out button */}
      {isSignedIn && (
        <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
          <Text style={styles.authButtonText}>Sign Out</Text>
        </TouchableOpacity>
    )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingTop: 20,
    paddingHorizontal: 15,
    backgroundColor: '#6200ee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  authButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  authButtonText: {
    color: '#000', // Black text color for the button
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Header;
