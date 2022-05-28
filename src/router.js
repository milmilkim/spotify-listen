import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Test from './Test';
import Receipt from './pages/Receipt';
import Recommend from './pages/Recommend';
import RecommendResult from './pages/RecommendResult';
import Search from './pages/Search';
import SearchResult from './pages/SearchResult';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Test />} />
      <Route path="/login" element={<Login />} />
      <Route path="/receipt" element={<Receipt />} />
      <Route path="/recommend" element={<Recommend />} />
      <Route path="/recommend_result" element={<RecommendResult />} />
      <Route path="/search" element={<Search />} />
      <Route path="/search_result/:id/" element={<SearchResult />} />
    </Routes>
  );
};

export default Router;
