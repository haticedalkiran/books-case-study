import { Button, ButtonProps, Flex, Stack, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

interface TotalPriceFooterProps {
  children?: React.ReactNode;
  totalPrice: string;
}

export default function TotalPriceDisplay({ totalPrice, children }: TotalPriceFooterProps) {
  return (
    <Flex direction="column" style={{ border: '1px solid #eee', padding: '2rem' }} gap="2rem">
      <Stack gap="xs" align="flex-end">
        <Title order={3}>Total Price</Title>
        <Title order={2} c="green">
          {totalPrice} TL
        </Title>
      </Stack>
      {children}
    </Flex>
  );
}
