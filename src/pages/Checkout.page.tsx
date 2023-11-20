import { useEffect, useState } from 'react';
import { Button, Group, Text, Stack, Flex, Title, Grid, GridCol, Drawer } from '@mantine/core';
import { useSelector } from 'react-redux';
import AddressForm from '@/components/AddressForm/AddressForm';
import CreditCardForm from '@/components/CreditCardForm/CreditCardForm';
export default function Checkout() {
  const cart = useSelector((state: any) => state.cart);
  const address = useSelector((state: any) => state.checkout.addressFormData);
  const card = useSelector((state: any) => state.checkout.creditCardFormData);

  const [activeForm, setActiveForm] = useState(1);
  const [addressDrawerOpened, setDrawerOpened] = useState(false);

  const drawerToggleHandler = (form: number) => {
    setActiveForm(form);
    setDrawerOpened((prev) => !prev);
  };
  useEffect(() => {
    console.log('2*200202address', address);
    console.log('2020202card', card);
  }, [address, card]);

  return (
    <>
      <Grid>
        <GridCol span={8}>
          <Stack gap={'lg'}>
            <Stack style={{ border: '1px solid gray' }}>
              <Group>
                <Title order={3}>Address Details</Title>
                <Text size={'sm'} c="orange" onClick={() => drawerToggleHandler(1)}>
                  {address.city === '' ? 'Add' : 'Edit'}
                </Text>
              </Group>
              <>
                {address.city === '' ? (
                  <>
                    <Text c="dimmed">Please add address</Text>
                  </>
                ) : (
                  <Stack gap="xs">
                    <Text>{address.city === ''}</Text>
                    <Text>{address.address}</Text>
                    <Text>
                      {address.district} {address.city}
                    </Text>
                  </Stack>
                )}
              </>
            </Stack>

            <Stack style={{ border: '1px solid gray' }}>
              <Group>
                <Title order={3}>Payment</Title>
                <Text size={'sm'} c="orange" onClick={() => drawerToggleHandler(2)}>
                  {card.cardNumber === '' ? 'Add' : 'Edit'}
                </Text>
              </Group>
              <>
                {card.cardNumber === '' ? (
                  <>
                    <Text c="dimmed">Please add credit card</Text>
                  </>
                ) : (
                  <Stack gap="xs">
                    <Text>{card.cardNumber}</Text>
                  </Stack>
                )}
              </>
            </Stack>
          </Stack>
        </GridCol>
        <GridCol span={4}>
          <Flex direction="column" style={{ border: '1px solid #eee', padding: '2rem' }} gap="2rem">
            <Stack gap="xs" align="flex-end">
              <Title order={3}>Total Price</Title>
              <Title order={2} c="green">
                {cart.totalPrice.toFixed(2)} TL
              </Title>
            </Stack>

            <Button disabled={true}>Complete Order</Button>
          </Flex>
        </GridCol>
      </Grid>
      <Drawer
        opened={addressDrawerOpened}
        onClose={() => setDrawerOpened(false)}
        position="right"
        title={activeForm === 1 ? 'Edit Address' : 'Edit Card Details'}
      >
        {activeForm === 1 ? <AddressForm /> : <CreditCardForm />}
      </Drawer>
    </>
  );
}
