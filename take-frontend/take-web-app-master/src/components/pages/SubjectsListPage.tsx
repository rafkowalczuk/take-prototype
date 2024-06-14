import { FC, useEffect, useState } from 'react';
import { Subject } from '../../model/existing-objects/Subject';
import { useRequest } from '../../hooks/useRequest.hook';
import { settings } from '../../settings';

const SubjectsListPage: FC = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);

    const { data, processing, error } = useRequest(
        `${settings.backendAPIUrl}subjects`,
        { method: 'GET' },
    );

    // todo: fix duplicated request to lecturers list via GET

    useEffect(() => {
        if (error) {
            alert('An error occurred.');
            console.error(error);
        }
    }, [error]);

    useEffect(() => {
        if (data) {
            setSubjects(data as Subject[]);
        }
    }, [data]);

    return (
        <>
            <h1>Subjects list</h1>
            <p>
                List contains data about all subjects - name and lecturer who
                directs it.
            </p>
            {processing && <p>Loading</p>}
            {!processing && (
                <table>
                    <thead>
                        <tr>
                            <td>Subject name</td>
                            <td>Lecturer</td>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((subject) => (
                            <tr key={subject.subjectId}>
                                <td>{subject.name}</td>
                                <td>
                                    {subject.lecturer.firstName}{' '}
                                    {subject.lecturer.lastName}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export { SubjectsListPage };
