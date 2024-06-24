import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Group, Text } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StudentForm } from '../StudentForm';
import { useAddStudent } from '../../hooks/useAddStudent.hook';
import { BasicRequestResult } from '../../types/BasicRequestResult';
import { showNotification } from '../../utils/Notifications';
import { useAsyncEffect } from '../../hooks/useAsyncEffect.hook';
import { sleep } from '../../utils/sleep';
import { StudentSchemaType, StudentValidationSchema } from '../../validation-schemas/student';
import { settings } from '../../settings';

const AddNewStudentPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isValid: formValid },
  } = useForm<StudentSchemaType>({
    resolver: zodResolver(StudentValidationSchema),
    mode: 'onTouched',
  });

  const { result, proceed: addStudent } = useAddStudent();

  const navigate = useNavigate();

  useEffect(() => {
    if (result === BasicRequestResult.Ok) {
      showNotification({
        color: 'green',
        title: 'New student added',
        message: 'Student has been added to system and can now login and fill existing surveys.',
      });
    } else if (result === BasicRequestResult.Error) {
      showNotification({
        color: 'red',
        title: 'An error occurred',
        message: 'Unknown error occurred, check provided data and try again or contact administrator.',
      });
    }
  }, [result]);

  useAsyncEffect(async () => {
    if (result === BasicRequestResult.Ok) {
      await sleep(500);
      navigate(`${settings.browserBaseURL}/administration/students-list`);
    }
  }, [result]);

  // todo: submit button should be disabled if fields are not filled

  return (
    <Card withBorder shadow="md" maw={800} my={20} mx="auto">
      <Group gap={20} p={10}>
        <Text component="h2" size="lg">
          Add new student
        </Text>

        <StudentForm
          register={register}
          errors={formErrors}
          submit={handleSubmit(addStudent)}
          loading={result === BasicRequestResult.Loading}
          submitDisabled={[BasicRequestResult.Loading, BasicRequestResult.Ok].includes(result) || !formValid}
        />
      </Group>
    </Card>
  );
};

export { AddNewStudentPage };
