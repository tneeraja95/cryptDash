import "./CoinDetail.css";
import CoinChart from "./CoinChart";
import { useParams } from "react-router-dom";
import CoinDetailOverview from "./CoinDetailOverview";

function CoinDetail() {
  let { id } = useParams();
  return (
    <div className="cdp">
      <CoinDetailOverview id={id} />
      <CoinChart id={id} />
    </div>
  );
}

export default CoinDetail;
