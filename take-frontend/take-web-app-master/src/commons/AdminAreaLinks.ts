import { LinksDesc } from '../types/link-desc';
import { settings } from '../settings';

const AdminAreaLinks: LinksDesc = [
  {
    link: `${settings.browserBaseURL}/administration/subjects-list`,
    text: 'All subjects list',
  },
  {
    link: `${settings.browserBaseURL}/administration/add-new-subject`,
    text: 'Add new subject',
  },
  {
    link: `${settings.browserBaseURL}/administration/lecturers-list`,
    text: 'All lecturers list',
  },
  {
    link: `${settings.browserBaseURL}/administration/add-new-lecturer`,
    text: 'Add new lecturer',
  },
  {
    link: `${settings.browserBaseURL}/administration/surveys-list`,
    text: 'All surveys list',
  },
  {
    link: `${settings.browserBaseURL}/administration/students-list`,
    text: 'All students list',
  },
  {
    link: `${settings.browserBaseURL}/administration/add-new-student`,
    text: 'Add new student',
  },
];

export { AdminAreaLinks };
