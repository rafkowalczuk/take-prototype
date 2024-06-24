import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Button, Card, Divider, Flex, Grid, Group, Rating, Space, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Survey } from '../../model/existing-objects/Survey';
import { useRequest } from '../../hooks/useRequest.hook';
import { jsSubmit } from '../../utils/js-submit';
import { Answer } from '../../model/existing-objects/Answer';
import { settings } from '../../settings';
import { RatingMax } from '../../commons/RatingRange';
import { SubpageLoader } from '../SubpageLoader';
import { request } from '../../utils/request';
import { useAsyncEffect } from '../../hooks/useAsyncEffect.hook';

const CompleteSurveyPage: FC = () => {
  const { id } = useParams();

  const [survey, setSurvey] = useState<Survey | null>(null);

  useAsyncEffect(async () => {
    const surveyRequest = await request.get(`surveys/${id}`);

    if (surveyRequest.status === 200) {
      setSurvey(surveyRequest.data);
    }
  }, []);

  const [answers, setAnswers] = useState<[number, number][]>([]);

  const updateAnswer = (questionId: number, answerValue: number) => {
    let answerAlreadyInAnswers = false;
    const newList: [number, number][] = answers.map((answer): [number, number] => {
      if (answer[0] === questionId) {
        answerAlreadyInAnswers = true;
        return [answer[0], answerValue];
      } else {
        return [answer[0], answer[1]];
      }
    });
    if (!answerAlreadyInAnswers) {
      newList.push([questionId, answerValue]);
    }

    setAnswers(newList);
  };

  const { send: sendAnswers, processing: sendingAnswers, ...answersRequest } = useRequest();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (survey && !submitted) {
      if (answers.length < survey.questions.length) {
        window.alert('Provide your score for each question before submitting.');
        return;
      }

      setSubmitted(true);

      const studentId = window.localStorage.getItem('take-web-app:student-login:id');

      if (studentId === null) {
        return;
      }

      const answersToSend = survey.questions.map(
        (q): Answer => ({
          studentId: Number.parseInt(studentId, 10),
          questionId: q.questionId,
          surveyId: survey.surveyId,
          rating: answers.find((a) => a[0] === q.questionId)![1],
        }),
      );

      const body = {
        answers: answersToSend,
      };

      sendAnswers(`${settings.backendAPIUrl}answers`, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    }
  };

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (answersRequest.error) {
      window.alert('An error occurred');
      setSubmitted(false);
    }
  }, [answersRequest.error]);

  useEffect(() => {
    if (!sendingAnswers && answersRequest.data) {
      setSuccess(true);
    }
  }, [sendingAnswers]);

  if (!survey) {
    return <SubpageLoader />;
  }

  if (success) {
    return (
      <Flex direction="column" align="center" my={30}>
        <Card mih={120} maw={800} w={600} withBorder shadow="sm">
          <Flex direction="column" align="center" justify="center" gap={20} p={20}>
            <Text>Thank you for answers</Text>
            <Button component={Link} to={`${settings.browserBaseURL}/my-surveys`}>
              Go back to surveys
            </Button>
          </Flex>
        </Card>
      </Flex>
    );
  }

  return (
    <Flex direction="column" px={10} py={20} maw={1200} mx="auto">
      <Flex justify="space-between" align="center">
        <Text component="h2" size="xl">
          Fill survey
        </Text>
      </Flex>

      <Divider my={12} />

      <Card withBorder maw={1200}>
        <Text component="h3" size="lg">
          {survey.name}
        </Text>

        <Space h={20} />

        <Group>
          {survey.questions.map((question) => (
            <Grid w="100%" key={question.questionId}>
              <Grid.Col span={9}>
                <Text>{question.content}</Text>
              </Grid.Col>

              <Grid.Col span={1} offset={1}>
                <Flex justify="center" align="center" h="100%">
                  <Rating
                    count={RatingMax}
                    value={answers.find((a) => a[0] === question.questionId)?.[1]}
                    onChange={(v) => updateAnswer(question.questionId, v)}
                  />
                </Flex>
              </Grid.Col>
            </Grid>
          ))}
        </Group>

        <Space h={20} />

        <Button
          maw={220}
          disabled={submitted || answers.length < survey.questions.length}
          onClick={jsSubmit(handleSubmit)}
        >
          Submit
        </Button>
      </Card>
    </Flex>
  );
};

export { CompleteSurveyPage };
