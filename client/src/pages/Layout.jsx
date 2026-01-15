import React from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div>  
            <Header />   
            <div style={{marginTop:"100px"}}>
            <Outlet />  
            </div>
            <Footer />

        </div>
    );
}

