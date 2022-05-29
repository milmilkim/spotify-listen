import { Routes, Route } from "react-router-dom";

import Receipt from "../pages/Receipt";
import Search from "../pages/Search";
import Recommend from "../pages/Recommend";
import RecommendResult from "../pages/RecommendResult";
import SearchResult from "../pages/SearchResult";
import Main from "../pages/Main";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/receipt" element={<Receipt />} />
      <Route path="/recommend" element={<Recommend />} />
      <Route path="/recommend_result" element={<RecommendResult />} />
      <Route path="/search" element={<Search />} />
      <Route path="/search_result/:id/" element={<SearchResult />} />
    </Routes>
  );
};

export default Router;
