import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AppLayout from "@/layouts/AppLayout";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import Architecture from "@/pages/Architecture";

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/architecture" element={<Architecture />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
