
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Text, Button } from 'react-native-paper';
import colors from '../styles/colors';
import { Survey } from '../types';

interface SurveyListItemProps {
  survey: Survey;
  onDelete: () => void;
  onAssign: () => void;
  onViewResponses: () => void;
}

const SurveyListItem: React.FC<SurveyListItemProps> = ({
  survey,
  onDelete,
  onAssign,
  onViewResponses,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{survey.title}</Text>
      <View style={styles.buttonsContainer}>
        <Button mode="outlined" onPress={onDelete} style={styles.button} labelStyle={{fontSize:Platform.OS === 'web'?14:10 ,padding:0}}>
          Delete
        </Button>
        <Button mode="outlined" onPress={onAssign} style={styles.button} labelStyle={{fontSize:Platform.OS === 'web'?14:10 ,padding:0}}>
          Assign
        </Button>
        <Button  mode="outlined" onPress={onViewResponses} style={styles.button} labelStyle={{fontSize:Platform.OS === 'web'?14:10 ,padding:0}}>
          
           Results
        </Button>
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
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 5,
    flex: 1,
    maxWidth: '30%',
    marginHorizontal: 5,
  },
});

export default SurveyListItem;
