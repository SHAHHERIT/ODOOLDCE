import { Routes, Route, useLocation } from "react-router-dom";
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

// Routes that render their own full-bleed layout without the app chrome.
const CHROME_LESS_ROUTES = ["/", "/login"];

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
              <PageTransition>
                <Dashboard />
              </PageTransition>
            }
          />
          <Route
            path="/trips"
            element={
              <PageTransition>
                <MyTrips />
              </PageTransition>
            }
          />
          <Route
            path="/trips/:tripId"
            element={
              <PageTransition>
                <Itinerary />
              </PageTransition>
            }
          />
          <Route
            path="/explore"
            element={
              <PageTransition>
                <Explore />
              </PageTransition>
            }
          />
          <Route
            path="/calendar"
            element={
              <PageTransition>
                <CalendarPage />
              </PageTransition>
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
