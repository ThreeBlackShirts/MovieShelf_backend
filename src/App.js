import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import HomePage from './component/Pages/HomePage';
import LoginPage from './component/Pages/LoginPage';
import SignUpPage from './component/Pages/SignUpPage';

import { Header } from "./component/Header/Header";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
};

export default App;
