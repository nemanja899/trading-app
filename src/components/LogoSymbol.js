import React from 'react';
import {

    Tooltip,
    Avatar,
  } from "@chakra-ui/react";
  
const LogoSymbol=({stockProfile,st})=>{

  
return ((stockProfile && stockProfile.data) &&
    <Tooltip hasArrow placement='top' label={stockProfile.data.name}>
    <div>
      <div style={{ display: "inline-block" }}>
        <Avatar
          size="sm"
          src={stockProfile.data.logo}
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
);
};

export default React.memo(LogoSymbol);