import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.sass';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AdministrationPage } from './components/pages/AdministrationPage';
import { MySurveysPage } from './components/pages/MySurveysPage';
import { PageNotFoundPage } from './components/pages/PageNotFoundPage';
import { ContextSelectionPage } from './components/pages/ContextSelectionPage';
import { AddNewSubjectPage } from './components/pages/AddNewSubjectPage';
import { SubjectsListPage } from './components/pages/SubjectsListPage';
import { LecturersListPage } from './components/pages/LecturersListPage';
import { AddNewLecturerPage } from './components/pages/AddNewLecturerPage';
import { AddNewStudentPage } from './components/pages/AddNewStudentPage';
import { StudentsListPage } from './components/pages/StudentsListPage';
import { CompleteSurveyPage } from './components/pages/CompleteSurveyPage';
import { SurveysListPage } from './components/pages/SurveysListPage';
import { SurveyDataPage } from './components/pages/SurveyDataPage';
import { SurveysOfStudentPage } from './components/pages/SurveysOfStudentPage';
import { LecturerDataPage } from './components/pages/LecturerDataPage';

const root = ReactDOM.createRoot(
    document.getElementById('react-page-root') as HTMLElement,
);
root.render(
    <React.StrictMode>
        <RouterProvider
          router={createBrowserRouter([
                {
                    path: '/complete-survey/:id',
                    element: <CompleteSurveyPage />,
                },
                {
                    path: '/administration/surveys-list',
                    element: <SurveysListPage />,
                },
                {
                    path: '/administration/survey-data/:id',
                    element: <SurveyDataPage />,
                },
                {
                    path: '/administration/lecturers-list',
                    element: <LecturersListPage />,
                },
                {
                    path: '/administration/lecturer-profile/:id',
                    element: <LecturerDataPage />,
                },
                {
                    path: '/administration/add-new-lecturer',
                    element: <AddNewLecturerPage />,
                },
                {
                    path: '/administration/subjects-list',
                    element: <SubjectsListPage />,
                },
                {
                    path: '/administration/add-new-subject',
                    element: <AddNewSubjectPage />,
                },
                {
                    path: '/administration/students-list',
                    element: <StudentsListPage />,
                },
                {
                  path: '/administration/surveys-of-student/:id',
                  element: <SurveysOfStudentPage />,
                },
                {
                    path: '/administration/add-new-student',
                    element: <AddNewStudentPage />,
                },
                {
                    path: '/administration',
                    element: <AdministrationPage />,
                },
                {
                    path: '/my-surveys',
                    element: <MySurveysPage />,
                },
                {
                    path: '/',
                    element: <ContextSelectionPage />,
                },
                {
                    path: '*',
                    element: <PageNotFoundPage />,
                },
            ])}
        />
    </React.StrictMode>,
);
