import React from "react";

export const StockListContext = React.createContext();

export const StockListContextProvider = (props) => {
  const [watchList, setWachList] = React.useState(["MSFT","AAPL","GOOG","AMZN","TSLA","BRK.A",
"UNH","JNJ","XOM","V","META","QCOM","MS","WMT","CVX","JPM","LLY","NVDA","PG","HD","MA","BAC","ABBV","PFE",
"KO","PEP","MRK","BABA","COST","TMO","DHR","AVGO","ABT","TMUS","MCD","ORCL","CSCO",
"ACN","WFC","VZ","NEE","COP","CRM","PM","CMCSA","BMY","TXN","SCHW","UPS","RTX","HON",
"IBM","T","LMT","INTC","PYPL","AXP","BX","GS","NFLX","SBUX","AMD","BLK","C","BA","NOC",
"AMAT","ABNB","GD","MMM","CME","MU","GM","MPC","UBER"]);

  const addToWatchList=(stock)=>{
    if (watchList.indexOf(stock) === -1){
        setWachList(()=>([...watchList,stock]));
     
    }
  }

  function removeFromStockList(stock){
    const removeStock=watchList.filter(st => (st!==stock));

    setWachList(removeStock);
  }

  return (
    <StockListContext.Provider value={{ watchList, addToWatchList,removeFromStockList }}>
      {props.children}
    </StockListContext.Provider>
  );
};
