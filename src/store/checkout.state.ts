import { AddressFormElements } from '@/interfaces/address-form-elements.interface';
import { CreditCard } from '@/interfaces/credit-card.interface';
import { createSlice } from '@reduxjs/toolkit';

interface CheckoutInfState {
  addressFormData: AddressFormElements;
  creditCardFormData: CreditCard;
}

const initialState: CheckoutInfState = {
  addressFormData: {
    name: '',
    surname: '',
    email: '',
    phone: '',
    city: '',
    district: '',
    address: '',
  },
  creditCardFormData: {
    cardNumber: '',
    expirationDate: '',
    cvc: '',
    nameSurname: '',
  },
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    updateAddressData: (state, action) => {
      state.addressFormData = action.payload;
    },

    updateCardData: (state, action) => {
      state.creditCardFormData = action.payload;
    },
  },
});

export const { updateAddressData, updateCardData } = checkoutSlice.actions;

export default checkoutSlice.reducer;
