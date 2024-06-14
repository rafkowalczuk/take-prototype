import { useEffect, useState } from 'react';
import { Lecturer } from '../model/existing-objects/Lecturer';
import { useRequest } from './useRequest.hook';
import { settings } from '../settings';

const useGetLecturers = () => {
    const request = useRequest(`${settings.backendAPIUrl}lecturers`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const [lecturers, _setLecturers] = useState<Lecturer[]>([]);

    useEffect(() => {
        if (!request.processing && !request.error && request.data) {
            _setLecturers(request.data as Lecturer[]);
        }
    }, [request.processing]);

    return { lecturers, processing: request.processing, error: request.error };
};

export { useGetLecturers };
