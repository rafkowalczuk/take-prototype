import { Button, Flex, TextInput } from '@mantine/core';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jsSubmit } from '../utils/js-submit';
import { Student } from '../model/existing-objects/Student';
import { request } from '../utils/request';
import { StudentLoginSchemaType, StudentLoginValidationSchema } from '../validation-schemas/student-login';
import { showNotification } from '../utils/Notifications';

type StudentLoginFormProps = {
  onSuccess: (student: Student) => void;
  onFailure: (error: Error) => void;
};

const StudentLoginForm: FC<StudentLoginFormProps> = ({ onSuccess, onFailure }) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isValid: formValid },
  } = useForm<StudentLoginSchemaType>({
    resolver: zodResolver(StudentLoginValidationSchema),
    mode: 'onTouched',
  });

  const submit = async (data: StudentLoginSchemaType) => {
    try {
      const response = await request.get(`students/email/${encodeURIComponent(data.email)}`, {
        validateStatus: () => true,
      });

      switch (response.status) {
        case 200:
          onSuccess(response.data);

          break;
        case 404:
          showNotification({
            color: 'red',
            title: 'Invalid e-mail',
            message: 'Account with this e-mail address not found.',
          });
          break;
        case 405:
          onFailure(new Error('E-mail must be provided.'));
          break;
        default: {
          onFailure(new Error('Unknown error occurred.'));
          showNotification({
            color: 'red',
            title: 'An error occurred',
            message: 'Unknown error occurred.',
          });
        }
      }
    } catch (err) {
      onFailure(new Error('Network error, check your internet connection.'));
      showNotification({
        color: 'red',
        title: 'Network or server error',
        message: 'Check your internet connection or contact administrator.',
      });
    }
  };

  return (
    <Flex direction="column" gap={20}>
      <TextInput maw={400} {...register('email')} error={formErrors.email?.message} label="E-mail" />

      <Button maw={240} disabled={!formValid} color="blue" radius="md" onClick={jsSubmit(handleSubmit(submit))}>
        Login
      </Button>
    </Flex>
  );
};

export { StudentLoginForm };
export type { StudentLoginFormProps };
