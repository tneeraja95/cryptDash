import React from "react";

function parseChartData(coinChartData) {
  let result = [];
  //console.log(coinChartData);

  for (let i = 0; i < coinChartData.prices.length; i++) {
    let object = {
      date: coinChartData.prices[i][0],
      price: coinChartData.prices[i][1],
    };

    if (coinChartData.market_caps[i][0] === coinChartData.prices[i][0]) {
      object["market_cap"] = coinChartData.market_caps[i][1];
    }

    if (coinChartData.total_volumes[i][0] === coinChartData.prices[i][0]) {
      object["total_volume"] = coinChartData.total_volumes[i][1];
    }
    result.push(object);
  }
  //console.log(result);
  return result;
}

export default parseChartData;
