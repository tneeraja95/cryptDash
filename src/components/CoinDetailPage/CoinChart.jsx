import { useEffect, useState } from "react";
import displayCoinChart from "../../utils/displayCoinChart";
import Loading from "../Loading";

function CoinChart({id}) {
  const [coinChartData, setCoinChartData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let apiresponse = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?x_cg_api_key=CG-piQbqGwkhbXruXiJCUXL71j9&vs_currency=usd&days=89`);   
      let coinChartData = await apiresponse.json();
      setCoinChartData(coinChartData);
    };
    fetchData();
  }, []);

  console.log(coinChartData)
  return <>
  <div id="container"></div>
    {Object.keys(coinChartData).length == 0 && <Loading/>}
    {Object.keys(coinChartData).length > 0 && displayCoinChart(coinChartData)}
  </>;
}

export default CoinChart;
