
import * as Yup from 'yup';

export const surveyValidationSchema = Yup.object().shape({
  title: Yup.string().required('Survey title is required'),
  questions: Yup.array()
    .of(
      Yup.object().shape({
        text: Yup.string().required('Question text is required'),
        type: Yup.string().required('Question type is required'),
        isRequired: Yup.boolean(),
        options: Yup.array().when('type', {
          is: 'MULTIPLE_CHOICE',
          then: Yup.array()
            .of(Yup.string().required('Option text is required'))
            .min(1, 'At least one option is required'),
        }),
      })
    )
    .min(1, 'At least one question is required'),
});
