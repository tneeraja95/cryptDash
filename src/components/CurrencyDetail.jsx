import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CurrencyChart from "./CurrencyChart";

function CurrencyDetail({}) {
  const { id } = useParams();
  const [coinChartData, setCoinChartData] = useState({});
  useEffect(() => {
    (async function () {
      let apiresponse = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?x_cg_api_key=CG-piQbqGwkhbXruXiJCUXL71j9&vs_currency=usd&days=1`);
      let response = await apiresponse.json();
      setCoinChartData( response);
   //   console.log(response);
    })();
  }, []);

  if(coinChartData){
    let prices = coinChartData.prices.map(price => ( [new Date(price[0]), price[1] ]));
  //  console.log(coinChartData, prices);
  }
  return <>
    {coinChartData && <CurrencyChart prices={coinChartData.prices.map(price => ( [new Date(price[0]), price[1] ]))}/>}
  </>;
}

export default CurrencyDetail;
