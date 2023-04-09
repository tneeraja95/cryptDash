import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import CoinTableHeader from "./CoinTableHeader";
import CoinRow from "./CoinRow";

// name | price | 1h | 24h | 7d |marketcap |volumne (24h) |circulating supply |last 7 days graph

function Dashboard({ coinsList }) {
  return (
    <TableContainer component={Paper} style={{overflow:"auto", maxHeight: "100vh"}}>
      <Table style={{position: "reltive"}}>
        <CoinTableHeader/>
        <TableBody>
         {coinsList.map((item, index) => {return <CoinRow item={item} index={index} key={item.id} />})}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Dashboard;
