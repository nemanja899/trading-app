import React from "react";
import {
  FaSortNumericDownAlt,
  FaSortNumericDown,
  FaSortAlphaDown,
  FaSortAlphaUpAlt,
} from "react-icons/fa";

import { Spinner, Button } from "@chakra-ui/react";
import { StockListContext } from "../context/stockListContext";
import { act } from "react-dom/test-utils";

const SortButton = (props) => {
  const [hovered, setHovered] = React.useState(false);
  const { watchList, sortWatchList } = React.useContext(StockListContext);
  const [sortedToggle, setSortedToggle] = React.useState(false);
  const handleMouseLeave = (e) => {
    setHovered(!hovered);
  };
  const handleMouseEnter = (e) => {
    setHovered(!hovered);
  };

  const handleClick = () => {
    var sortedWatchList = [];
    if (props.numerical) {
      if (!sortedToggle) {
        sortedWatchList = watchList.sort((a, b) => b - a).slice();
      } else {
        sortedWatchList = watchList.sort((a, b) => a - b).slice();
      }
    } else {
      if (sortedToggle) {
        sortedWatchList = watchList.reverse().slice();
      } else {
        sortedWatchList = watchList.sort().slice();
      }
      sortWatchList(sortedWatchList);
      setSortedToggle(!sortedToggle);
    }
  };
  return (
    <div>
      <Button
        style={{ background: "transparent" }}
        onMouseEnter={(e) => {
          handleMouseEnter(e);
        }}
        onMouseLeave={(e) => {
          handleMouseLeave(e);
        }}
        rightIcon={
          hovered ? (
            props.numerical ? (
              sortedToggle ? (
                <FaSortNumericDownAlt />
              ) : (
                <FaSortNumericDown />
              )
            ) : sortedToggle ? (
                <FaSortAlphaUpAlt />
              
            ) : (
                <FaSortAlphaDown />
            )
          ) : (
            ""
          )
        }
        onClick={handleClick}
      >
        {props.name}
      </Button>
    </div>
  );
};

export default React.memo(SortButton);
