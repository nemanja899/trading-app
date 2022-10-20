import React from "react";
import { Button, HStack } from "@chakra-ui/react";
import { nanoid } from "nanoid";

const ChartPicker = (props) => {
  const handleClick = (e) => {
    const type = e.target.innerHTML;
    if (type === "24h") {
        props.setChartType("day");
    } else if (type === "1W") {
        props.setChartType("week");
    } else {
        props.setChartType("year");
    }
  };

  return (
    <div>
      <HStack>
        <Button
          key={nanoid()}
          size="sm"
          colorScheme="blue"
          onClick={(e) => {
            handleClick(e);
          }}
          isActive={props.chartType === "day"}
        >
          24h
        </Button>
        <Button
          key={nanoid()}
          size="sm"
          colorScheme="blue"
          onClick={(e) => {
            handleClick(e);
          }}
          isActive={props.chartType === "week"}
        >
          1W
        </Button>
        <Button
          key={nanoid()}
          size="sm"
          colorScheme="blue"
          onClick={(e) => {
            handleClick(e);
          }}
          isActive={props.chartType === "year"}
        >
          1Y
        </Button>
      </HStack>
    </div>
  );
};

export default ChartPicker;
