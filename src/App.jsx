import "./App.css";
import DashboardContent from "./components/Dashboard/DashboardContent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CoinDetail from "./components/CoinDetailPage/CoinDetail.jsx";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/*" element={<DashboardContent />} />
          <Route path="/currencies/:id" element={<CoinDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
