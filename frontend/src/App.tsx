import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { HomePage } from "./pages/HomePage";
import { OpeningDetailPage } from "./pages/OpeningDetailPage";
import { OpeningsPage } from "./pages/OpeningsPage";

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/openings" element={<OpeningsPage />} />
        <Route path="/openings/:id" element={<OpeningDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}