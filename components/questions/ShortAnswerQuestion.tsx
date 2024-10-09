// components/questions/ShortAnswerQuestion.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';
import globalStyles from '../../styles/globalStyles';
import TextInputComponent from '../common/TextInput';

interface ShortAnswerQuestionProps {
  questionIndex: number;
  isEditMode?: boolean; // New prop to control edit/view mode
}

const ShortAnswerQuestion: React.FC<ShortAnswerQuestionProps> = ({
  questionIndex,
  isEditMode=true,
}) => {
  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <View style={styles.questionContainer}>
      {/* Show TextInput for question text only in edit mode */}
      {isEditMode ? (
        <TextInputComponent
          placeholder="Question Text"
          value={values.questions[questionIndex].questionText}
          onChangeText={(text) => setFieldValue(`questions.${questionIndex}.questionText`, text)}
          style={styles.textInput}
        />
      ) : (
        <Text style={styles.questionText}>{values.questions[questionIndex].questionText}</Text>
      )}

      {/* Show a placeholder for the short answer when not in edit mode */}
      {!isEditMode && (
        <View style={styles.answerPlaceholderContainer}>
          <Text style={styles.answerPlaceholderText}>Short Answer Text</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  textInput: {
    marginBottom: 15,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  answerPlaceholderContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e9e9e9',
  },
  answerPlaceholderText: {
    fontSize: 16,
    color: '#aaa',
  },
});

export default ShortAnswerQuestion;
