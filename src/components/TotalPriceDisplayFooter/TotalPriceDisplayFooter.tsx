import { Box, Button, Flex, Stack, Title, Container } from '@mantine/core';
import { Link } from 'react-router-dom';

interface TotalPriceFooterProps {
  children?: React.ReactNode;
  totalPrice: string;
}

export default function TotalPriceDisplayFooter({ totalPrice, children }: TotalPriceFooterProps) {
  return (
    <Box
      display={{ base: 'block', md: 'none' }}
      pos="fixed"
      left="0"
      bottom="0"
      bg="var(--mantine-color-body)"
      w="100%"
      py="0.5rem"
      style={{ borderTop: '1px solid var(--mantine-color-default-border)' }}
    >
      <Container>
        <Flex justify="space-between" align="center">
          <Stack gap={0}>
            <Title order={4}>Total Price</Title>
            <Title order={3} c="green">
              {totalPrice} TL
            </Title>
          </Stack>
          {children}
        </Flex>
      </Container>
    </Box>
  );
}
