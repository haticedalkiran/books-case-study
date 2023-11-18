import { Button, Stack, Text } from '@mantine/core';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'tabler-icons-react';

export function EmptyView() {
  let navigate = useNavigate();

  const routeChange = () => {
    navigate('/');
  };

  return (
    <Stack align="center">
      <ShoppingCart size={48} />
      <Text>Nothing here yet. Time for some shopping!</Text>
      <Button variant="outline" onClick={routeChange}>
        GO BACK TO STORE
      </Button>
    </Stack>
  );
}
