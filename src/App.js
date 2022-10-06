import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import  StockItem  from "./pages/StockItem";
import  Stocks  from "./pages/Stocks";
import Error from "./pages/Error";
function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Stocks/>}/>
          <Route path="/item/:stock" element={<StockItem/>}/>
          <Route path="*"  element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
