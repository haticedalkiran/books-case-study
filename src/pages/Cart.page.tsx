import { Button, Stack, Grid } from '@mantine/core';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CartProduct } from '@/components/CartProduct';
import { EmptyView } from '@/components/EmptyView';
import { CartItem } from '@/interfaces/cartItem.interface';
import TotalPriceDisplay from '@/components/TotalPriceDisplay/TotalPriceDisplay';
import TotalPriceDisplayFooter from '@/components/TotalPriceDisplayFooter/TotalPriceDisplayFooter';
import { RootState } from '@/store/store';

export function CartPage() {
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);

  if (!items || items.length === 0) {
    return <EmptyView />;
  }

  return (
    <>
      <Grid gutter="2rem" mb="80px">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap="lg">
            {items &&
              items.map((item: CartItem, index: number) => <CartProduct key={index} item={item} />)}
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }} display={{ base: 'none', md: 'block' }}>
          <TotalPriceDisplay totalPrice={totalPrice.toFixed(2)}>
            <Button component={Link} to="/checkout">
              Proceed to Checkout
            </Button>
          </TotalPriceDisplay>
        </Grid.Col>
      </Grid>
      <TotalPriceDisplayFooter totalPrice={totalPrice.toFixed(2)}>
        <Button component={Link} to="/checkout">
          Proceed to Checkout
        </Button>
      </TotalPriceDisplayFooter>
    </>
  );
}
