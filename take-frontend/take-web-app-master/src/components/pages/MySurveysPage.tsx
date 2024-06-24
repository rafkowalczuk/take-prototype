import { FC, useEffect, useState } from 'react';

import { Divider, Flex, Group, Loader, Text } from '@mantine/core';
import { useRequest } from '../../hooks/useRequest.hook';
import { Student, StudentWithSurveys } from '../../model/existing-objects/Student';
import { BasicSurvey } from '../../model/existing-objects/Survey';
import { ResponseError } from '../../errors/types/ResponseError';
import { settings } from '../../settings';
import { request } from '../../utils/request';
import { useAsyncEffect } from '../../hooks/useAsyncEffect.hook';
import { SurveyListElement } from '../SurveyListElement';
import { SurveyListStudentSection } from '../SurveyListStudentSection';
import { SurveyLoginCard } from '../SurveyLoginCard';
import { SubpageError } from '../SubpageError';
import { showNotification } from '../../utils/Notifications';

const MySurveysPage: FC = () => {
  const [studentId, setStudentId] = useState<number | null>(null);

  const [student, setStudent] = useState<Student | null>(null);

  const logout = () => {
    setStudent(null);
    setStudentId(null);
    window.localStorage.removeItem('take-web-app:student-login:id');
  };

  useAsyncEffect(async () => {
    const storedStudentId = window.localStorage.getItem('take-web-app:student-login:id');

    if (storedStudentId) {
      setStudentId(Number.parseInt(storedStudentId, 10));
    }
  }, []);

  useAsyncEffect(async () => {
    if (studentId) {
      const response = await request.get(`students/profile/${studentId}`);

      if (response.status === 200) {
        setStudent(response.data as Student);
      } else {
        logout();
      }
    }
  }, [studentId]);

  const { send: requestStudentByEmail, data: studentResponse, ...studentRequest } = useRequest();
  const { send: requestAllSurveys, data: allSurveysResponse, ...allSurveysRequest } = useRequest();
  const { send: requestFilledSurveys, data: filledSurveysResponse, ...filledSurveysRequest } = useRequest();

  useEffect(() => {
    if (studentRequest.error) {
      // todo: better error handling
      if (studentRequest.error instanceof ResponseError) {
        window.alert('Student not found by this email');
      } else {
        window.alert('An error occurred');
      }
    }
  }, [studentRequest.error]);

  useEffect(() => {
    // Checking of student by email request result
    if (studentResponse && Object.hasOwn(studentResponse, 'studentId')) {
      setStudentId((studentResponse as Student).studentId);
    }
  }, [studentResponse]);

  useEffect(() => {
    if (studentId) {
      window.localStorage.setItem('take-web-app:student-login:id', studentId.toString());
    }
  }, [studentId]);

  useEffect(() => {
    if (studentId) {
      // student id is set, so we can ask for all surveys and surveys filled by this student
      requestFilledSurveys(`${settings.backendAPIUrl}students/profile/${studentId}`, {
        method: 'GET',
        mode: 'cors',
      });

      requestAllSurveys(`${settings.backendAPIUrl}surveys`, {
        method: 'GET',
        mode: 'cors',
      });
    }
  }, [studentId]);

  const [surveys, setSurveys] = useState<BasicSurvey[]>([]);

  useEffect(() => {
    /*
        There is no single endpoint we can ask for surveys so the list of
        surveys to be filled need to be prepared from data about all surveys.
        We need list of surveys filled by student and subtract them from
        list of all surveys so the result contains only surveys without
        answers from this student.
         */

    if (filledSurveysResponse !== null && allSurveysResponse !== null) {
      const filteredSurveys = (allSurveysResponse as BasicSurvey[]).filter(
        (survey) => !(filledSurveysResponse as StudentWithSurveys).surveys.find((s) => s.surveyId === survey.surveyId),
      );

      setSurveys(filteredSurveys);
    }
  }, [filledSurveysResponse, allSurveysResponse]);

  const handleLoginSuccess = (student: Student) => {
    setStudent(student);
    setStudentId(student.studentId);

    showNotification({
      color: 'green',
      title: 'Login successful',
      message: '',
    });
  };

  if (studentId && student === null) {
    return (
      <Flex mih={200} w="100%" align="center" justify="center">
        <Loader size="lg" />
      </Flex>
    );
  } else if (studentId === null) {
    return (
      <Flex justify="center" w="100%" my={40}>
        <SurveyLoginCard onSuccess={handleLoginSuccess} onFailure={() => ({})} />
      </Flex>
    );
  } else if (student !== null) {
    const listReady = !(studentRequest.processing || filledSurveysRequest.processing);

    return (
      <Flex direction="column" px={10} py={20} maw={1200} mx="auto">
        <Flex justify="space-between" align="center">
          <Text component="h2" size="xl">
            Fill surveys
          </Text>
          <SurveyListStudentSection student={student} logout={logout} />
        </Flex>

        <Divider my={12} />

        {!listReady && (
          <Flex mih={200} w="100%" align="center" justify="center">
            <Loader size="lg" />
          </Flex>
        )}

        {listReady && surveys.length === 0 && <SubpageError text="No surveys to fill. Try again later." />}

        {listReady && (
          <Group gap={10}>
            {surveys.map((survey) => (
              <SurveyListElement key={survey.surveyId} survey={survey} />
            ))}
          </Group>
        )}
      </Flex>
    );
  } else {
    return <>error</>;
  }
};

export { MySurveysPage };
