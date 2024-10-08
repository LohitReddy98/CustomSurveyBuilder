// app/patient/survey-view/[surveyId].tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import globalStyles from '../../../styles/globalStyles';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Survey } from '../../../types';
import { getSurveyById, submitSurveyResponse } from '../../../api/surveys';
import TextInputComponent from '../../../components/common/TextInput';

export default function SurveyViewScreen() {
  const router = useRouter();
  const { surveyId, patientId } = useLocalSearchParams<{ surveyId?: string; patientId?: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchSurvey();
  }, [surveyId]);
  

  const fetchSurvey = async () => {
    const data = await getSurveyById(Number(surveyId));
    setSurvey(data || null);
    setLoading(false);
  };

  const handleSubmit = async (values: any) => {
    await submitSurveyResponse(Number(surveyId), Number(patientId), values);
    alert('Survey submitted successfully!');
    router.back();
  };


  if (loading || !survey) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const initialValues = survey.questions.reduce((acc: any, question) => {
    acc[question.id] = '';
    return acc;
  }, {});

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ handleChange, handleSubmit, values }) => (
        <View style={globalStyles.container}>
          <Text style={globalStyles.title}>{survey.title}</Text>
          {survey.questions.map((question) => (
            <View key={question.id} style={{ marginBottom: 20 }}>
              <Text>{question.text}</Text>
              {question.type === 'SHORT_ANSWER' && (
                <TextInputComponent
                  value={values[question.id]}
                  onChangeText={handleChange(`${question.id}`)}
                />
              )}
              {question.type === 'MULTIPLE_CHOICE' && (
                <>
                  {question.options.map((option, idx) => (
                    <TouchableOpacity
                      key={idx}
                      onPress={() => handleChange(`${question.id}`)(option)}
                      style={{ padding: 10 }}
                    >
                      <Text>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </>
              )}
            </View>
          ))}
          <Button title="Submit" onPress={() => handleSubmit()} />
        </View>
      )}
    </Formik>
  );
}
