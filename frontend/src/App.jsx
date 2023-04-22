import React, { useState } from 'react';
import { BuildingForm } from './components/Forms';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <BuildingForm />
      <ToastContainer />
    </div>
  )
}

export default App
