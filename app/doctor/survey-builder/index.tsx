import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { Formik, FieldArray } from 'formik';
import { Button, TextInput, Text, Divider, Checkbox } from 'react-native-paper';
import * as Yup from 'yup';
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
  const { createSurvey, getSurveyById, setCurrentSurvey, loading } = useSurveys();
  const [initialValues, setInitialValues] = useState<Survey | null>(null);
  const [isEditMode] = useState(true); 

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

  const handleSubmit = async (values: Survey) => {
    try {
      if (surveyId) {
        setCurrentSurvey(values);
      } else {
        await createSurvey(values);
      }
      router.back();
    } finally {
      
    }
  };

  if (loading || !initialValues) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  
  const getQuestionSchema = (questionType:any) => {
    switch (questionType) {
      case 'MULTIPLE_CHOICE':
        return Yup.object().shape({
          questionText: Yup.string().required('Question text is required'),
          options: Yup.array()
            .of(
              Yup.string().required('Each option must have text')
            )
            .min(1, 'Multiple choice questions must have at least one option')
            .required('Options are required for multiple choice questions'),
        });
      case 'SHORT_ANSWER':
        return Yup.object().shape({
          questionText: Yup.string().required('Question text is required'),
        });
      case 'RATING_SCALE':
        return Yup.object().shape({
          questionText: Yup.string().required('Question text is required'),
        });
      default:
        return Yup.object().shape({
          questionText: Yup.string().required('Question text is required'),
        });
    }
  };
  
  
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Survey title is required'),
    questions: Yup.array().of(
      Yup.lazy((question) =>
        getQuestionSchema(question?.questionType || 'SHORT_ANSWER')
      )
    ).min(1, 'Survey must have at least one question'),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false} 
    >
      {({ handleSubmit, values, errors, touched, setFieldValue }) => (
        <ScrollView contentContainerStyle={[globalStyles.container, styles.container]}>
          <Text style={styles.title}>Survey Builder</Text>

          {isEditMode && (
            <TextInput
              label="Survey Title"
              value={values.title}
              onChangeText={(text) => setFieldValue('title', text)}
              mode="outlined"
              style={styles.textInput}
            />
          )}
          {errors.title && touched.title && (
            <Text style={styles.errorText}>{errors.title}</Text>
          )}

          <FieldArray
            name="questions"
            render={(arrayHelpers) => (
              <View>
                {values.questions.map((question, index) => (
                  <View key={`question-${index}`} style={styles.questionContainer}>
                    {}
                    {question.questionType === 'MULTIPLE_CHOICE' ? (
                      <MultipleChoiceQuestion
                        questionIndex={index}
                        arrayHelpers={arrayHelpers}
                        isEditMode={isEditMode}
                      />
                    ) : question.questionType === 'SHORT_ANSWER' ? (
                      <ShortAnswerQuestion
                        questionIndex={index}
                        isEditMode={isEditMode}
                      />
                    ) : question.questionType === 'RATING_SCALE' ? (
                      <RatingScaleQuestion
                        questionIndex={index}
                        isEditMode={isEditMode}
                      />
                    ) : null}

                    {errors.questions?.[index]?.questionText && touched.questions?.[index]?.questionText && (
                      <Text style={styles.errorText}>{errors.questions[index].questionText}</Text>
                    )}

                    {}
                    {question.questionType === 'MULTIPLE_CHOICE' && errors.questions?.[index]?.options && (
                      <Text style={styles.errorText}>{errors.questions[index].options}</Text>
                    )}

                    {}
                    {isEditMode && (
                      <View style={styles.requiredCheckboxContainer}>
                        <Checkbox
                          status={question.isRequired ? 'checked' : 'unchecked'}
                          onPress={() => setFieldValue(`questions.${index}.isRequired`, !question.isRequired)}
                        />
                        <Text>Required</Text>
                      </View>
                    )}

                    {isEditMode && (
                      <Button
                        mode="text"
                        onPress={() => arrayHelpers.remove(index)}
                        color="red"
                        style={styles.removeButton}
                      >
                        Remove Question
                      </Button>
                    )}
                    <Divider style={styles.divider} />
                  </View>
                ))}

                {isEditMode && (
                  <View style={styles.addButtonContainer}>
                    <Button
                      mode="outlined"
                      onPress={() =>
                        arrayHelpers.push({
                          id: generateUniqueId(),
                          questionType: 'MULTIPLE_CHOICE',
                          questionText: '',
                          options: [],
                          isRequired: false,
                        })
                      }
                      style={styles.addButton}
                    >
                      Add Multiple Choice Question
                    </Button>
                    <Button
                      mode="outlined"
                      onPress={() =>
                        arrayHelpers.push({
                          id: generateUniqueId(),
                          questionType: 'SHORT_ANSWER',
                          questionText: '',
                          isRequired: false,
                        })
                      }
                      style={styles.addButton}
                    >
                      Add Short Answer Question
                    </Button>
                    <Button
                      mode="outlined"
                      onPress={() =>
                        arrayHelpers.push({
                          id: generateUniqueId(),
                          questionType: 'RATING_SCALE',
                          questionText: '',
                          isRequired: false,
                        })
                      }
                      style={styles.addButton}
                    >
                      Add Rating Scale Question
                    </Button>
                  </View>
                )}
              </View>
            )}
          />

          <Button
            mode="contained"
            onPress={() => handleSubmit()}
            style={styles.saveButton}
          >
            Save Survey
          </Button>
        </ScrollView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  textInput: {
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  questionContainer: {
    marginBottom: 20,
  },
  removeButton: {
    alignSelf: 'flex-end',
    marginTop: -10,
  },
  divider: {
    marginVertical: 10,
  },
  addButtonContainer: {
    marginVertical: 20,
  },
  addButton: {
    marginVertical: 5,
  },
  saveButton: {
    marginTop: 20,
  },
  requiredCheckboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
});

