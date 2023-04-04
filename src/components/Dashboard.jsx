import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CoinTableHeader from "./CoinTableHeader";
import CoinRow from "./CoinRow";

// name | price | 1h | 24h | 7d |marketcap |volumne (24h) |circulating supply |last 7 days graph

function Dashboard({ coinsList }) {
    console.log(coinsList);
  return (
    <TableContainer component={Paper}>
      <Table>
        <CoinTableHeader/>
        <TableBody>
            {coinsList.map((item, index) => {return <CoinRow item={item} index={index} key={item.id} />})}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Dashboard;
