import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Test from './Test';
import Receipt from './pages/Receipt';
import Recommend from './pages/Recommend';
import RecommendResult from './pages/RecommendResult';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Test />} />
      <Route path="/login" element={<Login />} />
      <Route path="/receipt" element={<Receipt />} />
      <Route path="/recommend" element={<Recommend />} />
      <Route path="/recommend_result" element={<RecommendResult />} />
    </Routes>
  );
};

export default Router;
