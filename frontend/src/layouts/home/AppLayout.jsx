import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import SideBar from "../../components/SideBar";
import HeaderDashboard from "../../components/HeaderDashboard";
import FooterDashboard from "../../components/FooterDashboard";
import { useSelector } from "react-redux";

const AppLayout = () => {
  const nombre_usuario_actual = useSelector((state) => state);

  const current_user =
    nombre_usuario_actual.authAPISlice.current_user.ccn_employee || 0;
  if (current_user === 0) {
    window.location = `${import.meta.env.VITE_REDIRECT}/`;
  }
  return (
    <>
      {current_user != 0 ? (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-6">
          <SideBar />
          <div className=" lg:col-span-6">
            <HeaderDashboard />
            <div className="h-[90vh] overflow-y-scroll p-10 mx-auto border-gray-400 border-2">
              <Outlet />
            </div>
          </div>
          <FooterDashboard />
        </div>
      ) : null}
    </>
  );
};

export default AppLayout;
