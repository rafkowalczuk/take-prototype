import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { Blockquote, Card, Flex, Group, Loader, Space, Text } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Subject } from '../../model/existing-objects/Subject';
import { Lecturer } from '../../model/existing-objects/Lecturer';
import { LecturerForm } from '../LecturerForm';
import { useGetSubjects } from '../../hooks/useGetSubjects.hook';
import { useGetLecturer } from '../../hooks/useGetLecturer.hook';
import { useAsyncEffect } from '../../hooks/useAsyncEffect.hook';
import { BasicRequestResult } from '../../types/BasicRequestResult';
import { SubpageError } from '../SubpageError';
import { useEditLecturer } from '../../hooks/useEditLecturer.hook';
import { sleep } from '../../utils/sleep';
import { showNotification } from '../../utils/Notifications';
import { LecturerSchemaType, LecturerValidationSchema } from '../../validation-schemas/lecturer';
import { settings } from '../../settings';

const EditLecturerDataPage: FC = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors: formErrors, isValid: formValid },
  } = useForm<LecturerSchemaType>({
    resolver: zodResolver(LecturerValidationSchema),
    mode: 'onTouched',
  });

  const [subjectIds, setSubjectIds] = useState<string[] | null>(null);

  const { id } = useParams();

  const { subjects, error: getSubjectsError } = useGetSubjects();
  const { get: getLecturer, result: getLecturerResult } = useGetLecturer();

  const [lecturer, setLecturer] = useState<Lecturer | null>(null);

  const { proceed: editLecturer, result: editLecturerResult } = useEditLecturer();

  const navigate = useNavigate();

  useAsyncEffect(async () => {
    const lecturerData = await getLecturer(id!);

    if (lecturerData) {
      setLecturer(lecturerData);
    }
  }, []);

  useEffect(() => {
    if (subjects !== null && lecturer !== null) {
      setValue('firstName', lecturer.firstName);
      setValue('lastName', lecturer.lastName);
      setValue('email', lecturer.email);
      setSubjectIds(
        lecturer.subjects.map((name) => (subjects.find((sub) => sub.name === name) as Subject).id.toString()),
      );
    }
  }, [subjects, lecturer]);

  const submit = async (data: LecturerSchemaType) => {
    if (subjectIds === null) {
      return;
    }

    await editLecturer(id!, {
      ...data,
      subjectIds: subjectIds.map((id) => Number.parseInt(id, 10)),
    });
  };

  useEffect(() => {
    if (editLecturerResult === BasicRequestResult.Error) {
      showNotification({
        color: 'red',
        title: 'An error occurred',
        message: 'Unknown error occurred, check your data and try again or contact administrator.',
      });
    } else if (editLecturerResult === BasicRequestResult.Ok) {
      showNotification({
        color: 'green',
        title: 'Success',
        message: "Lecturer's profile successfully updated",
      });
    }
  }, [editLecturerResult]);

  useAsyncEffect(async () => {
    if (editLecturerResult === BasicRequestResult.Ok) {
      await sleep(500);
      navigate(`${settings.browserBaseURL}/administration/lecturer-profile/${id}`);
    }
  }, [editLecturerResult]);

  if (getSubjectsError || getLecturerResult === BasicRequestResult.Error) {
    return <SubpageError text="An error occurred while loading data. Try again later or contact administrator." />;
  }

  if (subjects === null || subjectIds === null || lecturer === null) {
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
          Edit lecturer profile
        </Text>
        <Blockquote p={10}>
          <Text size="xs">
            Editing lecturer data does modify data immediately. If new subject are selected, additional surveys will be
            created. Existing surveys are not deleted even if subject is removed from the list.
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
            disableSubmit={[BasicRequestResult.Ok, BasicRequestResult.Loading].includes(editLecturerResult)}
            loading={editLecturerResult === BasicRequestResult.Loading}
          />
        </Group>
      </Group>
    </Card>
  );
};

export { EditLecturerDataPage };
