import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

// Layouts
import AppLayout from "./layouts/home/AppLayout";
import AuthLayout from "./layouts/auth/AuthLayout";
import CVLayout from "./layouts/formatsLayout/CVLayout";

// Pages Authorization
import Login from "./pages/auth/Login";
import ForgetPassword from "./pages/auth/ForgetPassword";
import ChangePassword from "./pages/auth/ChangePassword";

// Pages Aplication

import UsersRoles from "./pages/admin_panel/UserRoles";

import Home from "./pages/home/Home";
import AdminPanel from "./pages/admin_panel/AdminPanel";

// Page 404 Error
import Error404 from "./pages/404";
import AccessDenied from "./components/AccessDenied";
import { useSelector } from "react-redux";
import { useGetRBACByRoleQuery } from "./redux_app/services/rbacAPI";
import { InformedConsentLaw1581 } from "./components/InformedConsentLaw1581";

import { useState } from "react";

function App() {
  const nombre_usuario_actual = useSelector((state) => state);

  const current_user =
    nombre_usuario_actual.authAPISlice.current_user.ccn_employee || 0;
  const ccn_role =
    nombre_usuario_actual.authAPISlice.access_level.ccn_role || 1;

  const {
    data: list_rbac_by_role,
    isLoading: is_loading_rbac_by_role,
    isError: is_error_role_rbac_by_role,
    error,
    isSuccess,
  } = useGetRBACByRoleQuery(ccn_role, { skip: false });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="change-password/:token" element={<ChangePassword />} />
        </Route>
        <Route path="/home" element={<AppLayout />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/administration-panel" element={<AppLayout />}>
          <Route
            index
            element={
              list_rbac_by_role ? (
                list_rbac_by_role.rbacByRole[0].read_access ? (
                  <AdminPanel />
                ) : (
                  <AccessDenied />
                )
              ) : null
            }
          />
        </Route>

        <Route path="/administration-panel/users-roles" element={<AppLayout />}>
          <Route
            index
            element={
              list_rbac_by_role ? (
                list_rbac_by_role.rbacByRole[0].read_access ? (
                  <UsersRoles />
                ) : (
                  <AccessDenied />
                )
              ) : null
            }
          />
        </Route>

        <Route path="/informedConsent-law-1581" element={<AppLayout />}>
          <Route index element={<InformedConsentLaw1581 />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
