import { Routes, Route } from 'react-router-dom';
import { LoginPage, RegisterPage, DashboardPage } from './pages';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
