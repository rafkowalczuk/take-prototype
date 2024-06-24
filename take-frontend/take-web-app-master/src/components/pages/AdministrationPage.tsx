import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Divider, Flex, Group, Image, Space, Text } from '@mantine/core';
import studentsImage from '../../assets/students.jpg';
import lecturersImage from '../../assets/lecturers.jpg';
import subjectsImage from '../../assets/subjects.jpg';
import surveysImage from '../../assets/surveys.png';
import { LinksDesc } from '../../types/link-desc';
import { settings } from '../../settings';

type CardItemDesc = {
  name: string;
  image: unknown;
  elements: LinksDesc;
};

type CardItemsDesc = CardItemDesc[];

const cardItemsDesc: CardItemsDesc = [
  {
    name: 'Students',
    image: studentsImage,
    elements: [
      {
        link: `${settings.browserBaseURL}/administration/students-list`,
        text: 'List of students',
      },
      {
        link: `${settings.browserBaseURL}/administration/add-new-student`,
        text: 'Add student',
      },
    ],
  },
  {
    name: 'Lecturers',
    image: lecturersImage,
    elements: [
      {
        link: `${settings.browserBaseURL}/administration/lecturers-list`,
        text: 'List of lecturers',
      },
      {
        link: `${settings.browserBaseURL}/administration/add-new-lecturer`,
        text: 'Add lecturers',
      },
    ],
  },
  {
    name: 'Subjects',
    image: subjectsImage,
    elements: [
      {
        link: `${settings.browserBaseURL}/administration/subjects-list`,
        text: 'List of subjects',
      },
      {
        link: `${settings.browserBaseURL}/administration/add-new-subject`,
        text: 'Add subject',
      },
    ],
  },
  {
    name: 'Surveys',
    image: surveysImage,
    elements: [
      {
        link: `${settings.browserBaseURL}/administration/surveys-list`,
        text: 'List of surveys',
      },
    ],
  },
];

const AdministrationPage: FC = () => (
  <>
    <Flex direction="column" px={10} pt={20} maw={900} mx="auto">
      <Flex justify="space-between" align="center">
        <Text component="h2" size="xl">
          Administration
        </Text>
      </Flex>

      <Divider my={12} />
    </Flex>

    <Flex maw={930} justify="center" w="100%" gap={20} pb={30} px={20} wrap="wrap" mx="auto">
      {cardItemsDesc.map((desc) => (
        <Card maw={430} shadow="lg" w="100%" key={desc.name}>
          <Card.Section>
            <Image src={desc.image} height={220} alt="Norway" />
          </Card.Section>

          <Group justify="space-between" mt="md">
            <Text fw={500}>{desc.name}</Text>
            {/* <Badge color="#0c8f0c">student</Badge> */}
          </Group>

          <Space h={5} />

          <Flex align="center" justify="start" gap={10}>
            {desc.elements.map((elem) => (
              <Button key={elem.link} variant="light" component={Link} to={elem.link} color="blue" radius="md">
                {elem.text}
              </Button>
            ))}
          </Flex>
        </Card>
      ))}
    </Flex>
  </>
);

export { AdministrationPage };
