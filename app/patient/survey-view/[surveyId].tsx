// app/patient/survey-view/[surveyId].tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Button, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import globalStyles from '../../../styles/globalStyles';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Survey } from '../../../types';
import { getSurveyById, submitSurveyResponse } from '../../../api/surveys';

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

  // Initialize form values for each question
  const initialValues = survey.questions.reduce((acc: any, question) => {
    acc[question.id] = '';
    return acc;
  }, {});

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ handleChange, handleSubmit, values, setFieldValue }) => (
        <View style={globalStyles.container}>
          <Text style={globalStyles.title}>{survey.title}</Text>

          {/* Render each question directly based on its type */}
          {survey.questions.map((question) => (
            <View key={question.id} style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
                {question.text}
              </Text>

              {/* Render Short Answer TextInput */}
              {question.type === 'SHORT_ANSWER' && (
                <TextInput
                  style={{
                    borderColor: '#ddd',
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    backgroundColor: '#f9f9f9',
                  }}
                  placeholder="Type your answer here..."
                  value={values[question.id]}
                  onChangeText={handleChange(`${question.id}`)} // Update Formik value on text change
                />
              )}

              {/* Render Multiple Choice Options */}
              {question.type === 'MULTIPLE_CHOICE' && (
                <View>
                  {question.options?.map((option, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={{
                        padding: 10,
                        borderWidth: 1,
                        borderColor: values[question.id] === option ? '#2196F3' : '#ddd',
                        borderRadius: 5,
                        marginBottom: 10,
                        backgroundColor: values[question.id] === option ? '#e0f7fa' : '#f9f9f9',
                      }}
                      onPress={() => setFieldValue(`${question.id}`, option)}
                    >
                      <Text style={{ color: values[question.id] === option ? '#2196F3' : '#000' }}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Render Rating Scale */}
              {question.type === 'RATING_SCALE' && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <TouchableOpacity
                      key={rating}
                      style={{
                        padding: 10,
                        borderWidth: 1,
                        borderColor: values[question.id] === rating ? '#2196F3' : '#ddd',
                        borderRadius: 5,
                        width: 50,
                        alignItems: 'center',
                        backgroundColor: values[question.id] === rating ? '#e0f7fa' : '#f9f9f9',
                      }}
                      onPress={() => setFieldValue(`${question.id}`, rating)}
                    >
                      <Text style={{ color: values[question.id] === rating ? '#2196F3' : '#000' }}>
                        {rating}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}

          {/* Submit Button */}
          <Button title="Submit" onPress={() => handleSubmit()} />
        </View>
      )}
    </Formik>
  );
}
