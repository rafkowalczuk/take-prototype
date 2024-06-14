import { FC } from 'react';
import { Link } from 'react-router-dom';

type LinkData = {
    text: string;
    link: string;
};

const AdministrationPage: FC = () => {
    const links: LinkData[] = [
        {
            link: 'subjects-list',
            text: 'All subjects list',
        },
        {
            link: 'add-new-subject',
            text: 'Add new subject',
        },
        {
            link: 'lecturers-list',
            text: 'All lecturers list',
        },
        {
            link: 'add-new-lecturer',
            text: 'Add new lecturer',
        },
        {
            link: 'surveys-list',
            text: 'All surveys list',
        },
        {
            link: 'students-list',
            text: 'All students list',
        },
        {
            link: 'add-new-student',
            text: 'Add new student',
        },
    ];

    return (
        <div>
            <h1>Administration</h1>

            <p>Administrative options region</p>
            <p>Authorized staff only!</p>

            <ul>
                {links.map((link) => (
                    <li key={link.link}>
                        <Link to={link.link}>{link.text}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { AdministrationPage };
