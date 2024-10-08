// app/survey-builder/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Button, Text, ActivityIndicator, ScrollView } from 'react-native';
import { Formik, FieldArray } from 'formik';
import { surveyValidationSchema } from '../../../utils/validationSchema';
import TextInputComponent from '../../../components/common/TextInput';
import MultipleChoiceQuestion from '../../../components/questions/MultipleChoiceQuestion';
import ShortAnswerQuestion from '../../../components/questions/ShortAnswerQuestion';
import RatingScaleQuestion from '@/components/questions/RatingScaleQuestion';
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
  const [isEditMode, setIsEditMode] = useState(true); // Added to control edit mode

  useEffect(() => {
    if (surveyId) {
       // setIsEditMode(false); // If we're editing a survey, set edit mode to false
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
    setLoading(true);
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
    setLoading(true);
    try {
      if (surveyId) {
        await updateSurvey(values);
      } else {
        await createSurvey(values);
      }
      router.back();
    } finally {
      setLoading(false);
    }
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
      // validationSchema={surveyValidationSchema} // Uncomment to use validation schema
      onSubmit={handleSubmit}
      enableReinitialize // This prop will reinitialize the form when initialValues change
    >
      {({ handleSubmit, values, errors, touched, setFieldValue }) => (
        <ScrollView contentContainerStyle={globalStyles.container}>
          <Text style={globalStyles.title}>Survey Builder</Text>
          {/* Survey Title Input */}
          {isEditMode && ( // Only show the title input in edit mode
            <TextInputComponent
              placeholder="Survey Title"
              value={values.title}
              onChangeText={(text) => setFieldValue('title', text)}
            />
          )}
          {errors.title && touched.title && (
            <Text style={{ color: 'red', marginBottom: 10 }}>{errors.title}</Text>
          )}

          {/* Questions List */}
          <FieldArray
            name="questions"
            render={(arrayHelpers) => (
              <View>
                {values.questions.map((question, index) => (
                  <View key={`question-${index}`} style={{ marginBottom: 20 }}>
                    {/* Render the appropriate question type component with isEditMode prop */}
                    {question.type === 'MULTIPLE_CHOICE' ? (
                      <MultipleChoiceQuestion
                        questionIndex={index}
                        arrayHelpers={arrayHelpers}
                        isEditMode={isEditMode} // Pass isEditMode prop
                      />
                    ) : question.type === 'SHORT_ANSWER' ? (
                      <ShortAnswerQuestion
                        questionIndex={index}
                        isEditMode={isEditMode} // Pass isEditMode prop
                      />
                    ) : question.type === 'RATING_SCALE' ? (
                      <RatingScaleQuestion
                        key={`question-${index}`}
                        questionIndex={index}
                        isEditMode={isEditMode} // Pass isEditMode prop
                      />
                    ) : null}

                    {/* Remove Question Button - only show in edit mode */}
                    {isEditMode && (
                      <Button
                        title="Remove Question"
                        color="red"
                        onPress={() => arrayHelpers.remove(index)}
                      />
                    )}
                  </View>
                ))}

                {/* Buttons to Add Questions - only show in edit mode */}
                {isEditMode && (
                  <>
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
                    <Button
                      title="Add Rating Scale Question"
                      onPress={() =>
                        arrayHelpers.push({
                          id: generateUniqueId(),
                          type: 'RATING_SCALE',
                          text: '',
                          isRequired: false,
                        })
                      }
                    />
                  </>
                )}
              </View>
            )}
          />

          {/* Save Survey Button */}
          <Button title="Save Survey" onPress={() => handleSubmit()} />
        </ScrollView>
      )}
    </Formik>
  );
}
