import React from 'react';
import AppRoutes from './routes/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <div>
      <AppRoutes />
      <Toaster />
    </div>
  )
}
