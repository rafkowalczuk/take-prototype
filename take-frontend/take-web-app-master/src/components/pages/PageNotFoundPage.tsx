import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Flex, Group, Text } from '@mantine/core';
import { settings } from '../../settings';

const PageNotFoundPage: FC = () => (
  <Flex w="100%" justify="center">
    <Group w="100%" maw={800} h={120}>
      <Card w="100%" shadow="md" withBorder>
        <Flex direction="column" align="center" w="100%" h="100%" gap={20} py={20}>
          <Text component="h2" size="lg">
            Page not found
          </Text>
          <Text size="sm">Sorry, buy we cannot find the content you are looking for.</Text>
          <Button component={Link} to={settings.browserBaseURL} fullWidth={false}>
            Main page
          </Button>
        </Flex>
      </Card>
    </Group>
  </Flex>
);

export { PageNotFoundPage };
