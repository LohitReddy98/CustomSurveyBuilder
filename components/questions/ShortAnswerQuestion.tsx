
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';
import globalStyles from '../../styles/globalStyles';
import TextInputComponent from '../common/TextInput';

interface ShortAnswerQuestionProps {
  questionIndex: number;
  isEditMode?: boolean; 
}

const ShortAnswerQuestion: React.FC<ShortAnswerQuestionProps> = ({
  questionIndex,
  isEditMode=true,
}) => {
  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <View style={styles.questionContainer}>
      {}
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

      {}
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
  },
  answerPlaceholderText: {
    fontSize: 16,
    color: '#aaa',
  },
});

export default ShortAnswerQuestion;
