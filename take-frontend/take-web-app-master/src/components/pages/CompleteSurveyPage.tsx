import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Survey } from '../../model/existing-objects/Survey';
import { StarRatio } from '../forms/StarRatio';
import { useRequest } from '../../hooks/useRequest.hook';
import { jsSubmit } from '../../utils/js-submit';
import { Answer } from '../../model/existing-objects/Answer';
import { settings } from '../../settings';

const CompleteSurveyPage: FC = () => {
    const { id } = useParams();

    const [survey, setSurvey] = useState<Survey | null>(null);

    const surveyRequest = useRequest(`${settings.backendAPIUrl}surveys/${id}`, {
        method: 'GET',
        mode: 'cors',
    });

    useEffect(() => {
        if (surveyRequest.error) {
            window.alert(
                'An error occurred while loading survey, try again later.',
            );
            console.error(surveyRequest.error);
        }
    }, [surveyRequest.error]);

    useEffect(() => {
        if (
            surveyRequest.data &&
            Object.hasOwn(surveyRequest.data, 'surveyId')
        ) {
            setSurvey(surveyRequest.data as Survey);
        }
    }, [surveyRequest.data]);

    const [answers, setAnswers] = useState<[number, number][]>([]);

    const updateAnswer = (questionId: number, answerValue: number) => {
        let answerAlreadyInAnswers = false;
        const newList: [number, number][] = answers.map(
            (answer): [number, number] => {
                if (answer[0] === questionId) {
                    answerAlreadyInAnswers = true;
                    return [answer[0], answerValue];
                } else {
                    return [answer[0], answer[1]];
                }
            },
        );
        if (!answerAlreadyInAnswers) {
            newList.push([questionId, answerValue]);
        }

        setAnswers(newList);
    };

    const {
        send: sendAnswers,
        processing: sendingAnswers,
        ...answersRequest
    } = useRequest();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        if (survey && !submitted) {
            if (answers.length < survey.questions.length) {
                window.alert(
                    'Provide your score for each question before submitting.',
                );
                return;
            }

            setSubmitted(true);

            const answersToSend = survey.questions.map(
                (q): Answer => ({
                    studentId: 1, // todo: add real id,
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
        return (
            <>
                <h1>Complete survey</h1>
                <p>Loading data</p>
            </>
        );
    }

    if (success) {
        return <h1>Thank you for answers</h1>;
    }

    return (
        <>
            <h1>Complete Survey {`"${survey.name}"`}</h1>

            <form>
                {survey.questions.map((question) => (
                    <div key={question.questionId}>
                        <p>{question.content}</p>
                        <StarRatio
                          groupName={question.questionId.toString()}
                          value={
                                answers.find(
                                    (a) => a[0] === question.questionId,
                                )?.[1]
                            }
                          updateValue={(value) =>
                                updateAnswer(question.questionId, value)
                            }
                        />
                    </div>
                ))}

                <input
                  disabled={submitted}
                  type="submit"
                  value="Send answers"
                  onClick={jsSubmit(handleSubmit)}
                />
            </form>
        </>
    );
};

export { CompleteSurveyPage };
