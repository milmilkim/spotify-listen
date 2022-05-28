import { Routes, Route } from "react-router-dom";

import Receipt from "../pages/Receipt";
// import Search from "../pages/Search";
import Recommendation from "../pages/Recommendation";

const Router = () => {
  return (
    <Routes>
      <Route path="/receipt" element={<Receipt />} />
      {/* <Route path="/search" element={<Search />} /> */}
      <Route path="recommendation" element={<Recommendation />} />
    </Routes>
  );
};

export default Router;
