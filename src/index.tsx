import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import { QueryProvider } from './providers/QueryProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <QueryProvider>
          <App />
        </QueryProvider>
      </Provider>
    </React.StrictMode>
  </Router>,
);

reportWebVitals();
