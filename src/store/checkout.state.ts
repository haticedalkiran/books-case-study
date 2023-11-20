import { AddressFormElements } from '@/interfaces/address-form-elements.interface';
import { CreditCard } from '@/interfaces/credit-card.interface';
import { createSlice } from '@reduxjs/toolkit';

//it helps to check if the user has filled both address and credit card forms, and if so, it enables the checkout button
//TODO: Is it enough to check only one key from each form?
function canCompleteOrder(state: CheckoutInfState): boolean {
  const { addressFormData, creditCardFormData } = state;
  const isAddressComplete =
    addressFormData.city !== '' &&
    addressFormData.address !== '' &&
    addressFormData.district !== '' &&
    addressFormData.email !== '' &&
    addressFormData.name !== '' &&
    addressFormData.phone !== '' &&
    addressFormData.surname !== '';

  const isCardComplete =
    creditCardFormData.cardNumber !== '' &&
    creditCardFormData.expirationDate !== '' &&
    creditCardFormData.cvc !== '';
  creditCardFormData.nameSurname !== '';

  const isAgreedToTerms = state.agreedToTerms;

  return isAddressComplete && isCardComplete && isAgreedToTerms;
}

interface CheckoutInfState {
  addressFormData: AddressFormElements;
  creditCardFormData: CreditCard;
  drawerOpened: boolean;
  isCheckoutEnabled: boolean;
  agreedToTerms: boolean;
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
  drawerOpened: false,
  isCheckoutEnabled: false,
  agreedToTerms: false,
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    updateAddressData: (state, action) => {
      state.addressFormData = action.payload;
      state.isCheckoutEnabled = canCompleteOrder(state);
    },

    updateCardData: (state, action) => {
      state.creditCardFormData = action.payload;
      state.isCheckoutEnabled = canCompleteOrder(state);
    },
    toggleDrawer: (state) => {
      state.drawerOpened = !state.drawerOpened;
    },
    toggleAgreedToTerms: (state) => {
      state.agreedToTerms = !state.agreedToTerms;
      state.isCheckoutEnabled = canCompleteOrder(state);
    },
  },
});

export const { updateAddressData, updateCardData, toggleDrawer, toggleAgreedToTerms } =
  checkoutSlice.actions;

export default checkoutSlice.reducer;
