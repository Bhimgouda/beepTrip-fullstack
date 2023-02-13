import React from 'react';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import Footer from '../components/footer';
import Navbar from '../components/navbar';

export default ({user, updateUser}) => {
  return (
    <>
      <Navbar updateUser={updateUser} user={user} />
      <div className="d-flex flex-column vh-100">
        <ToastContainer />
        <main className="container container--app mt-5 mb-5">
        <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};