import { FC } from 'react';
import { Flex, Loader } from '@mantine/core';

const SubpageLoader: FC = () => (
  <Flex mih={200} w="100%" align="center" direction="column" justify="center">
    <Loader size="lg" />
  </Flex>
);

export { SubpageLoader };
