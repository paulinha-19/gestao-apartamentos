import React, { useState } from 'react';
import { BuildingForm, ApartmentForm } from './components/Forms';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <BuildingForm />
      <ApartmentForm />
      <ToastContainer />
    </div>
  )
}

export default App
