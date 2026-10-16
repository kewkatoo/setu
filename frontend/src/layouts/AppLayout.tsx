import { NavLink, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { Waves } from "lucide-react";

const links = [
  { to: "/", label: "Overview" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/architecture", label: "Architecture" },
];

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50">
        <div className="container-page pt-4">
          <nav className="glass rounded-2xl px-5 py-3 flex items-center justify-between">
            <NavLink to="/" className="flex items-center gap-2 font-display font-semibold text-lg tracking-tight">
              <span className="grid place-items-center w-8 h-8 rounded-xl bg-signal/10 text-signal-dark">
                <Waves size={18} strokeWidth={2.5} />
              </span>
              SETU
            </NavLink>
            <div className="flex items-center gap-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                      isActive ? "text-ink" : "text-ink/50 hover:text-ink/80"
                    }`
                  }
                >
                  {({ isActive }: { isActive: boolean }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 bg-white rounded-full shadow-sm"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="container-page py-10 text-sm text-ink/40 flex flex-col md:flex-row gap-2 items-center justify-between">
        <span>© {new Date().getFullYear()} SETU — Adaptive Environmental Awareness System</span>
        <span>Built for Deaf and Hard-of-Hearing communities</span>
      </footer>
    </div>
  );
}
