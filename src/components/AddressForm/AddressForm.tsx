import { Stack, TextInput, Select, Textarea, Group, Button, Flex } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDrawer, updateAddressData } from '@/store/checkout.state';
import CityList from '../../mock/cities-districts.json';
import { AddressFormElements } from '@/interfaces/address-form-elements.interface';

interface AddressFormProps {
  formData?: AddressFormElements;
}
export default function AddressForm({ formData }: AddressFormProps) {
  const [districts, setDistricts] = useState([{ value: '', label: '' }]);
  const dispatch = useDispatch();
  const address = useSelector((state: any) => state.checkout);

  const citiesDdOptions = CityList.map((city) => ({
    value: city.value.toString(),
    label: city.text,
  }));

  const addressValidationSchema = useMemo(
    () =>
      object().shape({
        name: string().required('Required'),
        surname: string().required('Required'),
        email: string().email('Invalid email format').required('Required'),
        phone: string().required('Required'),
        city: string().required('Required'),
        district: string().required('Required'),
        address: string().required('Required'),
      }),

    []
  );

  const formik = useFormik({
    initialValues: {
      name: formData?.name || '',
      surname: formData?.surname || '',
      email: formData?.email || '',
      phone: formData?.phone || '',
      city: formData?.city || '',
      district: formData?.district || '',
      address: formData?.address || '',
    },
    enableReinitialize: true,
    validationSchema: addressValidationSchema,
    onSubmit: (values) => {
      values.city = citiesDdOptions.filter((city) => city.value === values.city)[0].label;
      values.district = districts.filter((dist) => dist.value === values.district)[0].label;

      dispatch(updateAddressData(values));
    },
  });

  useEffect(() => {
    if (formik.values.city !== '') {
      const selectedCity = CityList.find((city) => city.value.toString() === formik.values.city);
      if (selectedCity && selectedCity.districts) {
        const distList = selectedCity.districts.map((district) => ({
          value: district.value.toString(),
          label: district.text,
        }));
        setDistricts(distList);
      } else {
        setDistricts([]);
      }
    }
  }, [formik.values.city]);

  return (
    <div>
      <Stack>
        <Group>
          <TextInput
            name="name"
            label="Delivery Recipient"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ flex: '1' }}
            required
            error={formik.errors.name && formik.touched.name && formik.errors.name}
          />
          <TextInput
            name="surname"
            label="&nbsp;"
            placeholder="Surname"
            value={formik.values.surname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ flex: '1' }}
            required
            withAsterisk={false}
            error={formik.errors.surname && formik.touched.surname && formik.errors.surname}
          />
        </Group>
        <TextInput
          name="email"
          label="Email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
          error={formik.errors.email && formik.touched.email && formik.errors.email}
        />
        <TextInput
          name="phone"
          label="Phone"
          placeholder="Phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
          error={formik.errors.phone && formik.touched.phone && formik.errors.phone}
        />
        <Select
          data={citiesDdOptions}
          label="City"
          onChange={(e) => formik.setFieldValue('city', e)}
          searchable
          placeholder="City"
          required
          error={formik.errors.city && formik.touched.city && formik.errors.city}
        />
        {formik.values.city && districts && (
          <Select
            data={districts}
            label="District"
            searchable
            onChange={(e) => formik.setFieldValue('district', e)}
            placeholder="District"
            required
            error={formik.errors.district && formik.touched.district && formik.errors.district}
          />
        )}
        <Textarea
          name="address"
          label="Address"
          placeholder="Address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
          error={formik.errors.address && formik.touched.address && formik.errors.address}
        />
      </Stack>

      <Flex pos="fixed" bottom="0" py="lg" right="1rem" gap="lg">
        <Button variant="outline" onClick={() => dispatch(toggleDrawer())}>
          Cancel
        </Button>
        <Button onClick={formik.submitForm}>Save</Button>
      </Flex>
    </div>
  );
}
