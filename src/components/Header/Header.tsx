import { Anchor, Box, Burger, Flex, Stack, createTheme } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { NavLink } from 'react-router-dom';

export function Header() {
  const matches = useMediaQuery('(min-width: 992px)');
  const [opened, { toggle }] = useDisclosure();
  return (
    <Flex
      mih={50}
      bg="rgba(0, 0, 0, .3)"
      justify="space-between"
      gap="md"
      align="center"
      direction="row"
      wrap="wrap"
      px="lg"
    >
      <Box>App logo</Box>
      <Flex columnGap={16}>
        <Anchor href="/">Home</Anchor>
        <Anchor href="/cart">cart</Anchor>
      </Flex>
    </Flex>
  );
}
