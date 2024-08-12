import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from '../modules/authentication/Login/Login';
import Signup from '../modules/authentication/RegisterUser/Signup';


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Signup />
                    } />
                <Route
                     path="/login"
                     element={
                        <Login />
                    } />
            </Routes>
        </BrowserRouter>
    )
}
