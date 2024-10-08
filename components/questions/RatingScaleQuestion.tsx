// components/questions/RatingScaleQuestion.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';
import globalStyles from '../../styles/globalStyles';
import TextInputComponent from '../common/TextInput';

interface RatingScaleQuestionProps {
  questionIndex: number;
  isEditMode: boolean; // New prop to determine if we're in edit mode
}

const RATING_OPTIONS = [1, 2, 3, 4, 5]; // Define the rating scale options

const RatingScaleQuestion: React.FC<RatingScaleQuestionProps> = ({ questionIndex, isEditMode }) => {
  const { values, setFieldValue } = useFormikContext<any>();

  const handleRatingSelect = (rating: number) => {
    setFieldValue(`questions.${questionIndex}.rating`, rating);
  };

  return (
    <View style={styles.container}>
      {isEditMode ? (
        // Editable Text Input for Question Text in Edit Mode
        <TextInputComponent
          placeholder="Enter your question here"
          value={values.questions[questionIndex].text}
          onChangeText={(text) => setFieldValue(`questions.${questionIndex}.text`, text)}
          style={styles.textInput}
        />
      ) : (
        // Display Question Text when filling out the survey
        <Text style={styles.questionText}>{values.questions[questionIndex].text}</Text>
      )}

      {/* Render rating options only in view mode */}
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
    backgroundColor: '#f9f9f9',
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
