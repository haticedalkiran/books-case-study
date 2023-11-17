import { AppShell, Burger, Container, Flex, Group, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavLink, Outlet } from 'react-router-dom';

export function AppLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <NavLink to="/">
              <Text>App Logo</Text>
            </NavLink>
            <Group ml="xl" gap={0} visibleFrom="sm">
              <Flex columnGap={16}>
                <NavLink to="/">
                  <Text>Home</Text>
                </NavLink>

                <NavLink to="/cart">
                  <Text>Cart</Text>
                </NavLink>
              </Flex>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={16}>
        <Stack gap={16}>
          <NavLink to="/" onClick={toggle}>
            <Text>Home</Text>
          </NavLink>
          <NavLink to="/cart" onClick={toggle}>
            <Text>Cart</Text>
          </NavLink>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container>
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
