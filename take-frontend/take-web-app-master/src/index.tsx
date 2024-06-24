import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.sass';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
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
import { EditLecturerDataPage } from './components/pages/EditLecturerDataPage';
import { EditStudentDataPage } from './components/pages/EditStudentDataPage';
import { SubjectDataPage } from './components/pages/SubjectDataPage';
import { PageLayout } from './components/page-layout/PageLayout';
import { EditSubjectDataPage } from './components/pages/EditSubjectDataPage';
import { settings } from './settings';

const theme = createTheme({
  fontFamily: 'Poppins, Open Sans, sans-serif',
});

let basePath = new URL(settings.browserBaseURL).pathname;

if (basePath.endsWith('/')) {
  basePath = basePath.slice(0, -1);
}

const root = ReactDOM.createRoot(document.getElementById('react-page-root') as HTMLElement);
root.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <Notifications position="top-center" />
      <RouterProvider
        router={createBrowserRouter([
          {
            path: '/',
            element: <PageLayout />,
            children: [
              {
                path: `${basePath}/complete-survey/:id`,
                element: <CompleteSurveyPage />,
              },
              {
                path: `${basePath}/administration/surveys-list`,
                element: <SurveysListPage />,
              },
              {
                path: `${basePath}/administration/survey-data/:id`,
                element: <SurveyDataPage />,
              },
              {
                path: `${basePath}/administration/lecturers-list`,
                element: <LecturersListPage />,
              },
              {
                path: `${basePath}/administration/lecturer-profile/:id`,
                element: <LecturerDataPage />,
              },
              {
                path: `${basePath}/administration/add-new-lecturer`,
                element: <AddNewLecturerPage />,
              },
              {
                path: `${basePath}/administration/edit-lecturer-data/:id`,
                element: <EditLecturerDataPage />,
              },
              {
                path: `${basePath}/administration/subjects-list`,
                element: <SubjectsListPage />,
              },
              {
                path: `${basePath}/administration/subject-data/:id`,
                element: <SubjectDataPage />,
              },
              {
                path: `${basePath}/administration/add-new-subject`,
                element: <AddNewSubjectPage />,
              },
              {
                path: `${basePath}/administration/edit-subject-data/:id`,
                element: <EditSubjectDataPage />,
              },
              {
                path: `${basePath}/administration/students-list`,
                element: <StudentsListPage />,
              },
              {
                path: `${basePath}/administration/edit-student-data/:id`,
                element: <EditStudentDataPage />,
              },
              {
                path: `${basePath}/administration/surveys-of-student/:id`,
                element: <SurveysOfStudentPage />,
              },
              {
                path: `${basePath}/administration/add-new-student`,
                element: <AddNewStudentPage />,
              },
              {
                path: `${basePath}/administration`,
                element: <AdministrationPage />,
              },
              {
                path: `${basePath}/my-surveys`,
                element: <MySurveysPage />,
              },
              {
                path: `${basePath}/`,
                element: <ContextSelectionPage />,
              },
              {
                path: '*',
                element: <PageNotFoundPage />,
              },
            ],
          },
        ])}
      />
    </MantineProvider>
  </React.StrictMode>,
);
