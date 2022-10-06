import React from "react";
import StockTable from "../components/StockTable";
import SearchStock from "../components/SearchStock";
export default function Stocks() {
  return (
    <div>
      <div>Neke Akcije</div>
      <SearchStock />
      <StockTable />
    </div>
  );
}
