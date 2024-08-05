import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AdminApp from './AdminApp';
import { BrowserRouter as Router } from 'react-router-dom';
import { AdminGlobalDataProvider } from './Admin/AdminGlobalDataProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const Main = () => {
  const path = window.location.pathname;

  // Check if the path starts with /admin
  if (path.startsWith('/admin')) {
    return <AdminGlobalDataProvider>
      <AdminApp />
    </AdminGlobalDataProvider>
  }

  // Default to main App
  return <App />;
};


root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
