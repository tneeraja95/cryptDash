import React from "react";

// name | price | 1h | 24h | 7d |marketcap |volumne (24h) |circulating supply |last 7 days graph

function parseFetchData(fetchData) {
  let result = fetchData.map((item) => {
    let obj = {
      id: item.id,
      name: item.name,
      symbol: item.symbol,
      image: item.image,
      current_price: item.current_price,
      market_cap: item.market_cap,
      price_change_percentage_24h_in_currency: item.price_change_percentage_24h_in_currency,
      price_change_percentage_1h_in_currency: item.price_change_percentage_1h_in_currency,
      price_change_percentage_7d_in_currency: item.price_change_percentage_7d_in_currency,
      total_volume: item.total_volume,
      circulating_supply: item.circulating_supply,
      max_supply: item.max_supply,
      last_updated: item.last_updated
    };
    return obj;
  });
  console.log(result);
  return result;
}

export default parseFetchData;
