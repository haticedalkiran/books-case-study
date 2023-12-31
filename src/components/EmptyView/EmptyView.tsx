import { Button, Stack, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'tabler-icons-react';

export function EmptyView() {
  return (
    <Stack align="center">
      <ShoppingCart size={48} />
      <Text>Nothing here yet. Time for some shopping!</Text>
      <Button variant="outline" component={Link} to="/">
        GO BACK TO STORE
      </Button>
    </Stack>
  );
}
