import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import DashboardHeader from "./DashboardHeader";
import CoinRow from "./CoinRow";
import { useEffect, useState } from "react";
import parseFetchData from "../../utils/parseFetchData";
import Loading from "../Loading";
import DashboardTitle from "./DashboardTitle";

// name | price | 1h | 24h | 7d |marketcap |volumne (24h) |circulating supply |last 7 days graph

function DashboardContent() {
  const [coinsList, setCoinsList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let apiresponse = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&x_cg_api_key=CG-piQbqGwkhbXruXiJCUXL71j9&per_page=20&page=1&price_change_percentage=1h,24h,7d"
      );
      let result = await apiresponse.json();
      console.log(result);
      setCoinsList(parseFetchData(result));
    };
    fetchData();
  }, []);

  return (
    <>
      <DashboardTitle />
      {coinsList.length == 0 && <Loading />}
      {coinsList.status?.error_code && (
        <div>{coinsList.status.error_message}</div>
      )}
      {coinsList.length > 0 && (
        <TableContainer
          component={Paper}
          style={{ overflow: "auto", maxHeight: "100vh" }}
        >
          <Table style={{ position: "reltive" }}>
            <DashboardHeader />
            <TableBody>
              {coinsList.map((item, index) => {
                return <CoinRow item={item} index={index} key={item.id} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default DashboardContent;
