import React from "react";
import { useState, useEffect, useContext } from "react";
import finhub from "../apis/finhub";
import { nanoid } from "nanoid";
import {
  FaCaretUp,
  FaRegWindowMinimize,
  FaCaretDown,
  FaSortNumericDownAlt,
  FaSortNumericDown,
  FaSortAlphaDown,
  FaSortAlphaUpAlt,
} from "react-icons/fa";
import { FcDeleteRow } from "react-icons/fc";
import TablePaggination from "./TablePaggination";
import { StockListContext } from "../context/stockListContext";
import LogoSymbol from "./LogoSymbol";
import { Spinner, Button, Tooltip,Badge } from "@chakra-ui/react";
import { checkTargetForNewValues } from "framer-motion";
import SortButton from "./SortButton";
import {Link} from "react-router-dom";

export default function StockTable() {
  const [pageStocks, setPageStocks] = useState(); //pagination 15 stocks with full data
  const { watchList } = useContext(StockListContext); // favorite stocks to follow
  const { removeFromStockList } = useContext(StockListContext); // remove favorite stocks to follow
  const [usStocks, setUsStocks] = useState([]); //  us stock exchange symbols and description
  const [pageFirst, setPageFirst] = useState(0); // pagination 1st  element on page
  const [pageStocksProfile, setPageStocksProfile] = useState(); // logo and companie profile

  //
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

        localStorage.setItem("usStocksData", JSON.stringify(usData));
      } catch (error) {}
    };
    if (!localStorage.hasOwnProperty("usStocksData")) {
      fechData();
    }
    setUsStocks(JSON.parse(localStorage["usStocksData"]));
  }, []);

  // get and set 15 pagination stocks
  useEffect(() => {
    let isOpen = true;
    const watchListSlice = watchList.slice(pageFirst, pageFirst + 10);
    const getDataProfiles = async () => {
      try {
        const responses = await Promise.all(
          watchListSlice.map((st) =>
            finhub.get("/stock/profile2?", { params: { symbol: st } })
          )
        );

        const watchListProfileData = responses.map((profile) => {
          return { symbol: profile.config.params.symbol, data: profile.data };
        });
        console.log(watchListProfileData);
        if (isOpen) {
          setPageStocksProfile([...watchListProfileData].slice());
        }
      } catch (error) {}
    };

    if (watchList.length > 0) {
      getDataProfiles();
    }
    return () => {
      isOpen = false;
    };
  }, [pageFirst, watchList]);

  useEffect(() => {
    let isOpen = true;
    const watchListSlice = watchList.slice(pageFirst, pageFirst + 10);
    const getDataQuotes = async () => {
      try {
        const responses = await Promise.all(
          watchListSlice.map((st) =>
            finhub.get("/quote?", { params: { symbol: st } })
          )
        );

        const watchListStockData = responses.map((response) => {
          return { data: response.data, symbol: response.config.params.symbol };
        });

        if (isOpen) {
          setPageStocks([...watchListStockData].slice());
        }
      } catch (error) {}
    };

    if (watchList.length > 0) {
      getDataQuotes();
    }
    return () => {
      isOpen = false;
    };
  }, [watchList, pageFirst]);

  const changeColor = (cng) => {
    var color = cng > 0 ? "green" : cng === 0 ? "black" : "red";
    return color;
  };

  const handleClick = (e) => {
    setPageFirst((parseInt(e.target.getInnerHTML()) - 1) * 10);
    console.log(pageFirst);
  };

  function searchProfile(symbol) {
    for (let i = 0; i < pageStocksProfile.length; i++) {
      if (pageStocksProfile[i].symbol === symbol) {
        return pageStocksProfile[i];
      }
    }
  }

  const checkPageStockProfile = React.useCallback(() => {
    if (!pageStocksProfile) return false;
    for (let i = 0; i < pageStocksProfile.length; i++) {
      if (!pageStocksProfile[i].symbol || !pageStocksProfile[i].data)
        return false;
      return true;
    }
  }, [pageStocksProfile]);

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
            <th scope="col">
              <SortButton name="Name" numerical={false} />
            </th>
            <th scope="col">Current</th>
            <th scope="col">Change</th>
            <th scope="col">%Change</th>
            <th scope="col">High(d)</th>
            <th scope="col">Low(d)</th>
            <th scope="col">Open(d)</th>
            <th scope="col">PrevClosed</th>
            <th scope="col">Market cap</th>
          </tr>
        </thead>
        <tbody>
          {pageStocks &&
            pageStocksProfile &&
            checkPageStockProfile() &&
            pageStocks.map((st) => {
              return (
                <tr key={nanoid()} className="row-hover">
                  <td>
                    <LogoSymbol
                      st={st}
                      stockProfile={searchProfile(st.symbol)}
                    />
                    <div className="hide">
                    <Link to={`/item/${st.symbol}`}><Badge style={{cursor:"pointer"}} variant='outline' colorScheme='green'>Details</Badge></Link>
                    </div>
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
                  {searchProfile(st.symbol) && (
                    <td>
                      {Math.round(
                        searchProfile(st.symbol).data.marketCapitalization *
                          1000
                      ) / 1000}
                      <Tooltip label="Remove from watchlist">
                        <div className="hide">
                          <Button onClick={()=>{removeFromStockList(st.symbol)}} style={{ background: "transparent" }}>
                            <FcDeleteRow />
                          </Button>
                        </div>
                      </Tooltip>
                    </td>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
      <div>
        <TablePaggination
          handleClick={handleClick}
          pageElements={10}
          elementList={watchList.length}
          pageFirst={pageFirst}
        />
      </div>
    </div>
  );
}
