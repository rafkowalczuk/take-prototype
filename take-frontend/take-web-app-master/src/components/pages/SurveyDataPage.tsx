import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Survey } from '../../model/existing-objects/Survey';
import { useRequest } from '../../hooks/useRequest.hook';
import { settings } from '../../settings';
import { GetSurveysResultResponse } from '../../model/existing-objects/Answer';

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
            resultsRequest.send(
                `${settings.backendAPIUrl}surveys/results/${survey.surveyId}`,
            );
        }
    }, [survey]);

    const [results, setResults] = useState<GetSurveysResultResponse | null>(
        null,
    );

    useEffect(() => {
        if (resultsRequest.data) {
            setResults(resultsRequest.data as GetSurveysResultResponse);
        }
    }, [resultsRequest.data]);

    const loading = surveyRequest.processing || resultsRequest.processing;

    return (
        <>
            <h1>Survey data</h1>
            {loading && <p>Loading</p>}
            {!loading && survey !== null && results !== null && (
                <>
                    <p>Name: {survey.name}</p>
                    <p>Created at: {survey.dateCreated}</p>
                    <table>
                        <thead>
                            <tr>
                                <td>Question</td>
                                <td>Average rating</td>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result) => (
                                <tr key={result.questionContent}>
                                    <td>{result.questionContent}</td>
                                    <td>{result.averageRating}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </>
    );
};

export { SurveyDataPage };
