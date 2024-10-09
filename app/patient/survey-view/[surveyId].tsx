import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, Button, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import globalStyles from '../../../styles/globalStyles';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSurveys } from '@/api/hooks/useSurvey';
import { useSurveyResponses } from '@/api/hooks/useSurveyResponses';
import { showAlert } from '@/utils/helper';

export default function SurveyViewScreen() {
  const router = useRouter();
  const { surveyId } = useLocalSearchParams<{ surveyId?: string }>();

  const { getSurveyById, currentSurvey, loading, setCurrentSurvey } = useSurveys(); 
  const { submitResponse, loading: submitting, error } = useSurveyResponses(); 

  useEffect(() => {
    if (surveyId) {
      getSurveyById(Number(surveyId));
    }
    return () => setCurrentSurvey(null);
  }, [surveyId]);

  const validationSchema = Yup.object().shape(
    currentSurvey?.questions.reduce((schema, question) => {
      if (question.isRequired) {
        schema[question.questionId] = Yup.string()
          .required('This question is required');
      }
      return schema;
    }, {})
  );

  const handleSubmit = async (values: any) => {
    try {
      await submitResponse(Number(surveyId), {
        response: values, 
      });
      showAlert('Success', 'Survey submitted successfully!');
      router.back(); 
    } catch (err) {
      showAlert('Failed to submit survey', error || 'Unknown error occurred');
    }
  };

  if (loading || !currentSurvey) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const initialValues = currentSurvey.questions.reduce((acc: any, question) => {
    acc[question.questionId] = '';
    return acc;
  }, {});

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
        <View style={globalStyles.container}>
          <Text style={globalStyles.title}>{currentSurvey.title}</Text>

          {currentSurvey.questions.map((question) => (
            <View key={question.questionId} style={styles.questionContainer}>
              <Text style={styles.questionText}>
                {question.questionText}
                {question.isRequired && <Text style={styles.requiredMark}> *</Text>}
              </Text>

              {question.questionType === 'SHORT_ANSWER' && (
                <>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Type your answer here..."
                    value={values[question.questionId]}
                    onChangeText={handleChange(`${question.questionId}`)}
                  />
                  {errors[question.questionId] && (
                    <Text style={styles.errorText}>{errors[question.questionId]}</Text>
                  )}
                </>
              )}

              {question.questionType === 'MULTIPLE_CHOICE' && (
                <View>
                  {question.options?.map((option, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={[
                        styles.option,
                        values[question.questionId] === option && styles.selectedOption,
                      ]}
                      onPress={() => setFieldValue(`${question.questionId}`, option)}
                    >
                      <Text style={{ color: values[question.questionId] === option ? '#2196F3' : '#000' }}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  {errors[question.questionId] && (
                    <Text style={styles.errorText}>{errors[question.questionId]}</Text>
                  )}
                </View>
              )}

              {question.questionType === 'RATING_SCALE' && (
                <View style={styles.ratingContainer}>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <TouchableOpacity
                      key={rating}
                      style={[
                        styles.rating,
                        values[question.questionId] === rating && styles.selectedRating,
                      ]}
                      onPress={() => setFieldValue(`${question.questionId}`, rating)}
                    >
                      <Text style={{ color: values[question.questionId] === rating ? '#2196F3' : '#000' }}>
                        {rating}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  {errors[question.questionId] && (
                    <Text style={styles.errorText}>{errors[question.questionId]}</Text>
                  )}
                </View>
              )}
            </View>
          ))}

          <Button title="Submit" onPress={handleSubmit} disabled={submitting} />
          {submitting && <ActivityIndicator size="small" />} 
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  requiredMark: {
    color: 'red',
  },
  textInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  selectedOption: {
    borderColor: '#2196F3',
    backgroundColor: '#e0f7fa',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rating: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width: 50,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  selectedRating: {
    borderColor: '#2196F3',
    backgroundColor: '#e0f7fa',
  },
});
