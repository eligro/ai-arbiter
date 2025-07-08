import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import NewConflictPage from './pages/NewConflictPage';

function App() {
  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/conflicts/new" element={<NewConflictPage />} />
          {/* Example for a specific conflict room: /conflicts/uuid */}
          {/* <Route path="/conflicts/:id" element={<ConflictRoomPage />} /> */}
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
