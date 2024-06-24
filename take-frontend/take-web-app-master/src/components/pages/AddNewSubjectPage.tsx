import { FC, useEffect } from 'react';
import { Card, Group, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubjectForm } from '../SubjectForm';
import { useAddSubject } from '../../hooks/useAddSubject.hook';
import { BasicRequestResult } from '../../types/BasicRequestResult';
import { useAsyncEffect } from '../../hooks/useAsyncEffect.hook';
import { sleep } from '../../utils/sleep';
import { showNotification } from '../../utils/Notifications';
import { SubjectSchemaType, SubjectValidationSchema } from '../../validation-schemas/subject';
import { settings } from '../../settings';

const AddNewSubjectPage: FC = () => {
  const { proceed: addSubject, result: addSubjectResult } = useAddSubject();

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isValid: formValid },
  } = useForm<SubjectSchemaType>({
    resolver: zodResolver(SubjectValidationSchema),
    mode: 'onTouched',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (addSubjectResult === BasicRequestResult.Error) {
      showNotification({
        color: 'red',
        title: 'An error occurred',
        message: 'Unknown error occurred, check provided data and try again or contact administrator.',
      });
    } else if (addSubjectResult === BasicRequestResult.Ok) {
      showNotification({
        color: 'green',
        title: 'New subject added',
        message: '',
      });
    }
  }, [addSubjectResult]);

  useAsyncEffect(async () => {
    if (addSubjectResult === BasicRequestResult.Ok) {
      await sleep(500);
      navigate(`${settings.browserBaseURL}/administration/subjects-list`);
    }
  }, [addSubjectResult]);

  return (
    <Card withBorder shadow="md" maw={800} my={20} mx="auto">
      <Group gap={20} p={10} display="flex" style={{ flexDirection: 'column', alignItems: 'start' }}>
        <Text component="h2" size="lg">
          Add new subject
        </Text>

        <Group maw={700}>
          <SubjectForm
            register={register}
            errors={formErrors}
            submit={handleSubmit(addSubject)}
            loading={addSubjectResult === BasicRequestResult.Loading}
            disableSubmit={[BasicRequestResult.Loading, BasicRequestResult.Ok].includes(addSubjectResult) || !formValid}
          />
        </Group>
      </Group>
    </Card>
  );
};

export { AddNewSubjectPage };
