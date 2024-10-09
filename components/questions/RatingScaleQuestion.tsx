
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';
import globalStyles from '../../styles/globalStyles';
import TextInputComponent from '../common/TextInput';

interface RatingScaleQuestionProps {
  questionIndex: number;
  isEditMode?: boolean; 
}

const RATING_OPTIONS = [1, 2, 3, 4, 5]; 

const RatingScaleQuestion: React.FC<RatingScaleQuestionProps> = ({ questionIndex, isEditMode=true }) => {
  const { values, setFieldValue } = useFormikContext<any>();

  const handleRatingSelect = (rating: number) => {
    setFieldValue(`questions.${questionIndex}.rating`, rating);
  };

  return (
    <View style={styles.container}>
      {isEditMode ? (
        
        <TextInputComponent
          placeholder="Enter your question here"
          value={values.questions[questionIndex].questionText}
          onChangeText={(text) => setFieldValue(`questions.${questionIndex}.questionText`, text)}
          style={styles.textInput}
        />
      ) : (
        
        <Text style={styles.questionText}>{values.questions[questionIndex].questionText}</Text>
      )}

      {}
      {!isEditMode && (
        <View style={styles.ratingContainer}>
          {RATING_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.ratingOption,
                values.questions[questionIndex].rating === option && styles.selectedRatingOption,
              ]}
              onPress={() => handleRatingSelect(option)}
            >
              <Text style={styles.ratingText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingOption: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  selectedRatingOption: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  ratingText: {
    fontSize: 18,
    color: '#000',
  },
});

export default RatingScaleQuestion;
