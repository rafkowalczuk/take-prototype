import { FC } from 'react';
import { AppShell, Burger, Button, Flex, Group, Image, Text, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, useLocation } from 'react-router';

import { Link } from 'react-router-dom';
import logo from '../../assets/logo-cut.png';
import { settings } from '../../settings';
import { AdminAreaLinks } from '../../commons/AdminAreaLinks';

const PageLayout: FC = () => {
  const [opened, { toggle }] = useDisclosure();

  const { pathname } = useLocation();

  const { colors } = useMantineTheme();

  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: {
          mobile: !opened,
          desktop: !pathname.startsWith('/administration'),
        },
      }}
      padding="md"
    >
      <AppShell.Header style={{ boxShadow: '0 0 30px 0 rgba(0, 0, 0, 0.15)' }}>
        <Group flex={1} style={{ justifyContent: 'center' }} h="100%">
          <Burger px={30} py={20} mih={60} opened={opened} onClick={toggle} hiddenFrom="sm" size="md" />

          <Group flex={1} style={{ justifyContent: 'space-between' }} px={10}>
            <Button variant="subtle" px={14} py={10} mih={60} radius="md" component={Link} to={settings.browserBaseURL}>
              <Flex gap={6} style={{ alignItems: 'center' }}>
                <Image width={50} h={50} src={logo} />
                <Text c="#222" component="h1" size="lg" style={{ textDecoration: 'none' }} visibleFrom="xs">
                  Rank your lecturer
                </Text>
              </Flex>
            </Button>

            <Flex justify="space-between" px="md" gap={40} visibleFrom="sm">
              <Button fw={500} variant="subtle" component={Link} to={`${settings.browserBaseURL}/my-surveys`}>
                Fill surveys
              </Button>

              <Button fw={500} variant="subtle" component={Link} to={`${settings.browserBaseURL}/administration`}>
                Administration
              </Button>
            </Flex>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {AdminAreaLinks.map((link) => (
          <Button
            c="#222"
            fw={400}
            mih={58}
            ta="left"
            key={link.link + link.text}
            component={Link}
            to={link.link}
            variant="subtle"
            style={{ display: 'flex', alignItems: 'left' }}
            px={14}
          >
            {link.text}
          </Button>
        ))}
      </AppShell.Navbar>

      <AppShell.Main bg={colors.gray[0]}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export { PageLayout };
