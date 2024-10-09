// app/patient/survey-view/[surveyId].tsx
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, Button, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import globalStyles from '../../../styles/globalStyles';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSurveys } from '@/api/hooks/useSurvey';
import { useSurveyResponses } from '@/api/hooks/useSurveyResponses';

export default function SurveyViewScreen() {
  const router = useRouter();
  const { surveyId } = useLocalSearchParams<{ surveyId?: string }>();

  const { getSurveyById, currentSurvey, loading, setCurrentSurvey } = useSurveys(); // Use the surveys hook
  const { submitResponse, loading: submitting, error } = useSurveyResponses(); // Use the survey responses hook

  useEffect(() => {
    // Fetch the survey when the component mounts
    if (surveyId) {
      getSurveyById(Number(surveyId));
    }

    // Cleanup: Reset the current survey when leaving this component
    return () => setCurrentSurvey(null);
  }, [surveyId]);

  const handleSubmit = async (values: any) => {
    try {
      await submitResponse(Number(surveyId), {
        response: values, // Pass the Formik values as the response
      });
      alert('Survey submitted successfully!');
      router.back(); // Navigate back after submission
    } catch (err) {
      alert('Failed to submit survey: ' + (error || 'Unknown error occurred'));
    }
  };

  if (loading || !currentSurvey) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Initialize form values for each question
  const initialValues = currentSurvey.questions.reduce((acc: any, question) => {
    acc[question.questionId] = '';
    return acc;
  }, {});

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ handleChange, handleSubmit, values, setFieldValue }) => (
        <View style={globalStyles.container}>
          <Text style={globalStyles.title}>{currentSurvey.title}</Text>

          {/* Render each question based on its type */}
          {currentSurvey.questions.map((question) => {
            console.log(question)
            return (
            <View key={question.questionId} style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 10 }}>{question.questionText}</Text>

              {/* Render Short Answer TextInput */}
              {question.questionType === 'SHORT_ANSWER' && (
                <TextInput
                  style={{
                    borderColor: '#ddd',
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    backgroundColor: '#f9f9f9',
                  }}
                  placeholder="Type your answer here..."
                  value={values[question.questionId]}
                  onChangeText={handleChange(`${question.questionId}`)} // Update Formik value on text change
                />
              )}

              {/* Render Multiple Choice Options */}
              {question.questionType === 'MULTIPLE_CHOICE' && (
                <View>
                  {question.options?.map((option, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={{
                        padding: 10,
                        borderWidth: 1,
                        borderColor: values[question.questionId] === option ? '#2196F3' : '#ddd',
                        borderRadius: 5,
                        marginBottom: 10,
                        backgroundColor: values[question.questionId] === option ? '#e0f7fa' : '#f9f9f9',
                      }}
                      onPress={() => setFieldValue(`${question.questionId}`, option)}
                    >
                      <Text style={{ color: values[question.questionId] === option ? '#2196F3' : '#000' }}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Render Rating Scale */}
              {question.questionType === 'RATING_SCALE' && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <TouchableOpacity
                      key={rating}
                      style={{
                        padding: 10,
                        borderWidth: 1,
                        borderColor: values[question.questionId] === rating ? '#2196F3' : '#ddd',
                        borderRadius: 5,
                        width: 50,
                        alignItems: 'center',
                        backgroundColor: values[question.questionId] === rating ? '#e0f7fa' : '#f9f9f9',
                      }}
                      onPress={() => setFieldValue(`${question.questionId}`, rating)}
                    >
                      <Text style={{ color: values[question.questionId] === rating ? '#2196F3' : '#000' }}>
                        {rating}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )})}

          {/* Submit Button */}
          <Button title="Submit" onPress={()=>handleSubmit()} disabled={submitting} />
          {submitting && <ActivityIndicator size="small" />} {/* Show loader while submitting */}
        </View>
      )}
    </Formik>
  );
}
