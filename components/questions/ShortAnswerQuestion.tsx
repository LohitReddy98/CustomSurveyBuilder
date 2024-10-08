// components/questions/ShortAnswerQuestion.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useFormikContext } from 'formik';
import globalStyles from '../../styles/globalStyles';
import TextInputComponent from '../common/TextInput';

interface ShortAnswerQuestionProps {
  questionIndex: number;
}

const ShortAnswerQuestion: React.FC<ShortAnswerQuestionProps> = ({
  questionIndex,
}) => {
  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={globalStyles.title}>Short Answer Question</Text>
      <TextInputComponent
        placeholder="Question Text"
        value={values.questions[questionIndex].text}
        onChangeText={(text) =>
          setFieldValue(`questions.${questionIndex}.text`, text)
        }
      />
    </View>
  );
};

export default ShortAnswerQuestion;
