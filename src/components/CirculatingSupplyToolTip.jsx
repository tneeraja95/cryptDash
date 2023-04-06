
import "./CoinRow.css";
import Tooltip , { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from '@mui/material/styles';
import TableCell from "@mui/material/TableCell";

const CURRENCY = "$";
const MARKET = "en-us";
const FORMAT_VALUE = (value, args = {}) => value.toLocaleString(MARKET, args);

function get_circulating_supply_tooltip(
    circulating_supply,
    max_supply,
    symbol,
    supply_in_perc
  ) {
    return (
      <div className="tooltip">
        <span className="prec">Percentage {supply_in_perc}</span>
        {get_circulating_supply_perc_bar(supply_in_perc)}
        <span className="cs">
          Circulating Supply <div className="cs">{circulating_supply}
          <span className="symbol">{symbol}</span></div>
        </span>
        <span>
          Max Supply
          <div className="max">
            {max_supply}
            <span className="symbol">{symbol}</span>
          </div>
        </span>
      </div>
    );
  }

  function get_circulating_supply_perc_bar(supply_in_perc) {
    return (
      <div className="outer_bar">
        <div
          className="inner_bar"
          style={{ width: supply_in_perc + "%" }}
        ></div>
      </div>
    );
  }
  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} arrow/>
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
       color: 'rgba(0, 0, 0, 0.87)',
       boxShadow: theme.shadows[1],
       fontSize: 11,
    },
  }));

  
export function CirculatingSupplyToolTip(circulating_supply, max_supply, symbol) {
    let supply_in_perc = ((circulating_supply / max_supply) * 100).toFixed(2);
    return (
      <TableCell><div className="circulating_supply">
        {max_supply && (
          <CustomTooltip
            title={
              <>
                {get_circulating_supply_tooltip(
                  circulating_supply,
                  max_supply,
                  symbol,
                  supply_in_perc
                )}
              </>
            }
          >
            <div>
              <span>
                {FORMAT_VALUE(circulating_supply)}
                <span className="symbol">{symbol}</span>
              </span>
              {get_circulating_supply_perc_bar(supply_in_perc)}
            </div>
          </CustomTooltip>
        )}
        {!max_supply && (
          <span>
            {FORMAT_VALUE(circulating_supply)}
            <span className="symbol">{symbol}</span>
          </span>
        )}</div>
      </TableCell>
    );
  }

  export default CirculatingSupplyToolTip;