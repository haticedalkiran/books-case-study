import { Button, Stack, Text } from '@mantine/core';
import { ShoppingCart } from 'tabler-icons-react';

export function EmptyView() {
  return (
    <Stack align="center">
      <ShoppingCart size={48} />
      <Text>Nothing here yet. Time for some shopping!</Text>
      <Button variant="outline">GO BACK TO STORE</Button>
    </Stack>
  );
}
