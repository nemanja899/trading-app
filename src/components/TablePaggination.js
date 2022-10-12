import React from "react";
import { nanoid } from "nanoid";
import { HStack, Button, filter } from "@chakra-ui/react";
import { memo } from "react";
import PaginationButton from "./PaginationButton";

const TablePaggination = (props) => {
  const pages = Math.ceil(props.elementList / props.pageElements);
  const pageArray = new Array(pages).fill(undefined).map((_, e) => e + 1);
  const [buttonsState, setButtonsState] = React.useState(
    pageArray.map((element) => ({
      value: element,
      disabled: element === props.pageFirst + 1 ? true : false,
    }))
  );

  function updateButtonsState(e) {
    const element = e.target;
    setButtonsState((prevState) => { 
        const prev=prevState.map((button) =>{
            if(button.value==element.getInnerHTML())
                return {...button, disabled:true}
            return {...button,disabled:false}});
        return prev.slice();
        });};
        
   
        
  
    

  return (
    buttonsState &&
    <div style={{ marginBottom: "20px", float: "right" }}>
      <HStack>
        {buttonsState.map((button) => (
          <PaginationButton key={nanoid()} updateButtonsState={updateButtonsState} handleClick={props.handleClick} value={button.value} isDisabled={button.disabled}/>
        ))}
      </HStack>
    </div>
  );
};

export default React.memo(TablePaggination);
