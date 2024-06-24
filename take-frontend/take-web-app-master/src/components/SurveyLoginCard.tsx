import { FC } from 'react';
import { Card, Group, Space, Text } from '@mantine/core';
import { StudentLoginForm } from './StudentLoginForm';
import { Student } from '../model/existing-objects/Student';

type SurveyLoginCardProps = {
  onSuccess: (student: Student) => void;
  onFailure: (error: Error) => void;
};

const SurveyLoginCard: FC<SurveyLoginCardProps> = ({ onSuccess, onFailure }) => (
  <Card shadow="sm" padding="lg" radius="md" withBorder maw={700}>
    <Group justify="space-between" mt="md" mb="xs">
      <Text component="h2" fw={500}>
        Login
      </Text>
    </Group>

    <Text size="sm" c="dimmed">
      You have to provide your student`s email address to to start surveys completion
    </Text>

    <Space mih={20} />

    <StudentLoginForm onSuccess={onSuccess} onFailure={onFailure} />
  </Card>
);

export { SurveyLoginCard };
export type { SurveyLoginCardProps };
