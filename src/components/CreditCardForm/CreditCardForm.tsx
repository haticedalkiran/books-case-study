import { updateCardData } from '@/store/checkout.state';
import { Flex, Stack, Text, TextInput, Box, Button, NumberInput } from '@mantine/core';
import { useFormik } from 'formik';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { number, object, string } from 'yup';

interface CreditCardFormProps {
  formData?: any;
}
export default function CreditCardForm({ formData }: CreditCardFormProps) {
  const dispatch = useDispatch();
  const cardNumberValidation = useMemo(
    () =>
      object().shape({
        cardNumber: string().required('Card number is required'),
        expirationDate: string().required('Expiration date is required'),
        cvc: string().required('CVC/CVV is required'),
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
    onSubmit: (values) => {
      dispatch(updateCardData(values));
    },
  });

  return (
    <Box>
      {' '}
      <Stack>
        <TextInput
          name="cardNumber"
          label="Card Number"
          placeholder="Card Number"
          value={formik.values.cardNumber}
          required
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          maxLength={16}
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
          />
          <TextInput
            name="cvc"
            label="CVC/CVV"
            placeholder="CVC/CVV"
            style={{ flex: 1 }}
            value={formik.values.cvc}
            required
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            maxLength={3}
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
        />
      </Stack>
      <Flex pos={'fixed'} bottom={0} py="lg" right={'1rem'} gap={'lg'}>
        <Button variant="outline">Cancel</Button>
        <Button onClick={formik.submitForm}>Save</Button>
      </Flex>
    </Box>
  );
}
