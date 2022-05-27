import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Test from './Test';
import Receipt from './pages/Receipt';
import Recommend from './pages/Recommend';
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Test />} />
      <Route path="/login" element={<Login />} />
      <Route path="/receipt" element={<Receipt />} />
      <Route path="/recommend" element={<Recommend />} />
    </Routes>
  );
};

export default Router;
