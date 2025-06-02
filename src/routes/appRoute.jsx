import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { routes } from ".";
import { ToastContainer } from "react-toastify";

import ProtectedRoute from "../ProtectedRoute";
import Login from "../pages/both/Login";
import AdminDashboard from "../pages/admin/AdminDashboard"
import AdminFurniture from "../pages/admin/AdminFurniture";
import AdminDesign from "../pages/admin/AdminDesign";
import Dashboard from "../pages/partner/Dashboard"
import Register from "../pages/partner/Register";
import Landing from "../pages/both/Landing"

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
                <Route path={routes.landing} element={<Landing />} />
                <Route path={routes.login} element={<Login />} />
                <Route path={routes.register} element={<Register/>}/>
                
                <Route path={routes.adminDashboard} element={<ProtectedRoute allowedRoles={["Admin"]}><AdminDashboard /></ProtectedRoute>} />
                <Route path={routes.adminFurniture} element={<ProtectedRoute allowedRoles={["Admin"]}><AdminFurniture /></ProtectedRoute>} /> 
                <Route path={routes.adminDesign} element={<ProtectedRoute allowedRoles={["Admin"]}><AdminDesign /></ProtectedRoute>} /> 

                <Route path={routes.partnerDashboard} element={<ProtectedRoute allowedRoles={["Designer"]}><Dashboard /></ProtectedRoute>} />
            </Routes>

        </div>
    )
}

