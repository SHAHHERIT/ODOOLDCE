import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Bell, Compass } from "lucide-react";
import { logout } from "../lib/api";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/trips", label: "My Trips" },
  { to: "/explore", label: "Explore" },
  { to: "/calendar", label: "Calendar" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-navy-deep/80 backdrop-blur-md border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <NavLink to="/dashboard" className="flex items-center gap-2">
          <Compass size={22} className="text-brass" strokeWidth={1.5} />
          <span className="font-display text-lg font-semibold tracking-wide text-ivory">
            GlobeTrotter
          </span>
        </NavLink>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative text-sm font-medium transition-colors ${
                  isActive ? "text-ivory" : "text-muted hover:text-ivory"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-2 left-0 h-px w-full bg-brass" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <button
            aria-label="Notifications"
            className="text-muted transition-colors hover:text-ivory"
          >
            <Bell size={19} strokeWidth={1.5} />
          </button>
          <button className="h-9 w-9 rounded-full bg-gradient-to-br from-brass to-brass-dim text-sm font-semibold text-navy-deep">
            BS
          </button>
          <button onClick={handleLogout} className="text-sm text-muted transition-colors hover:text-ivory">
            Logout
          </button>
        </div>

        <button
          className="text-ivory md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-white/[0.06] bg-navy-deep/95 px-6 py-6 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `text-base font-medium ${
                    isActive ? "text-brass" : "text-muted"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-white/[0.06] pt-5">
              <span className="text-sm text-muted">Bhargav Shah</span>
              <button onClick={handleLogout} className="text-sm text-muted">Logout</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
