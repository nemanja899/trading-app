import React from "react";
import { nanoid } from "nanoid";
import { HStack, Button } from "@chakra-ui/react";
import { memo } from "react";

const PagginationButton= (props)=>{
    return (
        <div onClick={(e)=>{props.handleClick(e); props.updateButtonsState(e);}}>
              <Button
              key={nanoid()}
              size="sm"
              variant="outline"
              isDisabled={props.isDisabled}
            >
              {props.value}
            </Button>
        </div>
    );
};

export default React.memo(PagginationButton);