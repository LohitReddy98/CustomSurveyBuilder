// components/questions/MultipleChoiceQuestion.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { FieldArray, useFormikContext } from 'formik';
import globalStyles from '../../styles/globalStyles';
import TextInputComponent from '../common/TextInput';

interface MultipleChoiceQuestionProps {
  questionIndex: number;
  arrayHelpers: {
    push: (obj: any) => void;
    remove: (index: number) => void;
    replace: (index: number, value: any) => void;
  };
  isEditMode?: boolean; // Add prop to control edit/view mode
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  questionIndex,
  arrayHelpers,
  isEditMode=true,
}) => {
  
  const { values, setFieldValue } = useFormikContext<{ questions: any[] }>();

  // Handle adding a new option
  const handleAddOption = () => {
    const newOption = ''; // New empty option
    const options = values.questions[questionIndex].options || [];
    arrayHelpers.replace(questionIndex, {
      ...values.questions[questionIndex],
      options: [...options, newOption],
    });
  };

  // Handle removing an option
  const handleRemoveOption = (optionIndex: number) => {
    const options = values.questions[questionIndex].options || [];
    if (options.length > 1) {
      const updatedOptions = options.filter((_, idx) => idx !== optionIndex);
      arrayHelpers.replace(questionIndex, {
        ...values.questions[questionIndex],
        options: updatedOptions,
      });
    }
  };

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

      {/* Options List */}
      <FieldArray
        name={`questions.${questionIndex}.options`}
        render={(optionArrayHelpers) => (
          <View>
            {values.questions[questionIndex].options.map((option, optionIndex) => (
              <View key={optionIndex} style={styles.optionContainer}>
                {/* Option Text Input */}
                {isEditMode ? (
                  <TextInputComponent
                    placeholder={`Option ${optionIndex + 1}`}
                    value={option}
                    onChangeText={(text) =>
                      setFieldValue(`questions.${questionIndex}.options.${optionIndex}`, text)
                    }
                    style={styles.optionInput}
                  />
                ) : (
                  <Text style={styles.optionText}>{option}</Text>
                )}
                
                {/* Remove Option Button - only visible in edit mode */}
                {isEditMode && (
                  <Button title="Remove" onPress={() => handleRemoveOption(optionIndex)} />
                )}
              </View>
            ))}
            {/* Add Option Button - only visible in edit mode */}
            {isEditMode && (
              <Button title="Add Option" onPress={handleAddOption} />
            )}
          </View>
        )}
      />
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
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionInput: {
    flex: 1,
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#000',
    flex: 1,
    marginRight: 10,
  },
});

export default MultipleChoiceQuestion;
