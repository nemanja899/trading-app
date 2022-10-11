import React from "react";
import { useState, useEffect, useContext } from "react";
import finhub from "../apis/finhub";
import { nanoid } from "nanoid";
import { FaCaretUp, FaRegWindowMinimize, FaCaretDown,FaStar,FaRegStar } from "react-icons/fa";
import { StockListContext } from "../context/stockListContext";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import {
  DEFAULT_OPTIONS,
  getTheme,
} from "@table-library/react-table-library/chakra-ui";
import { usePagination } from "@table-library/react-table-library/pagination";
import {
  Box,
  HStack,
  Button,
  IconButton,
  Tooltip,
  Avatar,
} from "@chakra-ui/react";

export default function StockTable() {
  const [pageStocks, setPageStocks] = useState(); //pagination 15 stocks with full data
  const { watchList } = useContext(StockListContext); // favorite stocks to follow
  const { removeFromStockList } = useContext(StockListContext); // remove favorite stocks to follow
  const [usStocks, setUsStocks] = useState([]); //  us stock exchange symbols and description
  const [pageFirst, setPageFirst] = useState(0); // pagination 1st  element on page
  const [pageStocksProfile, setPageStocksProfile] = useState(); // logo and companie profile
  // get all us stock exchange symbols
  useEffect(() => {
    const fechData = async () => {
      try {
        const responses = await finhub.get("/stock/symbol?", {
          params: { exchange: "US" },
        });
        const usStocksData = responses.data;

        const usData = usStocksData.map((st) => ({
          symbol: st.symbol,
          description: st.description,
        }));

        localStorage.setItem("usStocksSymbols", JSON.stringify(usData));
      } catch (error) {}
    };
    if (localStorage.hasOwnProperty("usStockSymbols")) {
      fechData();
    }
    setUsStocks(JSON.parse(localStorage["usStocksSymbols"]));
  }, []);

  // get and set 5 pagination stocks
  useEffect(() => {
    let isOpen = true;
    const getDataQuotes = async () => {
      try {
        const responses = await Promise.all(
          watchList
            .slice(pageFirst, pageFirst + 15)
            .map((st) => finhub.get("/quote?", { params: { symbol: st } }))
        );

        const watchListStockData = responses.map((response) => {
          return { data: response.data, symbol: response.config.params.symbol };
        });

        if (isOpen) {
          setPageStocks(watchListStockData);
        }
      } catch (error) {}
    };

    const getDataProfiles = async () => {
      try {
        const responses = await Promise.all(
          watchList
            .slice(pageFirst, pageFirst + 15)
            .map((st) =>
              finhub.get("/stock/profile2?", { params: { symbol: st } })
            )
        );

        const watchListProfileData = responses.map((profile) => {
          return { symbol: profile.config.params.symbol, data: profile.data };
        });
        if (isOpen) {
          setPageStocksProfile(watchListProfileData);
        }
      } catch (error) {}
    };

    if (watchList.length > 0) {
      getDataQuotes();
      getDataProfiles();
    }
    return () => {
      isOpen = false;
    };
  }, [watchList, pageFirst]);

  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(chakraTheme);

  const pagination = usePagination(pageStocks, {
    state: {
      page: 0,
      size: 2,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {
    console.log(action, state);
  }

  function searchProfile(symbol) {
    for (let i = 0; i < pageStocksProfile.length; i++) {
      if (pageStocksProfile[i].symbol === symbol) {
        return pageStocksProfile[i];
      }
    }
  }
  const changeColor = (cng) => {
    var color = cng > 0 ? "green" : cng === 0 ? "black" : "red";
    return color;
  };
  const changeCarret = (cng) => {
    const Icon =
      cng > 0 ? (
        <FaCaretUp />
      ) : cng === 0 ? (
        <FaRegWindowMinimize />
      ) : (
        <FaCaretDown />
      );
    return (
      <div style={{ display: "inline-block", marginLeft: "2px" }}>{Icon}</div>
    );
  };
  return (
    <div>
      <table className="table table-hover mt-5">
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
          {pageStocks &&
            pageStocksProfile &&
            pageStocks.map((st) => {
              return (
                <tr key={nanoid()}>
                  <td>
                    <Tooltip hasArrow placement='top' label={searchProfile(st.symbol).data.name}>
                      <div>
                        <div style={{ display: "inline-block" }}>
                          <Avatar
                            size="sm"
                            src={searchProfile(st.symbol).data.logo}
                          />
                        </div>
                        <div
                          style={{
                            display: "inline-block",
                            paddingLeft: "12px",
                          }}
                        >
                          {st.symbol}
                        </div>
                      </div>
                    </Tooltip>
                  </td>
                  <td>{st.data.c}</td>
                  <td style={{ color: changeColor(st.data.d) }}>
                    {st.data.d}
                    {changeCarret(st.data.d)}
                  </td>
                  <td style={{ color: changeColor(st.data.dp) }}>
                    {st.data.dp}
                    {changeCarret(st.data.dp)}
                  </td>
                  <td>{st.data.h}</td>
                  <td>{st.data.l}</td>
                  <td>{st.data.o}</td>
                  <td>{st.data.pc}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div></div>
    </div>
  );
}
