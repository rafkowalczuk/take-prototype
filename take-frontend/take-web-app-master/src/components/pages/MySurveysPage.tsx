import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TextInput } from '../forms/TextInput';
import { jsSubmit } from '../../utils/js-submit';
import { useRequest } from '../../hooks/useRequest.hook';
import { Student } from '../../model/existing-objects/Student';
import { BasicSurvey } from '../../model/existing-objects/Survey';
import { ResponseError } from '../../errors/types/ResponseError';
import { settings } from '../../settings';

const MySurveysPage: FC = () => {
    const [studentId, setStudentId] = useState<number | null>(null);
    const [email, setEmail] = useState<string>('');

    const {
        send: requestStudentByEmail,
        data: studentResponse,
        ...studentRequest
    } = useRequest();
    const {
        send: requestAllSurveys,
        data: allSurveysResponse,
        ...allSurveysRequest
    } = useRequest();
    const {
        send: requestFilledSurveys,
        data: filledSurveysResponse,
        ...filledSurveysRequest
    } = useRequest();

    const submitEmail = () => {
        requestStudentByEmail(
            `${settings.backendAPIUrl}students/email/${encodeURIComponent(
                email,
            )}`,
            { method: 'GET', mode: 'cors' },
        );
    };

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
            // student id is set, so we can ask for all surveys and surveys filled by this student
            requestFilledSurveys(
                `${settings.backendAPIUrl}students/${studentId}/surveys`,
                { method: 'GET', mode: 'cors' },
            );

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
            const filteredSurveys = (
                allSurveysResponse as BasicSurvey[]
            ).filter(
                (survey) =>
                    !(filledSurveysResponse as BasicSurvey[]).find(
                        (s) => s.surveyId === survey.surveyId,
                    ),
            );

            setSurveys(filteredSurveys);
        }
    }, [filledSurveysResponse, allSurveysResponse]);

    if (!studentId) {
        return (
            <>
                <h1>Login</h1>
                <p>
                    You need to provide your e-mail address to start survey
                    completion.
                </p>
                <form>
                    <TextInput
                      value={email}
                      updateValue={setEmail}
                      label="E-mail"
                    />
                    <input
                      type="submit"
                      value="Login"
                      onClick={jsSubmit(submitEmail)}
                    />
                </form>
            </>
        );
    } else {
        return (
            <div>
                <h1>My surveys</h1>
                <p>List contains all surveys you had not filled yet.</p>

                <div>
                    {(studentRequest.processing ||
                        filledSurveysRequest.processing) && (
                        <div>loading list of your surveys...</div>
                    )}
                    {!(
                        studentRequest.processing ||
                        filledSurveysRequest.processing
                    ) && (
                        <ul>
                            {surveys.map((survey) => (
                                <li key={survey.surveyId}>
                                    {' '}
                                    <Link
                                      to={`/complete-survey/${survey.surveyId}`}
                                    >
                                        {survey.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        );
    }
};

export { MySurveysPage };
