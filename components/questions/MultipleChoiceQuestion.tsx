// components/questions/MultipleChoiceQuestion.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useFormikContext } from 'formik';
import globalStyles from '../../styles/globalStyles';
import TextInputComponent from '../common/TextInput';

interface MultipleChoiceQuestionProps {
  questionIndex: number;
  arrayHelpers: any; // You can type this more strictly if desired
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  questionIndex,
  arrayHelpers,
}) => {
  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={globalStyles.title}>Multiple Choice Question</Text>
      <TextInputComponent
        placeholder="Question Text"
        value={values.questions[questionIndex].text}
        onChangeText={(text) =>
          setFieldValue(`questions.${questionIndex}.text`, text)
        }
      />
      {values.questions[questionIndex].options.map(
        (option: string, idx: number) => (
          <View key={idx} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInputComponent
              placeholder={`Option ${idx + 1}`}
              value={option}
              onChangeText={(text) =>
                setFieldValue(
                  `questions.${questionIndex}.options.${idx}`,
                  text
                )
              }
              style={{ flex: 1 }}
            />
            <Button
              title="Remove"
              onPress={() =>
                arrayHelpers.remove(idx)
              }
            />
          </View>
        )
      )}
      <Button title="Add Option" onPress={() => arrayHelpers.push('')} />
    </View>
  );
};

export default MultipleChoiceQuestion;
