const CURRENCY = "$";
const MARKET = "en-us";
const FORMAT_VALUE = (value, args = {}) => value.toLocaleString(MARKET, args);

import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import "./CoinRow.css";
import CirculatingSupplyToolTip from "./CirculatingSupplyToolTip";
import { useNavigate } from "react-router-dom";


function CoinRow({ item, index }) {
  const navigate = useNavigate();
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
      <TableCell className="freeze_name">
        <span className="name">
          <img src={image} />
          {name} <div className="symbol">{symbol}</div>
        </span>
      </TableCell>
    );
  }

  function format_volume(total_volume, current_price, symbol) {
    let volume_in_coin = total_volume / current_price;
    return (
      <TableCell className="volume">
        {CURRENCY}
        {FORMAT_VALUE(total_volume)}
        <div className="volume_in_coin">
          {FORMAT_VALUE(volume_in_coin, { maximumFractionDigits: 0 })}
          <span className="symbol">{symbol}</span>
        </div>
      </TableCell>
    );
  }

  function handleOnCLick(id) {
    navigate(`/currencies/${id}`);
  }

  return (
   <TableRow key={item.id} className="coinRow" onClick={()=>handleOnCLick(item.id)}>
      <TableCell>{index + 1}</TableCell>
      {format_name(item.name, item.image, item.symbol)}
      {format_price(item.current_price)}
      {format_price_change_prec(item.price_change_percentage_1h_in_currency)}
      {format_price_change_prec(item.price_change_percentage_24h_in_currency)}
      {format_price_change_prec(item.price_change_percentage_7d_in_currency)}
      {format_market_cap(item.market_cap)}
      {format_volume(item.total_volume, item.current_price, item.symbol)}
      {CirculatingSupplyToolTip(
        item.circulating_supply,
        item.max_supply,
        item.symbol
      )}
     </TableRow>
  );
}

export default CoinRow;
