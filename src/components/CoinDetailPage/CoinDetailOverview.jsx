// market cap, rank, --present || perc change(nt sure from when) || Volume(24h), rank, perc change || volume/market cap ratio || circulating supply || Total supply || max supply || fully diluted market cap ||
// offical links - website, whitepapaer, github --present || socials - reddit || Rating - star || network information (chain xplorer) (supported wallet)|| UCID || btc to usd converter || price performaance (24h, 1m) low high|| All time low, atl date,n all time high, date --present
const CURRENCY = "$";
const MARKET = "en-us";
const FORMAT_VALUE = (value, args = {}) => value.toLocaleString(MARKET, args);

import { useState, useEffect } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Slider from "@mui/material/Slider";
import LanguageIcon from "@mui/icons-material/Language";
import GitHubIcon from "@mui/icons-material/GitHub";
import DescriptionIcon from "@mui/icons-material/Description";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

function CoinDetailOverview({ id }) {
  const [coinDetails, setCoinDetails] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let apiresponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}?x_cg_api_key=CG-piQbqGwkhbXruXiJCUXL71j9`
      );
      let coinDetails = await apiresponse.json();
      setCoinDetails(coinDetails);
    }
    fetchData();
  }, []);

  function format_price_change_prec(change_prec, duration = "") {
    let classname = change_prec > 0 ? "green" : "red";
    classname += " price_change";
    change_prec = Math.abs(change_prec.toFixed(2));
    return (
      <div className={classname}>
        <ArrowDropUpIcon />{" "}
        <span>
          {change_prec}% {duration}
        </span>
      </div>
    );
  }

  console.log(coinDetails);

  return (
    <>
      {coinDetails.status?.error_code && (
        <div>{coinDetails.status?.error_message}</div>
      )}
      <div className="overview">
        {coinDetails != null && (
          <div>
            <div className="basics">
              {coinDetails.image && (
                <img src={coinDetails.image.thumb} alt={coinDetails.name} />
              )}
              <span className="name">{coinDetails.name}</span>
              <span className="symbol">{coinDetails.symbol}</span>
            </div>
            {coinDetails.market_data && (
              <div>
                <div className="price">
                  {CURRENCY}
                  {FORMAT_VALUE(coinDetails.market_data.current_price.usd, {
                    maximumSignificantDigits: 12,
                    minimumSignificantDigits: 3,
                  })}
                </div>
                {coinDetails.market_data.price_change_percentage_24h && (
                  <div className="perc24h">
                    {format_price_change_prec(
                      coinDetails.market_data.price_change_percentage_24h,
                      "(1d)"
                    )}
                  </div>
                )}
                {coinDetails.market_data.market_cap && (
                  <div className="marketCap">
                    <div className="desc">
                      <div className="name">Market cap</div>
                      <div className="value">
                        {format_price_change_prec(
                          coinDetails.market_data
                            .market_cap_change_percentage_24h
                        )}
                        {CURRENCY}
                        {FORMAT_VALUE(coinDetails.market_data.market_cap.usd, {
                          maximumSignificantDigits: 12,
                          minimumSignificantDigits: 3,
                        })}
                      </div>
                    </div>
                    <div className="slider">
                      <Slider
                        disabled
                        size="small"
                        defaultValue={10000 - coinDetails.market_cap_rank / 100}
                        aria-label="Small"
                        valueLabelDisplay="auto"
                      />
                      <span className="rank">
                        #{coinDetails.market_cap_rank}
                      </span>
                    </div>
                  </div>
                )}
                {coinDetails.market_data.total_volume && (
                  <div className="volume">
                    <div className="name">Volume(24h)</div>
                    <div className="value">
                      {CURRENCY}
                      {FORMAT_VALUE(coinDetails.market_data.total_volume.usd, {
                        maximumSignificantDigits: 12,
                        minimumSignificantDigits: 3,
                      })}
                    </div>
                  </div>
                )}
                <div className="volumeMarket">
                  <div className="name">Volume/Market cap (24h) </div>
                  <div className="value">
                    {" "}
                    {(
                      (coinDetails.market_data.total_volume.usd * 100) /
                      coinDetails.market_data.market_cap.usd
                    ).toFixed(2)}
                    %
                  </div>
                </div>
                <div className="circulatingSupply">
                  <div className="name">Circulating supply </div>
                  <div className="value">
                    {FORMAT_VALUE(coinDetails.market_data.total_volume.usd, {
                      maximumSignificantDigits: 12,
                      minimumSignificantDigits: 3,
                    })}
                    &nbsp; {coinDetails.symbol}
                  </div>
                </div>
                <div className="slider">
                  <Slider
                    size="small"
                    disabled
                    defaultValue={
                      (coinDetails.market_data.circulating_supply * 100) /
                      coinDetails.market_data.max_supply
                    }
                    aria-label="Small"
                    valueLabelDisplay="auto"
                  />
                  <span className="rank">
                    {(
                      (coinDetails.market_data.circulating_supply * 100) /
                      coinDetails.market_data.total_supply
                    ).toFixed(2)}
                    %
                  </span>
                </div>
                <div className="circulatingSupply">
                  <div className="name">Total supply </div>
                  <div className="value">
                    {FORMAT_VALUE(coinDetails.market_data.total_supply, {
                      maximumSignificantDigits: 12,
                      minimumSignificantDigits: 3,
                    })}
                    &nbsp; {coinDetails.symbol}
                  </div>
                </div>
                {coinDetails.market_data.max_supply && (
                  <div className="circulatingSupply">
                    <div className="name">Max. supply </div>
                    <div className="value">
                      {FORMAT_VALUE(coinDetails.market_data.max_supply, {
                        maximumSignificantDigits: 12,
                        minimumSignificantDigits: 3,
                      })}
                      &nbsp; {coinDetails.symbol}
                    </div>
                  </div>
                )}
                <div className="circulatingSupply">
                  <div className="name">Fully Diluted market cap </div>
                  <div className="value">
                    {CURRENCY}
                    {FORMAT_VALUE(
                      coinDetails.market_data.fully_diluted_valuation.usd,
                      {
                        maximumSignificantDigits: 12,
                        minimumSignificantDigits: 3,
                      }
                    )}
                  </div>
                </div>
                <div className="links">
                  <div className="name"> Offical Links </div>
                  <div className="value">
                    {coinDetails.links.homepage[0] && (
                      <a
                        href={coinDetails.links.homepage[0]}
                        target="_blank"
                        className="link"
                      >
                        <LanguageIcon /> Website
                      </a>
                    )}
                    {coinDetails.links.repos_url.github[0] && (
                      <a
                        href={coinDetails.links.repos_url.github[0]}
                        target="_blank"
                        className="link"
                      >
                        <GitHubIcon /> Github
                      </a>
                    )}
                    {coinDetails.links.whitepaper && (
                      <a
                        href={coinDetails.links.whitepaper}
                        target="_blank"
                        className="link"
                      >
                        <DescriptionIcon /> Whitepaper
                      </a>
                    )}
                  </div>
                </div>
                <div className="perf">
                  <div className="name"> Price performance</div>
                  <div className="lowHigh">
                    <div className="low">
                      <span>Low</span>
                      <div>
                        {CURRENCY}
                        {FORMAT_VALUE(coinDetails.market_data.low_24h.usd, {
                          maximumSignificantDigits: 12,
                          minimumSignificantDigits: 3,
                        })}
                      </div>
                    </div>
                    <div className="high">
                      <span>High</span>
                      <div>
                        {CURRENCY}
                        {FORMAT_VALUE(coinDetails.market_data.high_24h.usd, {
                          maximumSignificantDigits: 12,
                          minimumSignificantDigits: 3,
                        })}
                      </div>
                    </div>
                  </div>
                  <Slider
                    size="small"
                    disabled
                    defaultValue={
                      ((coinDetails.market_data.current_price.usd -
                        coinDetails.market_data.low_24h.usd >
                      0
                        ? coinDetails.market_data.current_price.usd -
                          coinDetails.market_data.low_24h.usd
                        : 0) *
                        100) /
                      (
                        coinDetails.market_data.high_24h.usd -
                        coinDetails.market_data.low_24h.usd
                      ).toFixed(2)
                    }
                    aria-label="Small"
                    valueLabelDisplay="auto"
                  />
                </div>
                <div className="ath">
                  <div>
                    All time high
                    <div>
                      {format(
                        Date.parse(coinDetails.market_data.ath_date.usd),
                        "MMM dd, yyyy"
                      )}{" "}
                      &nbsp; (
                      {formatDistance(
                        new Date(),
                        Date.parse(coinDetails.market_data.ath_date.usd)
                      )}
                      )
                    </div>
                  </div>
                  <div>
                    <div className="athPrice">
                      {CURRENCY}
                      {FORMAT_VALUE(coinDetails.market_data.ath.usd, {
                        maximumSignificantDigits: 12,
                        minimumSignificantDigits: 3,
                      })}
                    </div>
                    {format_price_change_prec(
                      coinDetails.market_data.ath_change_percentage.usd
                    )}
                  </div>
                </div>
                <div className="atl">
                  <div>
                    All time low
                    <div>
                      {format(
                        Date.parse(coinDetails.market_data.atl_date.usd),
                        "MMM dd, yyyy"
                      )}{" "}
                      &nbsp; (
                      {formatDistance(
                        new Date(),
                        Date.parse(coinDetails.market_data.atl_date.usd)
                      )}
                      )
                    </div>
                  </div>
                  <div>
                    <div className="atlPrice">
                      {CURRENCY}
                      {FORMAT_VALUE(coinDetails.market_data.atl.usd, {
                        maximumSignificantDigits: 12,
                        minimumSignificantDigits: 3,
                      })}
                    </div>
                    {format_price_change_prec(
                      coinDetails.market_data.atl_change_percentage.usd
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default CoinDetailOverview;
