import React from "react";
import { useEffect } from "react";
import finhub from "../apis/finhub";
import {nanoid} from "nanoid";

export default function StockTable() {
  const [stockList, setStockList] = React.useState(["GOOGL", "MSFT"]);
  const [stock, seStock] = React.useState();

  React.useEffect(() => {
    let isOpen = true;
    const getData = async () => {
      try {
        const responses = await Promise.all(
          stockList.map((st) =>
            finhub.get("/quote?", { params: { symbol: st } })
          )
        );

        const stockData = responses.map((response) => {
          return { data: response.data, symbol: response.config.params.symbol };
        });
        if (isOpen) {
          seStock(stockData);
          console.log(stockData);
        }
      } catch (error) {}
    };
    getData();
    return () => {
      isOpen = false;
    };
  }, []);

  return (
    <div>
      <table className="table hover mt-5">
        <thead style={{ background: "#FFF5EE" }}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Current</th>
            <th scope="col">Change</th>
            <th scope="col">%Change</th>
            <th scope="col">High(d)</th>
            <th scope="col">Low(d)</th>
            <th scope="col">Open(d)</th>
            <th scope="col">Prev</th>
          </tr>
        </thead>
        <tbody>
          {stock && stock.map((st) => {
            return (
              <tr key={nanoid()}>
                <td>{st.symbol}</td>
                <td>{st.data.c}</td>
                <td>{st.data.d}</td>
                <td>{st.data.dp}</td>
                <td>{st.data.h}</td>
                <td>{st.data.l}</td>
                <td>{st.data.o}</td>
                <td>{st.data.pc}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
