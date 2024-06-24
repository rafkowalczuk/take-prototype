import { FC } from 'react';
import { Button, Card, Flex, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { BasicSurvey } from '../model/existing-objects/Survey';
import { settings } from '../settings';

type SurveyListElementProps = {
  survey: BasicSurvey;
};

const SurveyListElement: FC<SurveyListElementProps> = ({ survey: { name, surveyId } }) => (
  <Card w="100%">
    <Flex justify="space-between" align="center">
      <Text>{name}</Text>

      <Button component={Link} to={`${settings.browserBaseURL}/complete-survey/${surveyId}`} variant="subtle">
        Complete {'>'}
      </Button>
    </Flex>
  </Card>
);

export { SurveyListElement };
export type { SurveyListElementProps };
