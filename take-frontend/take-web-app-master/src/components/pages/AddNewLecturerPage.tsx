import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput } from '../forms/TextInput';
import { jsSubmit } from '../../utils/js-submit';
import { CheckboxSelector } from '../forms/CheckboxSelector';
import { useRequest } from '../../hooks/useRequest.hook';
import { Subject } from '../../model/existing-objects/Subject';
import { settings } from '../../settings';

const AddNewLecturerPage: FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [subjectIds, setSubjectIds] = useState<string[]>([]);

    const [formEnabled, setFormEnabled] = useState(false); // false because list of subjects needs to be loaded

    const { send: sendRequest, data: response, ...request } = useRequest();

    const { data: subjects, error } = useRequest(
        `${settings.backendAPIUrl}subjects`,
        { method: 'GET' },
    );

    // todo: fix duplicated request to lecturers list via GET

    useEffect(() => {
        if (error) {
            alert(
                'An error occurred while loading list of subjects. Subject selection function unavailable and form is disabled. Reload if needed.',
            );
            console.error(error);
        }
    }, [error]);

    const submit = () => {
        setFormEnabled(false);
        sendRequest(`${settings.backendAPIUrl}lecturers`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                subjectIds: subjectIds.map((id) => parseInt(id, 10)),
                surveys: [],
            }),
        });
    };

    useEffect(() => {
        if (request.error) {
            window.alert('An error occurred!'); // TODO: add proper handling
            console.error(request.error);
            setFormEnabled(true);
        }
    }, [request.error]);

    const navigate = useNavigate();

    useEffect(() => {
        if (
            typeof response === 'object' &&
            response !== null &&
            Object.hasOwn(response, 'lecturerId')
        ) {
            navigate('/administration/lecturers-list');
        }
    }, [response]);

    const [subjectsCheckboxData, setSubjectsCheckboxData] = useState<
        [string, string][]
    >([]);

    useEffect(() => {
        if (subjects) {
            setSubjectsCheckboxData(
                (subjects as Subject[]).map((subject) => [
                    subject.subjectId.toString(),
                    subject.name,
                ]),
            );
            setFormEnabled(true);
        }
    }, [subjects]);

    return (
        <>
            <h1>Add new Lecturer</h1>
            <p>
                Adding new lecturer will cause new set of questions within new
                survey to be created for this lecturer. This is automatic and
                cannot be disabled.
            </p>
            <form>
                <TextInput
                  value={firstName}
                  updateValue={setFirstName}
                  label="Name"
                />
                <TextInput
                  value={lastName}
                  updateValue={setLastName}
                  label="Surname"
                />
                <TextInput
                  value={email}
                  updateValue={setEmail}
                  label="E-mail"
                />

                <CheckboxSelector
                  values={subjectsCheckboxData}
                  selectedValues={subjectIds}
                  updateValue={setSubjectIds}
                  label="Subjects"
                />

                {!formEnabled && <p>Processing</p>}

                <input
                  disabled={!formEnabled}
                  onClick={jsSubmit(submit)}
                  type="submit"
                  value="Proceed and close"
                />
            </form>
        </>
    );
};

export { AddNewLecturerPage };
