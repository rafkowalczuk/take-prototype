import { FC } from 'react';
import { Button, Group, Text } from '@mantine/core';
import { jsSubmit } from '../utils/js-submit';
import { Student } from '../model/existing-objects/Student';
import { InitialsAvatar } from './InitialsAvatar';

type SurveyListStudentSectionProps = {
  student: Student;
  logout: () => void;
};

const SurveyListStudentSection: FC<SurveyListStudentSectionProps> = ({ student, logout }) => (
  <Group>
    <InitialsAvatar {...student} />
    <Text>{student.email}</Text>
    <Button onClick={jsSubmit(logout)} variant="filled">
      Logout
    </Button>
  </Group>
);

export { SurveyListStudentSection };
export type { SurveyListStudentSectionProps };
