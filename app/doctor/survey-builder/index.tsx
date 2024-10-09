// app/doctor/survey-builder/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Button, Text, ActivityIndicator, ScrollView } from 'react-native';
import { Formik, FieldArray } from 'formik';
import TextInputComponent from '../../../components/common/TextInput';
import MultipleChoiceQuestion from '../../../components/questions/MultipleChoiceQuestion';
import ShortAnswerQuestion from '../../../components/questions/ShortAnswerQuestion';
import RatingScaleQuestion from '@/components/questions/RatingScaleQuestion';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Survey } from '../../../types';
import { generateUniqueId } from '@/utils/helper';
import globalStyles from '@/styles/globalStyles';
import { useSurveys } from '@/api/hooks/useSurvey';

export default function SurveyBuilderScreen() {
  const router = useRouter();
  const { surveyId } = useLocalSearchParams<{ surveyId?: string }>();
  const { createSurvey, getSurveyById, currentSurvey, setCurrentSurvey, loading } = useSurveys(); // Destructure needed values and methods from the hook
  const [initialValues, setInitialValues] = useState<Survey | null>(null);
  const [isEditMode, setIsEditMode] = useState(true); // Control edit mode

  useEffect(() => {
    if (surveyId) {
      fetchSurvey(Number(surveyId));
    } else {
      setInitialValues({
        id: generateUniqueId(),
        title: '',
        questions: [],
      });
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
  };
  //useeffect to debug formik values
 
  const handleSubmit = async (values: Survey) => {
    try {
      if (surveyId) {
        setCurrentSurvey(values); // Directly update the current survey state in the hook
      } else {
        await createSurvey(values);
      }
      router.back();
    } finally {
      // Handle any additional logic post-submit if needed
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
      onSubmit={handleSubmit}
      enableReinitialize // Reinitialize form when initialValues change
    >
      {({ handleSubmit, values, errors, touched, setFieldValue }) => {

        return (
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
                    {question.questionType === 'MULTIPLE_CHOICE' ? (
                      <MultipleChoiceQuestion
                        questionIndex={index}
                        arrayHelpers={arrayHelpers}
                        isEditMode={isEditMode} // Pass isEditMode prop
                      />
                    ) : question.questionType === 'SHORT_ANSWER' ? (
                      <ShortAnswerQuestion
                        questionIndex={index}
                        isEditMode={isEditMode} // Pass isEditMode prop
                      />
                    ) : question.questionType === 'RATING_SCALE' ? (
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
                          questionType: 'MULTIPLE_CHOICE',
                          questionText: '',
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
                          questionType: 'SHORT_ANSWER',
                          questionText: '',
                          isRequired: false,
                        })
                      }
                    />
                    <Button
                      title="Add Rating Scale Question"
                      onPress={() =>
                        arrayHelpers.push({
                          id: generateUniqueId(),
                          questionType: 'RATING_SCALE',
                          questionText: '',
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
      )}}
    </Formik>
  );
}
