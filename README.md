# CODEXIST CASE STUDY

In this project, I use Mantine [vite-template](https://github.com/mantinedev/vite-template).
This template comes with the following features:

- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [TypeScript](https://www.typescriptlang.org/)
- [Storybook](https://storybook.js.org/)
- [Vitest](https://vitest.dev/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- ESLint setup with [eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine)

Additional:

- [Redux Toolkit](https://redux-toolkit.js.org/)

## Build and dev scripts

- `dev` – start development server
- `build` – build production version of the app
- `preview` – locally preview production build

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `vitest` – runs vitest tests
- `vitest:watch` – starts vitest watch
- `test` – runs `vitest`, `prettier:check`, `lint` and `typecheck` scripts

## Design

This project uses Mantine's AppShell for responsive design layout. In the `<AppShell.Main>` component, I use an `<Outlet/>` from `react-router-dom`. This allows for the dynamic rendering of pages and routes as children inside the Appshell.

`Home.page` focused on book searching and listing. When the page loads, it automatically fetches book related to "science-fictions". It used as default value because API needs a non-empty query. Otherwise it throws an 404 error.
The search results are displayed as a `Grid.Col` of `BookCard` component and each linking to a detail page of the book. The page have a notification system that alerts users when a book is successfully added to their cart.

`BookDetail.page` displays detailed information about a book. In this page users can view details about a book including its title, authors and more. The page also have same notification system that `home.page` has.

`Cart.page` list the cart items, each represented by a CartProduct component. Tthe `<EmptyView/>` component is rendered when the cart is empty. Total price of the cart items is displayed using the `<TotalPriceDisplay/>` or `<TotalPriceDisplayFooter/>` components according to the screen size.

`Checkout.page` has fields where users can review and edit their address and credit card details. AddressForm and CreditCardForm components helps users to modify their address and payment information. To complete the checkout process, users have to fill all the fields of both forms and mark "terms and conditions" checkbox. This actions enable the 'Complete Order' button. If these conditions are not met, the button remains disabled.

This app uses Redux Toolkit for efficient state management with RTK Query for data fetching. RTK's features are used nearly all compoennts to efficient handling of complex state management
