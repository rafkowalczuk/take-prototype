import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useRequest } from '../../hooks/useRequest.hook';
import { settings } from '../../settings';
import { StudentSurveyListResponse } from '../../model/existing-objects/Survey';

const SurveysOfStudentPage: FC = () => {
    const [surveys, setSurveys] = useState<StudentSurveyListResponse | null>(null);

    const { id } = useParams();

    const request = useRequest(
        `${settings.backendAPIUrl}students/${id}/surveys`,
        {
            method: 'GET',
        },
    );

    // todo: fix duplicated request to survey data EP via GET

    useEffect(() => {
        if (request.error) {
            alert('An error occurred');
            console.error(request.error);
        }
    }, [request.error]);

    useEffect(() => {
        if (request.data) {
            setSurveys(request.data as StudentSurveyListResponse);
        }
    }, [request.data]);

    return (
        <>
            <h1>Student survey list</h1>
            {request.processing && <p>Loading</p>}
            {!request.processing && surveys !== null && (
                <>
                    <p>Student survey:</p>
                    <ul>
                        { surveys.map(({surveyId, surveyName}) => (<li key={surveyId}>{surveyName}</li>)) }

                    </ul>
                </>
            )}
        </>
    );
};

export { SurveysOfStudentPage };
