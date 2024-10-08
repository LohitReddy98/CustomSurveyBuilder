// components/SurveyListItem.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import colors from '../styles/colors';
import { Survey } from '../types';

interface SurveyListItemProps {
  survey: Survey;
  onEdit: () => void;
  onDelete: () => void;
  onAssign: () => void;
  onViewResponses: () => void;
}

const SurveyListItem: React.FC<SurveyListItemProps> = ({
  survey,
  onEdit,
  onDelete,
  onAssign,
  onViewResponses,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{survey.title}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={onEdit} style={styles.button}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.button}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onAssign} style={styles.button}>
          <Text style={styles.buttonText}>Assign</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onViewResponses} style={styles.button}>
          <Text style={styles.buttonText}>View Responses</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 1,
  },
  title: {
    fontSize: 18,
    color: colors.text,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  button: {
    marginRight: 10,
    marginTop: 5,
  },
  buttonText: {
    color: colors.primary,
  },
});

export default SurveyListItem;
