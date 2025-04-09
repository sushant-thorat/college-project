import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import DashboardMain from "./dashboard/DashboardMain";

const PropertyLoad = lazy(() => import("./pages/Property"));
const AboutLoad = lazy(() => import("./pages/About"));
const ContactLoad = lazy(() => import("./pages/Contact"));
const RegisterLoad = lazy(() => import("./pages/Register"));
const LoginLoad = lazy(() => import("./pages/Login"));

const App = () => {
  // const isLoggedIn = JSON.parse(localStorage.getItem("keepLoggedIn"));
  const location = useLocation();

  // Hide Navbar & Footer when inside /dashboard
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <>
      <Navbar />
      <Suspense fallback={<div>...Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property" element={<PropertyLoad />} />
          <Route path="/about" element={<AboutLoad />} />
          <Route path="/contact" element={<ContactLoad />} />
          <Route path="/register" element={<RegisterLoad />} />
          <Route path="/login" element={<LoginLoad />} />
          <Route path="/dashboard/*" element={<DashboardMain />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {!isDashboardRoute && <Footer />}
    </>
  );
};

export default App;
