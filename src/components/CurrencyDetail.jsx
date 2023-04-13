import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CurrencyChart from "./CurrencyChart";
import parseChartData from "../utils/parseChartData";

function CurrencyDetail({}) {
  const { id } = useParams();
  const [coinChartData, setCoinChartData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let apiresponse = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?x_cg_api_key=CG-piQbqGwkhbXruXiJCUXL71j9&vs_currency=usd&days=89`);   
      let coinChartData = await apiresponse.json();
    //  console.log(coinChartData);
      setCoinChartData(coinChartData);
    };
    fetchData();
  }, []);

//   if(coinChartData){
//     let prices = coinChartData.prices.map(price => ( [new Date(price[0]), price[1] ]));
//   //  console.log(coinChartData, prices);
//   }

//console.log(coinChartData );
  return <>
  <div id="container"></div>
    {Object.keys(coinChartData).length > 0 && <CurrencyChart coinChartData = {coinChartData}/>}
  </>;
}

export default CurrencyDetail;
