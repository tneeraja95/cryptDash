import React from 'react'
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import './CoinRow.css';

function CoinRow({item, index}) {

    function format_price_change_prec( change_prec) {
        let classname = change_prec > 0 ? 'green' : 'red';
        change_prec = Math.abs(change_prec.toFixed(2))
        return <TableCell className={classname}>{ArrowDropUpIcon}{change_prec}%</TableCell>
    }

  return (
    <TableRow key={item.id} className='coinRow'>
            <TableCell>{index+1}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.current_price}</TableCell>
            {format_price_change_prec(item.price_change_percentage_1h_in_currency)}
            {format_price_change_prec(item.price_change_percentage_24h_in_currency)}
            {format_price_change_prec(item.price_change_percentage_7d_in_currency)}
            <TableCell>{item.market_cap}</TableCell>
            <TableCell>{item.total_volume}</TableCell>
            <TableCell>{item.circulating_supply}</TableCell></TableRow>
  )
}

export default CoinRow
