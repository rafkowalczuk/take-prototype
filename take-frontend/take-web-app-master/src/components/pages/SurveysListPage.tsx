import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Divider, Flex, Group, Loader, Text } from '@mantine/core';
import { BasicSurvey, Survey } from '../../model/existing-objects/Survey';
import { useRequest } from '../../hooks/useRequest.hook';
import { settings } from '../../settings';
import { SubpageError } from '../SubpageError';
import { SubpageLoader } from '../SubpageLoader';

const SurveysListPage: FC = () => {
  const [surveys, setSurveys] = useState<BasicSurvey[]>([]);

  const { data, processing, error } = useRequest(`${settings.backendAPIUrl}surveys`, { method: 'GET' });

  // todo: fix duplicated request to lecturers list via GET

  useEffect(() => {
    if (error) {
      alert('An error occurred');
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setSurveys(data as BasicSurvey[]);
    }
  }, [data]);

  if (error) {
    return <SubpageError text="An error occurred while loading list" />;
  }

  if (surveys === null) {
    return <SubpageLoader />;
  }

  return (
    <Flex direction="column" px={10} py={20} maw={1200} mx="auto">
      <Text component="h2" size="xl">
        Surveys
      </Text>

      <Divider my={10} />

      <Group gap={10}>
        {surveys.length === 0 && <SubpageError text="No surveys yet" />}

        {(surveys as Survey[]).map((survey) => (
          <Card w="100%" shadow="sm" withBorder key={survey.surveyId}>
            <Flex justify="space-between" align="center">
              <Text>{survey.name}</Text>

              <Button component={Link} to={`${settings.browserBaseURL}/administration/survey-data/${survey.surveyId}`}>
                Show results {'>'}
              </Button>
            </Flex>
          </Card>
        ))}
      </Group>
    </Flex>
  );
};

export { SurveysListPage };
