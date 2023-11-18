import { AppShell, Burger, Container, Flex, Group, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, ShoppingCart } from 'tabler-icons-react';

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
                  {({ isActive }) => (
                    <Home strokeWidth="1.5" color={isActive ? 'orange' : 'black'} />
                  )}
                </NavLink>

                <NavLink to="/cart">
                  {({ isActive }) => (
                    <ShoppingCart strokeWidth="1.5" color={isActive ? 'orange' : 'black'} />
                  )}
                </NavLink>
              </Flex>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={16}>
        <Stack gap={16}>
          <NavLink to="/" onClick={toggle}>
            {({ isActive }) => <Text c={isActive ? 'orange' : 'black'}>Home</Text>}
          </NavLink>
          <NavLink to="/cart" onClick={toggle}>
            {({ isActive }) => <Text c={isActive ? 'orange' : 'black'}>Cart</Text>}
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
