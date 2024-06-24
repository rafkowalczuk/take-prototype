import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { Card, Group, Text } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StudentForm } from '../StudentForm';
import { useGetStudent } from '../../hooks/useGetStudent.hook';
import { useAsyncEffect } from '../../hooks/useAsyncEffect.hook';
import { SubpageError } from '../SubpageError';
import { BasicRequestResult } from '../../types/BasicRequestResult';
import { SubpageLoader } from '../SubpageLoader';
import { useEditStudent } from '../../hooks/useEditStudent.hook';
import { showNotification } from '../../utils/Notifications';
import { sleep } from '../../utils/sleep';
import { StudentSchemaType, StudentValidationSchema } from '../../validation-schemas/student';

const EditStudentDataPage: FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors: formErrors, isValid: formValid },
  } = useForm<StudentSchemaType>({ resolver: zodResolver(StudentValidationSchema), mode: 'onTouched' });

  const { id } = useParams();

  const { get: getStudent, result: getStudentResult } = useGetStudent();

  const { proceed: editStudent, result: editStudentResult } = useEditStudent();

  useAsyncEffect(async () => {
    const student = await getStudent(id!);

    if (student) {
      setValue('firstName', student.firstName);
      setValue('lastName', student.lastName);
      setValue('email', student.email);
    }
  }, []);

  const submit = async (data: StudentSchemaType) => {
    await editStudent(id!, data);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (editStudentResult === BasicRequestResult.Error) {
      showNotification({
        color: 'red',
        title: 'An error occurred',
        message: 'Unknown error occurred, check your data and try again or contact administrator.',
      });
    } else if (editStudentResult === BasicRequestResult.Ok) {
      showNotification({
        color: 'green',
        title: 'Success',
        message: "Student's profile successfully updated",
      });
    }
  }, [editStudentResult]);

  useAsyncEffect(async () => {
    if (editStudentResult === BasicRequestResult.Ok) {
      await sleep(500);
      navigate('/administration/students-list');
    }
  }, [editStudentResult]);

  if (getStudentResult === BasicRequestResult.Error) {
    return (
      <SubpageError text="An error occurred while loading student data. Try again later or contact administrator." />
    );
  } else if (getStudentResult === BasicRequestResult.Loading || getStudentResult === BasicRequestResult.Idle) {
    return <SubpageLoader />;
  }

  return (
    <Card withBorder shadow="md" maw={800} my={20} mx="auto">
      <Group gap={20} p={10}>
        <Text component="h2" size="lg">
          Edit student profile
        </Text>

        <StudentForm
          register={register}
          errors={formErrors}
          submit={handleSubmit(submit)}
          loading={editStudentResult === BasicRequestResult.Loading}
          submitDisabled={[BasicRequestResult.Loading, BasicRequestResult.Ok].includes(editStudentResult) || !formValid}
        />
      </Group>
    </Card>
  );
};

export { EditStudentDataPage };
