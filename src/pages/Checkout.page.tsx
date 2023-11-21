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
import TotalPriceFooter from '@/components/TotalPriceDisplay/TotalPriceDisplay';
import TotalPriceDisplay from '@/components/TotalPriceDisplay/TotalPriceDisplay';
import TotalPriceDisplayFooter from '@/components/TotalPriceDisplayFooter/TotalPriceDisplayFooter';

export default function Checkout() {
  const cart = useSelector((state: any) => state.cart);

  const { addressFormData, creditCardFormData, drawerOpened, isCheckoutEnabled, agreedToTerms } =
    useSelector((state: any) => state.checkout);

  const [orderCompleted, setOrderCompleted] = useState(false);
  const [activeForm, setActiveForm] = useState(1);
  const [visible, { toggle }] = useDisclosure(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
                  {addressFormData.city === '' ? 'Add' : 'Edit'}
                </Text>
              </Group>
              <>
                {addressFormData.city === '' ? (
                  <>
                    <Text c="dimmed">Please add address</Text>
                  </>
                ) : (
                  <Stack gap="xs" p="md" style={{ border: '1px solid #eee' }}>
                    <Text fw={500}>
                      {addressFormData.name} {addressFormData.surname}
                    </Text>
                    <Text lineClamp={1}>
                      {addressFormData.address} {addressFormData.district}/{addressFormData.city}
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
                  {creditCardFormData.cardNumber === '' ? 'Add' : 'Edit'}
                </Text>
              </Group>
              <>
                {creditCardFormData.cardNumber === '' ? (
                  <>
                    <Text c="dimmed">Please add credit card</Text>
                  </>
                ) : (
                  <Stack gap="xs" p="md" style={{ border: '1px solid #eee' }}>
                    <Text fw={500}>{creditCardFormData.nameSurname}</Text>

                    <Text>
                      **** **** **** {creditCardFormData.cardNumber.toString().substring(12)}
                    </Text>
                  </Stack>
                )}
              </>
            </Stack>
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, md: 4 }} display={{ base: 'none', md: 'block' }}>
          <TotalPriceDisplay totalPrice={cart.totalPrice.toFixed(2)}>
            <Checkbox
              checked={agreedToTerms}
              onChange={agreeToTermsHandler}
              label="I agree terms and conditions"
            />
            <Button disabled={!isCheckoutEnabled} onClick={completeOrderHandler}>
              Complete Order
            </Button>
          </TotalPriceDisplay>
        </GridCol>
      </Grid>
      <Checkbox
        mt={'lg'}
        display={{ base: 'block', md: 'none' }}
        checked={agreedToTerms}
        onChange={agreeToTermsHandler}
        label="I agree terms and conditions"
      />

      <TotalPriceDisplayFooter
        totalPrice={cart.totalPrice.toFixed(2)}
        children={
          <Button disabled={!isCheckoutEnabled} onClick={completeOrderHandler}>
            Complete Order
          </Button>
        }
      />

      <Drawer
        opened={drawerOpened}
        onClose={() => dispatch(toggleDrawer())}
        position="right"
        title={activeForm === 1 ? 'Edit Address' : 'Edit Card Details'}
      >
        {activeForm === 1 ? (
          <AddressForm formData={addressFormData} />
        ) : (
          <CreditCardForm formData={creditCardFormData} />
        )}
      </Drawer>
    </>
  );
}
