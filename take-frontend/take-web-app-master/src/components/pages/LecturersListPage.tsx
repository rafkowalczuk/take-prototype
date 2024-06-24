import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Divider, Flex, Group, Text } from '@mantine/core';
import { Lecturer } from '../../model/existing-objects/Lecturer';
import { InitialsAvatar } from '../InitialsAvatar';
import { useGetLecturers } from '../../hooks/useGetLecturers.hook';
import { SubpageError } from '../SubpageError';
import { SubpageLoader } from '../SubpageLoader';
import { useDeleteLecturer } from '../../hooks/useDeleteLecturer.hook';
import { BasicRequestResult } from '../../types/BasicRequestResult';
import { showNotification } from '../../utils/Notifications';
import { settings } from '../../settings';

const LecturersListPage: FC = () => {
  const { lecturers, error, updateList } = useGetLecturers();

  const [deleteEmail, setDeleteEmail] = useState<string | null>(null);

  const { proceed: deleteLecturer, result } = useDeleteLecturer();

  const handleDelete = async (email: string) => {
    setDeleteEmail(email);
    await deleteLecturer(email);
  };

  useEffect(() => {
    if (result === BasicRequestResult.Error) {
      showNotification({
        color: 'red',
        title: 'An error occurred',
        message: 'Lecturer cannot be deleted for unknown reason, try again later or contact administrator.',
      });
    } else if (result === BasicRequestResult.Ok) {
      if (lecturers) {
        updateList(lecturers.filter((l) => l.email !== deleteEmail));
      }

      showNotification({
        color: 'green',
        title: 'Lecturer deleted',
        message: 'Lecturer has been successfully deleted and list has been updated.',
      });
    }
  }, [result]);

  if (error) {
    return <SubpageError text="An error occurred" />;
  }

  if (lecturers === null) {
    return <SubpageLoader />;
  }

  return (
    <Flex direction="column" px={10} py={20} maw={1200} mx="auto">
      <Flex justify="space-between" align="center">
        <Text component="h2" size="xl">
          Lecturers
        </Text>

        <Button component={Link} to={`${settings.browserBaseURL}/administration/add-new-lecturer`}>
          Add new
        </Button>
      </Flex>

      <Divider my={10} />

      <Group gap={10}>
        {lecturers.length === 0 && <SubpageError text="No lecturers" />}

        {(lecturers as Lecturer[]).map((lecturer) => (
          <Card w="100%" shadow="sm" withBorder key={lecturer.lecturerId}>
            <Flex justify="space-between">
              <Flex align="center" gap={20}>
                <InitialsAvatar {...lecturer} />

                <Flex direction="column" align="start">
                  <Text>
                    {lecturer.firstName} {lecturer.lastName}
                  </Text>
                  <Text size="xs">{lecturer.email}</Text>
                </Flex>
              </Flex>

              <Flex gap={12} align="center">
                <Button
                  variant="subtle"
                  c="red"
                  disabled={result === BasicRequestResult.Loading}
                  loading={lecturer.email === deleteEmail && result === BasicRequestResult.Loading}
                  onClick={() => handleDelete(lecturer.email)}
                >
                  Delete
                </Button>
                <Button
                  variant="subtle"
                  component={Link}
                  to={`${settings.browserBaseURL}/administration/edit-lecturer-data/${lecturer.lecturerId}`}
                >
                  Edit
                </Button>

                <Divider orientation="vertical" mx={3} />

                <Button
                  component={Link}
                  to={`${settings.browserBaseURL}/administration/lecturer-profile/${lecturer.lecturerId}`}
                >
                  Show {'>'}
                </Button>
              </Flex>
            </Flex>
          </Card>
        ))}
      </Group>
    </Flex>
  );
};

export { LecturersListPage };
