import { Box, Button, Flex, Stack, Title, Grid, Container } from '@mantine/core';
import { useSelector } from 'react-redux';
import { CartProduct } from '@/components/CartProduct';
import { EmptyView } from '@/components/EmptyView';
import { CartItem } from '@/interfaces/cartItem.interface';

export function CartPage() {
  const cart = useSelector((state: any) => state.cart);

  if (!cart.items || cart.items.length === 0) {
    return <EmptyView />;
  }

  return (
    <>
      <Grid gutter="2rem" mb="80px">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap="lg">
            {cart.items &&
              cart.items.map((item: CartItem, index: number) => (
                <CartProduct key={index} item={item} />
              ))}
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }} display={{ base: 'none', md: 'block' }}>
          <Flex direction="column" style={{ border: '1px solid #eee', padding: '2rem' }} gap="2rem">
            <Stack gap="xs" align="flex-end">
              <Title order={3}>Total Price</Title>
              <Title order={2} c="green">
                {cart.totalPrice.toFixed(2)} TL
              </Title>
            </Stack>
            <Button w="100%">Complete Order</Button>
          </Flex>
        </Grid.Col>
      </Grid>
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
                {cart.totalPrice.toFixed(2)} TL
              </Title>
            </Stack>
            <Button>Complete Order</Button>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
