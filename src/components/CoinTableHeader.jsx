import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

function CoinTableHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>#</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Price</TableCell>
        <TableCell>1h%</TableCell>
        <TableCell>24h%</TableCell>
        <TableCell>7d%</TableCell>
        <TableCell>Market Cap</TableCell>
        <TableCell>Volumne (24h)</TableCell>
        <TableCell>Circulating Supply</TableCell>
        {/* <TableCell>Last 7 days</TableCell> */}
      </TableRow>
    </TableHead>
  );
}

export default CoinTableHeader;
