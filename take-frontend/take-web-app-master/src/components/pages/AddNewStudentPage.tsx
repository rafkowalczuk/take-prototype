import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput } from '../forms/TextInput';
import { jsSubmit } from '../../utils/js-submit';
import { useRequest } from '../../hooks/useRequest.hook';
import { settings } from '../../settings';

const AddNewStudentPage: FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const { send: sendRequest, data: response, ...request } = useRequest();

    const submit = () => {
        sendRequest(`${settings.backendAPIUrl}students`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
            }),
        });
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (
            typeof response === 'object' &&
            response !== null &&
            Object.hasOwn(response, 'studentId')
        ) {
            navigate('/administration/students-list');
        }
    }, [response]);

    return (
        <form>
            <TextInput
              value={firstName}
              updateValue={setFirstName}
              label="First name"
            />
            <TextInput
              value={lastName}
              updateValue={setLastName}
              label="Last name"
            />
            <TextInput value={email} updateValue={setEmail} label="E-mail" />

            <input
              onClick={jsSubmit(submit)}
              type="submit"
              value="Proceed and close"
            />
        </form>
    );
};

export { AddNewStudentPage };
