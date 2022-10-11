import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import StockItem from "./pages/StockItem";
import Stocks from "./pages/Stocks";
import Error from "./pages/Error";
import { StockListContextProvider } from "./context/stockListContext";
function App() {
  return (
    <div className="container">
      <StockListContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Stocks />} />
            <Route path="/item/:stock" element={<StockItem />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </StockListContextProvider>
    </div>
  );
}

export default App;
