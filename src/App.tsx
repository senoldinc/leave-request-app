import React from 'react';
import { AppProviders } from './providers/AppProviders';
import { LeaveRequestPage } from './pages/LeaveRequestPage';
import './index.css';

function App() {
  return (
    <AppProviders>
      <LeaveRequestPage />
    </AppProviders>
  );
}

export default App;
