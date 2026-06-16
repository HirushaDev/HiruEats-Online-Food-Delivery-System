
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './Components/Home';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';

const App = () => {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={2500} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
