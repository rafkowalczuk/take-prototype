import { FC } from 'react';
import { Link } from 'react-router-dom';

const PageNotFoundPage: FC = () => (
    <>
        <h1>Page not found</h1>
        <p>Sorry, buy we cannot find the content you are looking for.</p>
        <Link to="/">Go to main page</Link>
    </>
);

export { PageNotFoundPage };
