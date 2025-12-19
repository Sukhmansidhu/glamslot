import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import BookingPage from "./pages/BookingPage";
import MyBookings from "./pages/MyBookings";
import SalonFinder from "./pages/SalonFinder";
import FollowUs from "./pages/FollowUs";
import GiftCards from "./pages/GiftCards";
import ReferFriend from "./pages/ReferFriend";
import OurStory from "./pages/OurStory";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Payments from "./pages/Payments";
import Orders from "./pages/Orders";

import AdminOrders from "./pages/AdminOrders";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAddService from "./pages/AdminAddService";
import AdminAddStaff from "./pages/AdminAddStaff";
import EditStaff from "./pages/EditStaff";
import AvailabilityManager from "./pages/AvailabilityManager";
import AdminBookings from "./pages/AdminBookings";
import AdminAddSalon from "./pages/AdminAddSalon";
import AdminReferrals from "./pages/AdminReferrals";

import Navbar from "./components/Navbar";
import RequireAdmin from "./components/AdminRoute";
import PageLayout from "./layouts/PageLayout";

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageLayout key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book/:id" element={<BookingPage />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/salons" element={<SalonFinder />} />
          <Route path="/follow-us" element={<FollowUs />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/gift-cards" element={<GiftCards />} />
          <Route path="/refer" element={<ReferFriend />} />

          {/* ADMIN */}
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminDashboard />
              </RequireAdmin>
            }
          />

          <Route
            path="/admin/bookings"
            element={
              <RequireAdmin>
                <AdminBookings />
              </RequireAdmin>
            }
          />

          <Route
            path="/admin/services/add"
            element={
              <RequireAdmin>
                <AdminAddService />
              </RequireAdmin>
            }
          />

          <Route
            path="/admin/staff/add"
            element={
              <RequireAdmin>
                <AdminAddStaff />
              </RequireAdmin>
            }
          />

          <Route
            path="/admin/staff/edit/:id"
            element={
              <RequireAdmin>
                <EditStaff />
              </RequireAdmin>
            }
          />

          <Route
            path="/admin/availability/:staffId"
            element={
              <RequireAdmin>
                <AvailabilityManager />
              </RequireAdmin>
            }
          />

          <Route
            path="/admin/salons/add"
            element={
              <RequireAdmin>
                <AdminAddSalon />
              </RequireAdmin>
            }
          />

          <Route
            path="/admin/referrals"
            element={
              <RequireAdmin>
                <AdminReferrals />
              </RequireAdmin>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <RequireAdmin>
                <AdminOrders />
              </RequireAdmin>
            }
          />
        </Routes>
      </PageLayout>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;