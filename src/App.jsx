import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './features/auth';
import AdminDashboard from './features/dashboard/admin';
import TeacherDashboard from './features/dashboard/guru';
import StudentDashboard from './features/dashboard/siswa';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/guru" element={<TeacherDashboard />} />
        <Route path="/dashboard/siswa" element={<StudentDashboard />} />

        {/* Default route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
