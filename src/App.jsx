import { useEffect, useState } from "react";
import "./App.css";
import parseFetchData from "./utils/parseFetchData";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

function App() {
  const [coinsList, setCoinsList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let apiresponse = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&x_cg_api_key=CG-piQbqGwkhbXruXiJCUXL71j9&per_page=20&page=1&price_change_percentage=1h,24h,7d"
      );
      let result = await apiresponse.json();
      console.log(result);
      setCoinsList(parseFetchData(result));
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header />
     {coinsList && <Dashboard coinsList={coinsList} />}
    </div>
  );
}

export default App;
