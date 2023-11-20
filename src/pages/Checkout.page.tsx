import { useEffect, useState } from 'react';
import {
  Button,
  Group,
  Text,
  Stack,
  Flex,
  Title,
  Grid,
  GridCol,
  Drawer,
  Notification,
  Checkbox,
  Box,
  LoadingOverlay,
  Container,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import AddressForm from '@/components/AddressForm/AddressForm';
import CreditCardForm from '@/components/CreditCardForm/CreditCardForm';
import { toggleAgreedToTerms, toggleDrawer } from '@/store/checkout.state';
import { Link, useNavigate } from 'react-router-dom';
import { removeAllItemsFromCart } from '@/store/cart.state';
import { ArrowLeft } from 'tabler-icons-react';
import { useDisclosure } from '@mantine/hooks';

export default function Checkout() {
  const cart = useSelector((state: any) => state.cart);
  const address = useSelector((state: any) => state.checkout.addressFormData);
  const card = useSelector((state: any) => state.checkout.creditCardFormData);
  const drawerOpened = useSelector((state: any) => state.checkout.drawerOpened);
  const isCheckoutEnabled = useSelector((state: any) => state.checkout.isCheckoutEnabled);
  const isAgreedToTerms = useSelector((state: any) => state.checkout.agreedToTerms);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [activeForm, setActiveForm] = useState(1);
  const [visible, { toggle }] = useDisclosure(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [addressDrawerOpened, setDrawerOpened] = useState(false);

  const drawerToggleHandler = (form: number) => {
    setActiveForm(form);

    dispatch(toggleDrawer());
  };
  const agreeToTermsHandler = () => {
    dispatch(toggleAgreedToTerms());
  };

  const completeOrderHandler = () => {
    dispatch(removeAllItemsFromCart());
    setOrderCompleted(true);
    toggle();

    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  useEffect(() => {
    if (cart.totalPrice === 0) {
      toggle();
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, []);

  return (
    <>
      <Box
        pos="absolute"
        left="0"
        right={0}
        bottom={0}
        top="0"
        display={visible ? 'block' : 'none'}
      >
        <LoadingOverlay visible={visible} zIndex={1} overlayProps={{ radius: 'sm', blur: 2 }} />
      </Box>
      {orderCompleted && (
        <Box pos="absolute" right={0} style={{ zIndex: 10 }}>
          <Notification withCloseButton={false}> Your order completed successfully</Notification>
        </Box>
      )}
      <Button
        component={Link}
        to="/cart"
        leftSection={<ArrowLeft size={14} />}
        variant="transparent"
        c="dimmed"
      >
        Back to cart
      </Button>
      <Grid>
        <GridCol span={{ base: 12, md: 8 }}>
          <Stack gap={'lg'}>
            <Stack
              style={{
                border: '1px solid #eee',
              }}
              p="lg"
            >
              <Group align="baseline">
                <Title order={3} c="orange" lh={'lg'}>
                  Address Details
                </Title>
                <Text size={'sm'} c="dimmed" onClick={() => drawerToggleHandler(1)} lh={'lg'}>
                  {address.city === '' ? 'Add' : 'Edit'}
                </Text>
              </Group>
              <>
                {address.city === '' ? (
                  <>
                    <Text c="dimmed">Please add address</Text>
                  </>
                ) : (
                  <Stack gap="xs" p="md" style={{ border: '1px solid #eee' }}>
                    <Text fw={500}>
                      {address.name} {address.surname}
                    </Text>
                    <Text lineClamp={1}>
                      {address.address} {address.district}/{address.city}
                    </Text>
                  </Stack>
                )}
              </>
            </Stack>

            <Stack style={{ border: '1px solid #eee' }} p="lg">
              <Group align="baseline">
                <Title order={3} c="orange">
                  Payment
                </Title>
                <Text size={'sm'} c="dimmed" onClick={() => drawerToggleHandler(2)}>
                  {card.cardNumber === '' ? 'Add' : 'Edit'}
                </Text>
              </Group>
              <>
                {card.cardNumber === '' ? (
                  <>
                    <Text c="dimmed">Please add credit card</Text>
                  </>
                ) : (
                  <Stack gap="xs" p="md" style={{ border: '1px solid #eee' }}>
                    <Text fw={500}>{card.nameSurname}</Text>
                    <Text>**** **** **** {card.cardNumber.substr(card.cardNumber.length - 4)}</Text>
                  </Stack>
                )}
              </>
            </Stack>
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, md: 4 }} display={{ base: 'none', md: 'block' }}>
          <Flex direction="column" style={{ border: '1px solid #eee', padding: '2rem' }} gap="2rem">
            <Stack gap="xs" align="flex-end">
              <Title order={3}>Total Price</Title>
              <Title order={2} c="green">
                {cart.totalPrice.toFixed(2)} TL
              </Title>
            </Stack>

            <Checkbox
              checked={isAgreedToTerms}
              onChange={agreeToTermsHandler}
              label="I agree terms and conditions"
            />
            <Button disabled={!isCheckoutEnabled} onClick={completeOrderHandler}>
              Complete Order
            </Button>
          </Flex>
        </GridCol>
      </Grid>
      <Checkbox
        mt={'lg'}
        display={{ base: 'block', md: 'none' }}
        checked={isAgreedToTerms}
        onChange={agreeToTermsHandler}
        label="I agree terms and conditions"
      />
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
            <Button disabled={!isCheckoutEnabled} onClick={completeOrderHandler}>
              Complete Order
            </Button>
          </Flex>
        </Container>
      </Box>
      <Drawer
        opened={drawerOpened}
        onClose={() => dispatch(toggleDrawer())}
        position="right"
        title={activeForm === 1 ? 'Edit Address' : 'Edit Card Details'}
      >
        {activeForm === 1 ? <AddressForm /> : <CreditCardForm />}
      </Drawer>
    </>
  );
}
