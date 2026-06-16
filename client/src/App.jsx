
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './Components/Home';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';
import UserHome from './Pages/UserHome';
import VerifyEmail from './Pages/VerifyEmail';

const App = () => {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={2500} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </div>
  );
}

export default App;
