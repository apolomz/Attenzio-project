import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Cursos from './pages/Cursos';
import Sesiones from './pages/Sesiones';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/cursos" element={<PrivateRoute><Cursos /></PrivateRoute>} />
          <Route path="/sesiones" element={<PrivateRoute><Sesiones /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}