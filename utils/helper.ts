
import { Alert, Platform } from 'react-native';

export const generateUniqueId = (): number => {
    return Date.now() + Math.floor(Math.random() * 1000);
  };
  

  // Utility function for cross-platform alert
  export const showAlert = (title:string, message:string, onConfirm = () => {}) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}\n\n${message}`);
      onConfirm();
    } else {
      Alert.alert(
        title,
        message,
      );
    }
  };
  