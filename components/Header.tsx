
import { getToken, removeToken, setToken } from '@/utils/tokenService';
import { useRouter, usePathname } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Header = () => {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const router = useRouter(); 
  const pathname = usePathname(); 

  useEffect(() => {
    if (pathname === '/') {
      setIsSignedIn(false); 
    } else {
      setIsSignedIn(true); 
    }
  }, [pathname]);

  
  const handleAuth = () => {
    if (isSignedIn) {
      
      removeToken();
      router.push('/');
    } 
  };

  const handleNavigation = () => {
    if (pathname.includes('doctor')) {
      router.push('/doctor');
    } else {
      router.push('/patient');
    }
  };

  return (
    <View style={styles.header}>
      {}
      <TouchableOpacity onPress={handleNavigation}>
        <Text style={styles.title}>Aidar</Text>
      </TouchableOpacity>
      {}
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
    height: 80,
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
    marginLeft: 'auto',
  },
  authButtonText: {
    color: '#000', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Header;
