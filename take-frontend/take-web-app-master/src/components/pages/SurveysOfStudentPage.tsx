import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Blockquote, Button, Card, Divider, Flex, Group, Loader, Space, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useRequest } from '../../hooks/useRequest.hook';
import { settings } from '../../settings';
import { StudentSurveyListResponse, Survey } from '../../model/existing-objects/Survey';
import { StudentWithSurveys } from '../../model/existing-objects/Student';
import { SubpageError } from '../SubpageError';
import { SubpageLoader } from '../SubpageLoader';

const SurveysOfStudentPage: FC = () => {
  const [surveys, setSurveys] = useState<StudentSurveyListResponse | null>(null);

  const { id } = useParams();

  const request = useRequest(`${settings.backendAPIUrl}students/profile/${id}`, {
    method: 'GET',
  });

  useEffect(() => {
    if (request.data) {
      setSurveys((request.data as StudentWithSurveys).surveys);
    }
  }, [request.data]);

  if (request.error) {
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
        <Blockquote p={10} w="100%">
          <Text size="sm">
            List of surveys of student lets you check only which surveys are completed by certain student. It does not
            let you check answers provided by student. By clicking "Show averages", you display average results for each
            question based on all answers from all students.
          </Text>
        </Blockquote>

        <Space />

        {(surveys as StudentSurveyListResponse).map((survey) => (
          <Card w="100%" shadow="sm" withBorder key={survey.surveyId}>
            <Flex justify="space-between" align="center">
              <Text>{survey.surveyName}</Text>

              <Button component={Link} to={`${settings.browserBaseURL}/administration/survey-data/${survey.surveyId}`}>
                Show averages {'>'}
              </Button>
            </Flex>
          </Card>
        ))}
      </Group>
    </Flex>
  );
};

export { SurveysOfStudentPage };
