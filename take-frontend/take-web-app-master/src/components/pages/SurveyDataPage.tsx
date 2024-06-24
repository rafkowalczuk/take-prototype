import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Card, Divider, Flex, Grid, Group, Loader, Rating, Space, Text } from '@mantine/core';
import { Survey } from '../../model/existing-objects/Survey';
import { useRequest } from '../../hooks/useRequest.hook';
import { settings } from '../../settings';
import { GetSurveysResultResponse } from '../../model/existing-objects/Answer';
import { RatingMax } from '../../commons/RatingRange';
import { SubpageLoader } from '../SubpageLoader';

const SurveyDataPage: FC = () => {
  const [survey, setSurvey] = useState<Survey | null>(null);

  const { id } = useParams();

  const surveyRequest = useRequest(`${settings.backendAPIUrl}surveys/${id}`, {
    method: 'GET',
  });

  // todo: fix duplicated request to survey data EP via GET

  useEffect(() => {
    if (surveyRequest.error) {
      alert('An error occurred');
      console.error(surveyRequest.error);
    }
  }, [surveyRequest.error]);

  const resultsRequest = useRequest();

  useEffect(() => {
    if (surveyRequest.data) {
      setSurvey(surveyRequest.data as Survey);
    }
  }, [surveyRequest.data]);

  useEffect(() => {
    if (survey) {
      resultsRequest.send(`${settings.backendAPIUrl}surveys/results/${survey.surveyId}`);
    }
  }, [survey]);

  const [results, setResults] = useState<GetSurveysResultResponse | null>(null);

  useEffect(() => {
    if (resultsRequest.data) {
      setResults(resultsRequest.data as GetSurveysResultResponse);
    }
  }, [resultsRequest.data]);

  const loading = surveyRequest.processing || resultsRequest.processing || survey === null || results === null;

  if (loading) {
    return <SubpageLoader />;
  }

  const totalRating = results.map((r) => r.averageRating).reduce((sum, curr) => sum + curr, 0);
  const averageRating = totalRating / results.length;

  const colorForRating = (rating: number): string => {
    if (rating < 2) {
      return 'red';
    }
    if (rating < 3.5) {
      return 'orange';
    }
    if (rating < 6.5) {
      return 'yellow';
    }

    return 'green';
  };

  if (results.length === 0) {
    return (
      <Flex direction="column" px={10} py={20} maw={1200} mx="auto">
        <Flex justify="space-between" align="center">
          <Text component="h2" size="xl">
            Survey
          </Text>
        </Flex>

        <Divider my={12} />

        <Card withBorder maw={1200}>
          <Flex justify="center" align="center" w="100%" mih={140}>
            <Text>No results yet</Text>
          </Flex>
        </Card>
      </Flex>
    );
  }

  return (
    <Flex direction="column" px={10} py={20} maw={1200} mx="auto">
      <Flex justify="space-between" align="center">
        <Text component="h2" size="xl">
          Survey
        </Text>
      </Flex>

      <Divider my={12} />

      <Card withBorder maw={1200}>
        <Text component="h3" size="lg">
          {survey.name}
        </Text>

        <Space h={20} />

        <Group>
          {results.map((result) => (
            <Grid w="100%" key={result.questionContent}>
              <Grid.Col span={9}>
                <Text>{result.questionContent}</Text>
              </Grid.Col>

              <Grid.Col span={3} offset={0}>
                <Flex justify="start" align="center" h="100%">
                  <Rating
                    count={RatingMax}
                    color={colorForRating(result.averageRating)}
                    readOnly
                    value={result.averageRating}
                  />

                  <Space w={10} />

                  <Text>{result.averageRating}</Text>
                </Flex>
              </Grid.Col>
            </Grid>
          ))}
        </Group>

        <Space h={40} />

        <Grid w="100%">
          <Grid.Col span={9}>
            <Text size="lg">Average rating</Text>
          </Grid.Col>

          <Grid.Col span={3} offset={0}>
            <Flex justify="start" align="center" h="100%">
              <Rating
                count={RatingMax}
                color={colorForRating(averageRating)}
                fractions={10}
                readOnly
                value={averageRating}
              />

              <Space w={10} />

              <Text>{averageRating}</Text>
            </Flex>
          </Grid.Col>
        </Grid>
      </Card>
    </Flex>
  );
};

export { SurveyDataPage };
