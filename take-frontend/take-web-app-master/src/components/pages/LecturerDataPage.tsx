import { FC, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Badge, Button, Card, Divider, Flex, Loader, Text } from '@mantine/core';
import { Lecturer } from '../../model/existing-objects/Lecturer';
import { InitialsAvatar } from '../InitialsAvatar';
import { useGetLecturer } from '../../hooks/useGetLecturer.hook';
import { useAsyncEffect } from '../../hooks/useAsyncEffect.hook';
import { BasicRequestResult } from '../../types/BasicRequestResult';
import { SubpageLoader } from '../SubpageLoader';
import { SubpageError } from '../SubpageError';
import { settings } from '../../settings';

const LecturerDataPage: FC = () => {
  const [lecturer, setLecturer] = useState<Lecturer | null>(null);

  const { id } = useParams();

  const { result: getLecturerResult, get: getLecturer } = useGetLecturer();

  useAsyncEffect(async () => {
    const loadedLecturer = await getLecturer(id!);

    if (loadedLecturer) {
      setLecturer(loadedLecturer);
    }
  }, []);

  if (getLecturerResult === BasicRequestResult.Loading) {
    return <SubpageLoader />;
  }

  if (lecturer === null) {
    return <SubpageError text="An error occurred" />;
  }

  return (
    <Flex direction="column" px={10} py={20} maw={1200} mx="auto">
      <Flex justify="space-between" align="center">
        <Text component="h2" size="xl">
          Lecturer
        </Text>

        <Button component={Link} to={`${settings.browserBaseURL}/administration/edit-lecturer-data/${id}`}>
          Edit profile
        </Button>
      </Flex>

      <Divider my={12} />

      <Card withBorder maw={1200} shadow="md">
        <Flex align="center" gap={20}>
          <InitialsAvatar {...lecturer} />

          <Flex direction="column" align="start">
            <Text>
              {lecturer.firstName} {lecturer.lastName}
            </Text>
            <Text size="xs">{lecturer.email}</Text>

            <Flex mt={7} wrap="wrap" justify="start" gap={8}>
              {lecturer.subjects.length === 0 && (
                <Badge color="red" fw={400}>
                  no subjects
                </Badge>
              )}

              {lecturer.subjects.map((subject) => (
                <Badge fw={400} key={subject}>
                  {subject}
                </Badge>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};

export { LecturerDataPage };
