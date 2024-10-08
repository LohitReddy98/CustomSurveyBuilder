// app/survey-builder/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Button, Text, ActivityIndicator } from 'react-native';
import { Formik, FieldArray } from 'formik';
import { surveyValidationSchema } from '../../../utils/validationSchema';
import TextInputComponent from '../../../components/common/TextInput';
import MultipleChoiceQuestion from '../../../components/questions/MultipleChoiceQuestion';
import ShortAnswerQuestion from '../../../components/questions/ShortAnswerQuestion';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Survey } from '../../../types';
import { getSurveyById, createSurvey, updateSurvey } from '../../../api/surveys';
import { generateUniqueId } from '@/utils/helper';
import globalStyles from '@/styles/globalStyles';

export default function SurveyBuilderScreen() {
  const router = useRouter();
  const { surveyId } = useLocalSearchParams<{ surveyId?: string }>();
  const [initialValues, setInitialValues] = useState<Survey | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (surveyId) {
      fetchSurvey(Number(surveyId));
    } else {
      setInitialValues({
        id: generateUniqueId(),
        title: '',
        questions: [],
      });
      setLoading(false);
    }
  }, [surveyId]);

  const fetchSurvey = async (id: number) => {
    const survey = await getSurveyById(id);
    if (survey) {
      setInitialValues(survey);
    } else {
      setInitialValues({
        id: generateUniqueId(),
        title: '',
        questions: [],
      });
    }
    setLoading(false);
  };

  const handleSubmit = async (values: Survey) => {
    if (surveyId) {
      await updateSurvey(values);
    } else {
      await createSurvey(values);
    }
    router.back();
  };

  if (loading || !initialValues) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={surveyValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, values, errors, touched, setFieldValue }) => (
        <View style={globalStyles.container}>
          <Text style={globalStyles.title}>Survey Builder</Text>
          <TextInputComponent
            placeholder="Survey Title"
            value={values.title}
            onChangeText={(text) => setFieldValue('title', text)}
          />
          {errors.title && touched.title && (
            <Text style={{ color: 'red' }}>{errors.title}</Text>
          )}
          <FieldArray
            name="questions"
            render={(arrayHelpers) => (
              <View>
                {values.questions.map((question, index) => {
                  switch (question.type) {
                    case 'MULTIPLE_CHOICE':
                      return (
                        <MultipleChoiceQuestion
                          key={index}
                          questionIndex={index}
                          arrayHelpers={arrayHelpers}
                        />
                      );
                    case 'SHORT_ANSWER':
                      return (
                        <ShortAnswerQuestion
                          key={index}
                          questionIndex={index}
                        />
                      );
                    default:
                      return null;
                  }
                })}
                <Button
                  title="Add Multiple Choice Question"
                  onPress={() =>
                    arrayHelpers.push({
                      id: generateUniqueId(),
                      type: 'MULTIPLE_CHOICE',
                      text: '',
                      options: [],
                      isRequired: false,
                    })
                  }
                />
                <Button
                  title="Add Short Answer Question"
                  onPress={() =>
                    arrayHelpers.push({
                      id: generateUniqueId(),
                      type: 'SHORT_ANSWER',
                      text: '',
                      isRequired: false,
                    })
                  }
                />
              </View>
            )}
          />
          <Button title="Save Survey" onPress={() => handleSubmit()} />
        </View>
      )}
    </Formik>
  );
}
