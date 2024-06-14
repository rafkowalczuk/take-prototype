import { Lecturer } from './Lecturer';

interface Subject {
    subjectId: number;
    name: string;
    lecturer: Lecturer;
}

export type { Subject };
