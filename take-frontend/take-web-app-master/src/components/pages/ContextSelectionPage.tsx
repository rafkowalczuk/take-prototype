import { FC } from 'react';
import { Link } from 'react-router-dom';

const ContextSelectionPage: FC = () => (
    <>
        <Link to="/my-surveys">Fill your surveys</Link>
        <br />
        <Link to="/administration">Administration</Link>
    </>
);

export { ContextSelectionPage };
