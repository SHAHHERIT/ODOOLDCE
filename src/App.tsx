import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MyTrips from "./pages/MyTrips";
import Itinerary from "./pages/Itinerary";
import Explore from "./pages/Explore";
import CalendarPage from "./pages/CalendarPage";
import SharedItinerary from "./pages/SharedItinerary";
import { isAuthenticated } from "./lib/api";

// Routes that render their own full-bleed layout without the app chrome.
const CHROME_LESS_ROUTES = ["/", "/login"];

function RequireAuth({ children }: { children: JSX.Element }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const location = useLocation();
  const showNavbar =
    !CHROME_LESS_ROUTES.includes(location.pathname) &&
    !location.pathname.startsWith("/share");

  return (
    <div className="min-h-screen bg-navy-deep">
      {showNavbar && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <PageTransition>
                  <Dashboard />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/trips"
            element={
              <RequireAuth>
                <PageTransition>
                  <MyTrips />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/trips/:tripId"
            element={
              <RequireAuth>
                <PageTransition>
                  <Itinerary />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/explore"
            element={
              <RequireAuth>
                <PageTransition>
                  <Explore />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/calendar"
            element={
              <RequireAuth>
                <PageTransition>
                  <CalendarPage />
                </PageTransition>
              </RequireAuth>
            }
          />
          <Route
            path="/share/:tripId"
            element={
              <PageTransition>
                <SharedItinerary />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
