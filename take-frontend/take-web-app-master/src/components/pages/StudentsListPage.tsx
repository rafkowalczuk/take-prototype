import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Divider, em, Flex, Group, Loader, Text } from '@mantine/core';
import { Student } from '../../model/existing-objects/Student';
import { InitialsAvatar } from '../InitialsAvatar';
import { SubpageError } from '../SubpageError';
import { useGetStudents } from '../../hooks/useGetStudents.hook';
import { useDeleteStudent } from '../../hooks/useDeleteStudent.hook';
import { BasicRequestResult } from '../../types/BasicRequestResult';
import { showNotification } from '../../utils/Notifications';
import { settings } from '../../settings';

const StudentsListPage: FC = () => {
  const { students, error: getStudentsError, updateList } = useGetStudents();

  const [deleteEmail, setDeleteEmail] = useState<string | null>(null);
  const { proceed: deleteStudent, result: deleteStudentResult } = useDeleteStudent();

  const handleDelete = async (email: string) => {
    setDeleteEmail(email);
    await deleteStudent(email);
  };

  useEffect(() => {
    if (deleteStudentResult === BasicRequestResult.Error) {
      showNotification({
        color: 'red',
        title: 'An error occurred',
        message: 'Student cannot be deleted for unknown reason, try again later or contact administrator.',
      });
    } else if (deleteStudentResult === BasicRequestResult.Ok) {
      showNotification({
        color: 'green',
        title: 'Student deleted',
        message: 'Student has been successfully deleted and list has been updated.',
      });

      // if (students !== null) {
      updateList(students!.filter((s) => s.email !== deleteEmail));
      // }
    }
  }, [deleteStudentResult]);

  if (students === null) {
    return (
      <Flex mih={200} w="100%" align="center" direction="column" justify="center">
        <Loader size="lg" />
      </Flex>
    );
  }

  if (getStudentsError) {
    return <SubpageError text="An error occurred while loading list." />;
  }

  return (
    <Flex direction="column" px={10} py={20} maw={1200} mx="auto">
      <Flex justify="space-between" align="center">
        <Text component="h2" size="xl">
          Students
        </Text>

        <Button component={Link} to={`${settings.browserBaseURL}/administration/add-new-student`}>
          Add new
        </Button>
      </Flex>

      <Divider my={10} />

      <Group gap={10}>
        {students.length === 0 && <SubpageError text="No students" />}

        {(students as Student[]).map((student) => (
          <Card w="100%" shadow="sm" withBorder key={student.studentId}>
            <Flex justify="space-between">
              <Flex align="center" gap={20}>
                <InitialsAvatar {...student} />

                <Flex direction="column" align="start">
                  <Text>
                    {student.firstName} {student.lastName}
                  </Text>
                  <Text size="xs">{student.email}</Text>
                </Flex>
              </Flex>

              <Flex gap={12} align="center">
                <Button variant="subtle" c="red" onClick={() => handleDelete(student.email)}>
                  Delete
                </Button>
                <Button
                  variant="subtle"
                  component={Link}
                  to={`${settings.browserBaseURL}/administration/edit-student-data/${student.studentId}`}
                >
                  Edit
                </Button>

                <Divider orientation="vertical" mx={3} />

                <Button
                  component={Link}
                  to={`${settings.browserBaseURL}/administration/surveys-of-student/${student.studentId}`}
                >
                  Show surveys {'>'}
                </Button>
              </Flex>
            </Flex>
          </Card>
        ))}
      </Group>
    </Flex>
  );
};

export { StudentsListPage };
