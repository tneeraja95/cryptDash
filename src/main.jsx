import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CurrencyDetail from "./components/CurrencyDetail.jsx";
import Header from "./components/Header";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Router>
<Header />
    <Routes>
      <Route path="/*" element={<App />} />
      <Route path="/currencies/:id" element={<CurrencyDetail />}/>
    </Routes>
  </Router>
  //</React.StrictMode>,
);
