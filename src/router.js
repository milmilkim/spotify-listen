import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Test from './Test';
import Receipt from './pages/Receipt';
import Recommendation from './pages/Recommendation';
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Test />} />
      <Route path="/login" element={<Login />} />
      <Route path="/receipt" element={<Receipt />} />
      <Route path="recommendation" element={<Recommendation />} />
    </Routes>
  );
};

export default Router;
