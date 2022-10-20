import React from "react";
import finhub from "../apis/finhub";
import { StockListContext } from "../context/stockListContext";
import { Highlight,Heading  } from "@chakra-ui/react";

export default function SearchStock() {
  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState([]);
  const { addToWatchList } = React.useContext(StockListContext);

  const fetchData = React.useCallback(async () => {
    let isOpen = true;
    try {
      function searchStocks() {
        return JSON.parse(localStorage["usStocksSymbols"]).filter(
          (usStocksSymbols) => {
            return (
              usStocksSymbols.symbol
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              usStocksSymbols.description
                .toLowerCase()
                .includes(search.toLowerCase())
            );
          }
        );
      }

      const usStocksSymbols = await searchStocks();

      if (isOpen) {
        setData(usStocksSymbols);
      }
      return () => {
        isOpen = false;
      };
    } catch (error) {}
  }, [search]);

  React.useEffect(() => {
    if (search.length > 0) {
      fetchData();
    } else {
      setData([]);
    }
  }, [search, fetchData]);

  function handleFocus() {
    const element = document.getElementsByClassName("dropdown-menu");
    const classes = element[0].className;
    if (search.length > 0 && !classes.includes("show")) {
      element[0].classList.add("show");
    }
  }



  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <Heading style={{alignItems:"center",textAlign:"center"}}size="md">
        <Highlight
          query={["stock","watchList"]}
          styles={{ px: "2", py: "1", rounded: "full", bg: "green.100" }}
        >
          Add Stock to WatchList
        </Highlight>
        </Heading>
        <input
          style={{ backgroundColor: "antiquewhite" }}
          placeholder="search"
          id="search"
          type="text"
          className="form-control"
          value={search}
          name="search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onFocus={handleFocus}
        ></input>
        <label htmlFor="search">Search</label>
        <ul
          style={{
            maxHeight: "550px",
            overflowY: "scroll",
            overflowX: "hidden",
            cursor: "pointer",
          }}
          className={`dropdown-menu ${data.length > 0 ? "show" : ""}`}
        >
          {data.length > 0 &&
            data.map((d) => {
              return (
                <li
                  key={d.symbol}
                  className="dropdown-item"
                  onClick={() => {
                    addToWatchList(d.symbol);
                    setSearch("");
                  }}
                >
                  {d.description}({d.symbol})
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
