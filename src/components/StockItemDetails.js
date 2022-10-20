import React from "react";

const StockItemDetails = ({profile}) => {
  return (
    <div className="row border bg-white rounded shadow-sm p-4 mt-5">
      <div className="col">
        <div><span className="fw-bold">name: </span>{profile.name}</div>
        <div><span className="fw-bold">country: </span>{profile.country}</div>
        <div><span className="fw-bold">ticker: </span>{profile.ticker}</div>
      </div>
      <div className="col">
      <div><span className="fw-bold">Exchange: </span>{profile.exchange}</div>
      <div><span className="fw-bold">Industry: </span>{profile.finnhubIndustry}</div>
      <div><span className="fw-bold">IPO: </span>{profile.ipo}</div>
      </div>
      <div className="col">
      <div><span className="fw-bold">MarketCap: </span>{profile.marketCapitalization}</div>
      <div><span className="fw-bold">Shares Oustanding: </span>{profile.shareOutstanding}</div>
      <div><span className="fw-bold">url: </span><a href={profile.weburl}>{profile.weburl}</a></div>
      </div>
    </div>
  );
};

export default StockItemDetails;
