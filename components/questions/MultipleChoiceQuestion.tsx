
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
  isEditMode?: boolean; 
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  questionIndex,
  arrayHelpers,
  isEditMode=true,
}) => {
  
  const { values, setFieldValue } = useFormikContext<{ questions: any[] }>();

  
  const handleAddOption = () => {
    const newOption = ''; 
    const options = values.questions[questionIndex].options || [];
    arrayHelpers.replace(questionIndex, {
      ...values.questions[questionIndex],
      options: [...options, newOption],
    });
  };

  
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
      <FieldArray
        name={`questions.${questionIndex}.options`}
        render={(optionArrayHelpers) => (
          <View>
            {values.questions[questionIndex].options.map((option, optionIndex) => (
              <View key={optionIndex} style={styles.optionContainer}>
                {}
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
                
                {}
                {isEditMode && (
                  <Button title="Remove" onPress={() => handleRemoveOption(optionIndex)} />
                )}
              </View>
            ))}
            {}
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
