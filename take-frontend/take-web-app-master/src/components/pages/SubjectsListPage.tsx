import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Divider, Flex, Group, Loader, Text } from '@mantine/core';
import { Subject } from '../../model/existing-objects/Subject';
import { SubpageError } from '../SubpageError';
import { useGetSubjects } from '../../hooks/useGetSubjects.hook';
import { SubpageLoader } from '../SubpageLoader';
import { settings } from '../../settings';

const SubjectsListPage: FC = () => {
  const { subjects, error } = useGetSubjects();

  if (error) {
    return <SubpageError text="An error occurred while loading list" />;
  }

  if (subjects === null) {
    return <SubpageLoader />;
  }

  return (
    <Flex direction="column" px={10} py={20} maw={1200} mx="auto">
      <Flex justify="space-between" align="center">
        <Text component="h2" size="xl">
          Subjects
        </Text>

        <Button component={Link} to={`${settings.browserBaseURL}/administration/add-new-subject`}>
          Add new
        </Button>
      </Flex>

      <Divider my={10} />

      <Group gap={10}>
        {subjects.length === 0 && <SubpageError text="No subjects" />}

        {(subjects as Subject[]).map((subject) => (
          <Card w="100%" shadow="sm" withBorder key={subject.id}>
            <Flex justify="space-between" align="center">
              <Text>{subject.name}</Text>

              <Button component={Link} to={`${settings.browserBaseURL}/administration/subject-data/${subject.id}`}>
                Show {'>'}
              </Button>
            </Flex>
          </Card>
        ))}
      </Group>
    </Flex>
  );
};

export { SubjectsListPage };
