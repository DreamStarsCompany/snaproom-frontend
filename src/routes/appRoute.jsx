import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { routes } from ".";
import { ToastContainer } from "react-toastify";

import Login from "../pages/both/Login";
import AdminDashboard from "../pages/admin/AdminDashboard"
import Dashboard from "../pages/partner/Dashboard"

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default function appRoute() {
    return (
        <div>

            <ToastContainer />
            <ScrollToTop />
            <Routes>
                <Route path={routes.login} element={<Login />} />
                <Route path={routes.adminDashboard} element={<AdminDashboard />} />
                <Route path={routes.partnerDashboard} element={<Dashboard />} />
            </Routes>

        </div>
    )
}

