import { toggleDrawer, updateCardData } from '@/store/checkout.state';
import { Flex, Stack, TextInput, Box, Button, Drawer } from '@mantine/core';
import { useFormik } from 'formik';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { object, string } from 'yup';
import DrawerFooter from '../DrawerFooter/DrawerFooter';

interface CreditCardFormProps {
  formData?: any;
}

export default function CreditCardForm({ formData }: CreditCardFormProps) {
  const dispatch = useDispatch();

  const cardNumberValidation = useMemo(
    () =>
      object().shape({
        cardNumber: string()
          .matches(/^[0-9]{16}$/, 'Credit card number must be exactly 16 digits')
          .required('Credit card number is required'),
        expirationDate: string()
          .matches(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, 'Expiration date must be in MM/YY format')
          .required('Expiration date is required'),
        cvc: string()
          .matches(/^[0-9]{3}$/, 'CVC/CVV must be 3 digits')
          .required('CVC/CVV is required'),
        nameSurname: string()
          .required('Name and Surname is required')
          .matches(/^[a-zA-Z\s]+$/, 'Name and Surname must contain only letters'),
      }),
    []
  );

  const formik = useFormik({
    initialValues: {
      cardNumber: formData?.cardNumber || '',
      expirationDate: formData?.expirationDate || '',
      cvc: formData?.cvc || '',
      nameSurname: formData?.nameSurname || '',
    },
    enableReinitialize: true,
    validationSchema: cardNumberValidation,
    onSubmit: (values) => {
      dispatch(updateCardData(values));
      dispatch(toggleDrawer());
    },
  });

  return (
    <Box>
      <Stack>
        <TextInput
          name="cardNumber"
          label="Card Number"
          placeholder="Card Number"
          value={formik.values.cardNumber}
          type="number"
          required
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={
            formik.touched.cardNumber && formik.errors.cardNumber ? formik.errors.cardNumber : ''
          }
        />
        <Flex gap={'lg'}>
          <TextInput
            name="expirationDate"
            label="Expiration Date"
            placeholder="MM/YY"
            style={{ flex: 1 }}
            value={formik.values.expirationDate}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            required
            error={
              formik.errors.expirationDate && formik.touched.expirationDate
                ? formik.errors.expirationDate
                : ''
            }
          />
          <TextInput
            type="number"
            name="cvc"
            label="CVC/CVV"
            placeholder="CVC/CVV"
            style={{ flex: 1 }}
            value={formik.values.cvc}
            required
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            maxLength={3}
            error={formik.errors.cvc && formik.touched.cvc ? formik.errors.cvc : ''}
          />
        </Flex>
        <TextInput
          name="nameSurname"
          label="Name Surname"
          placeholder="Name Surname"
          value={formik.values.nameSurname}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          required
          error={
            formik.errors.nameSurname && formik.touched.nameSurname ? formik.errors.nameSurname : ''
          }
        />
      </Stack>
      <DrawerFooter onSave={formik.handleSubmit} />
    </Box>
  );
}
