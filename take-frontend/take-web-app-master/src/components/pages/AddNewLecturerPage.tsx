import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Blockquote, Card, Flex, Group, Loader, Space, Text } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Subject } from '../../model/existing-objects/Subject';
import { LecturerForm } from '../LecturerForm';
import { useGetSubjects } from '../../hooks/useGetSubjects.hook';
import { SubpageError } from '../SubpageError';
import { useAddLecturer } from '../../hooks/useAddLecturer.hook';
import { BasicRequestResult } from '../../types/BasicRequestResult';
import { showNotification } from '../../utils/Notifications';
import { useAsyncEffect } from '../../hooks/useAsyncEffect.hook';
import { sleep } from '../../utils/sleep';
import { LecturerSchemaType, LecturerValidationSchema } from '../../validation-schemas/lecturer';
import { settings } from '../../settings';

const AddNewLecturerPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isValid: formValid },
  } = useForm<LecturerSchemaType>({
    resolver: zodResolver(LecturerValidationSchema),
    mode: 'onTouched',
  });

  const [subjectIds, setSubjectIds] = useState<string[]>([]);

  const { subjects, error: getSubjectsError } = useGetSubjects();

  const { proceed: addLecturer, result: addLecturerResult } = useAddLecturer();

  const navigate = useNavigate();

  const submit = async (data: LecturerSchemaType) => {
    await addLecturer({
      ...data,
      subjectIds: subjectIds.map((id) => Number.parseInt(id, 10)),
    });
  };

  useEffect(() => {
    if (addLecturerResult === BasicRequestResult.Error) {
      showNotification({
        color: 'red',
        title: 'An error occurred',
        message: 'Unknown error occurred, check provided data and try again or contact administrator.',
      });
    } else if (addLecturerResult === BasicRequestResult.Ok) {
      showNotification({
        color: 'green',
        title: 'New lecturer added',
        message: 'Lecturer has been added to system and students can now rank him/her.',
      });
    }
  }, [addLecturerResult]);

  useAsyncEffect(async () => {
    if (addLecturerResult === BasicRequestResult.Ok) {
      await sleep(500);
      navigate(`${settings.browserBaseURL}/administration/lecturers-list`);
    }
  }, [addLecturerResult]);

  if (getSubjectsError) {
    return <SubpageError text="Error while loading subject list. Contact administrator." />;
  }

  if (subjects === null) {
    return (
      <Flex mih={200} w="100%" align="center" direction="column" justify="center">
        <Loader size="lg" />
        <Space h={20} />
        <Text>Loading subject list</Text>
      </Flex>
    );
  }

  return (
    <Card withBorder shadow="md" maw={800} my={20} mx="auto">
      <Group gap={20} p={10}>
        <Text component="h2" size="lg">
          Add new Lecturer
        </Text>
        <Blockquote p={10}>
          <Text size="xs">
            Adding new lecturer will cause new set of questions within new survey to be created for this lecturer. This
            is automatic and cannot be disabled.
          </Text>
        </Blockquote>

        <Group maw={700}>
          <LecturerForm
            register={register}
            errors={formErrors}
            setSubjectIds={setSubjectIds}
            subjectIds={subjectIds}
            submit={handleSubmit(submit)}
            subjects={subjects as Subject[]}
            loading={addLecturerResult === BasicRequestResult.Loading}
            disableSubmit={[BasicRequestResult.Ok, BasicRequestResult.Loading].includes(addLecturerResult)}
          />
        </Group>
      </Group>
    </Card>
  );
};

export { AddNewLecturerPage };
