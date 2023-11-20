import '@mantine/core/styles.css';
import '../global.css';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { resolver, theme } from './theme';

import { Router } from './Router';

export default function App() {
  return (
    <Provider store={store}>
      <MantineProvider theme={theme} cssVariablesResolver={resolver}>
        <Router />
      </MantineProvider>
    </Provider>
  );
}
