import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button, Card, Group, Text, Image, Flex } from '@mantine/core';

import administratorImage from '../../assets/administrator.jpg';
import lectureImage from '../../assets/lecture.jpg';
import { settings } from '../../settings';

const ContextSelectionPage: FC = () => (
  <Flex justify="center" w="100%" gap={20} py={30} px={20} wrap="wrap">
    <Card maw={400} shadow="lg">
      <Card.Section>
        <Image src={lectureImage} height={220} alt="Norway" />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Fill surveys</Text>
        <Badge color="#0c8f0c">student</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        Share your thoughts about the professors you have had lectures, tutorials or labs with and help them become even
        better at what they do.
      </Text>

      <Button component={Link} to={`${settings.browserBaseURL}/my-surveys`} color="blue" fullWidth mt="md" radius="md">
        Fill survey
      </Button>
    </Card>

    <Card maw={400} shadow="lg">
      <Card.Section>
        <Image src={administratorImage} height={220} alt="Norway" />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Administration</Text>
        <Badge color="pink">admin-only</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        Add new students, subjects and lecturers to the system. Edit or correct their data, check surveys and results.
      </Text>

      <Button
        component={Link}
        to={`${settings.browserBaseURL}/administration`}
        color="blue"
        fullWidth
        mt="md"
        radius="md"
      >
        Open panel
      </Button>
    </Card>
  </Flex>
);

export { ContextSelectionPage };
