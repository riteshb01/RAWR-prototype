import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'zustand';
import create from 'zustand';
import { uiStore } from './dashboard/store/uiStore';

const queryClient = new QueryClient();

const store = create(uiStore);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);