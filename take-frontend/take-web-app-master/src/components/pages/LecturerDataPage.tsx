import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useRequest } from '../../hooks/useRequest.hook';
import { settings } from '../../settings';
import { Lecturer } from '../../model/existing-objects/Lecturer';

const LecturerDataPage: FC = () => {
    const [lecturer, setLecturer] = useState<Lecturer | null>(null);

    const { id } = useParams();

    const lecturerRequest = useRequest(
        `${settings.backendAPIUrl}lecturers/profile/${id}`,
        {
            method: 'GET',
        },
    );

    // todo: fix duplicated request to survey data EP via GET

    useEffect(() => {
        if (lecturerRequest.error) {
            alert('An error occurred');
            console.error(lecturerRequest.error);
        }
    }, [lecturerRequest.error]);

    useEffect(() => {
        if (lecturerRequest.data) {
            setLecturer(lecturerRequest.data as Lecturer);
        }
    }, [lecturerRequest.data]);

    return (
        <>
            <h1>Lecturer profile data</h1>
            {lecturerRequest.processing && <p>Loading</p>}
            {!lecturerRequest.processing && lecturer !== null && (
                <>
                    <p>
                        Name: {lecturer.firstName} {lecturer.lastName}
                    </p>
                    <p>Email: {lecturer.email}</p>

                    <p>Subjects:</p>
                    <ul>
                        {lecturer.subjects.map((subjectName) => (
                            <li key={subjectName}>{subjectName}</li>
                        ))}
                    </ul>

                    <p>Surveys:</p>
                    <ul>
                        {lecturer.surveys.map((surveyName) => (
                            <li key={surveyName}>{surveyName}</li>
                        ))}
                    </ul>
                </>
            )}
        </>
    );
};

export { LecturerDataPage };
