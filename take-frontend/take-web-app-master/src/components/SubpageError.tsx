import { FC } from 'react';
import { Card, Flex, Group, Text } from '@mantine/core';

type SubpageErrorProps = {
  text: string;
};

const SubpageError: FC<SubpageErrorProps> = ({ text }) => (
  <Flex align="center" direction="column" justify="center" my={40} w="100%">
    <Group w="100%">
      <Card w="100%" h="100%" shadow="md" withBorder>
        <Flex justify="center" h="100%" align="center">
          <Text>{text}</Text>
        </Flex>
      </Card>
    </Group>
  </Flex>
);

export { SubpageError };
export type { SubpageErrorProps };
