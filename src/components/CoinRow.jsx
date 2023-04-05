const CURRENCY = "$";
const MARKET = "en-us";
const FORMAT_VALUE = (value, args={}) => value.toLocaleString(MARKET, args); 

import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import "./CoinRow.css";


function CoinRow({ item, index }) {
  function format_price_change_prec(change_prec) {
    let classname = change_prec > 0 ? "green" : "red";
    classname += " price_change";
    change_prec = Math.abs(change_prec.toFixed(2));
    return (
      <TableCell>
        <span className={classname}>
          <ArrowDropUpIcon />
          {change_prec}%
        </span>
      </TableCell>
    );
  }

  function format_price(price) {
    return (
      <TableCell className="price">
        {CURRENCY}
        {FORMAT_VALUE(price, {
          maximumSignificantDigits: 12,
          minimumSignificantDigits: 3,
        })}
      </TableCell>
    );
  }

  function format_market_cap(market_cap) {
    return (
      <TableCell className="market_cap">
        {CURRENCY}
        {FORMAT_VALUE(market_cap)}
      </TableCell>
    );
  }

  function format_name(name, image, symbol) {
    return (
      <TableCell>
        <span className="name">
          <img src={image} />
          {name} <div className="symbol">{symbol}</div>
        </span>
      </TableCell>
    );
  }

  function format_volume(total_volume, current_price, symbol) {
    let volume_in_coin = (total_volume / current_price);
    return (
      <TableCell className="volume">
        {CURRENCY}
        {FORMAT_VALUE(total_volume)}
        <div className="volume_in_coin">
          {FORMAT_VALUE(volume_in_coin, {maximumFractionDigits: 0})}
          <span className="symbol">{symbol}</span>
        </div>
      </TableCell>
    );
  }

  function format_circulating_supply(circulating_supply, max_supply, symbol) {
    let supply_in_perc = ((circulating_supply/max_supply)*100).toFixed(2);

    return(
        <TableCell className="circulating_supply">
            <span>{FORMAT_VALUE(circulating_supply)}{symbol}</span>
            {max_supply && <div>{supply_in_perc}??{FORMAT_VALUE(max_supply)}</div>}
        </TableCell>
    )

  }

  return (
    <TableRow key={item.id} className="coinRow">
      <TableCell>{index + 1}</TableCell>
      {format_name(item.name, item.image, item.symbol)}
      {format_price(item.current_price)}
      {format_price_change_prec(item.price_change_percentage_1h_in_currency)}
      {format_price_change_prec(item.price_change_percentage_24h_in_currency)}
      {format_price_change_prec(item.price_change_percentage_7d_in_currency)}
      {format_market_cap(item.market_cap)}
      {format_volume(item.total_volume, item.current_price, item.symbol)}
      {format_circulating_supply(item.circulating_supply, item.max_supply, item.symbol)}
    </TableRow>
  );
}

export default CoinRow;
