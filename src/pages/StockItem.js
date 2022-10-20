import React from "react";
import { Link, useParams } from "react-router-dom";
import finhub from "../apis/finhub";
import CandleStickChart from "../components/CandleStickChart";
import ChartPicker from "../components/ChartPicker";
import NewsArticles from "../components/NewsArticles";
import {nanoid} from "nanoid";
import StockItemDetails from "../components/StockItemDetails";
import {Button} from "@chakra-ui/react"

function format(data) {
  const formatedData = data.t.map((el, index) => ({
    x: new Date(el * 1000).toLocaleString("en-US"),
    y: [data.o[index], data.h[index], data.l[index], data.c[index]],
  }));
  return formatedData;
}
export default function StockItem() {
  const { stock } = useParams();
  const [chartData, setChartData] = React.useState();
  const [chartType, setChartType] = React.useState("day");
  const [profile, setProfile] = React.useState();
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const date = new Date();
        const currentDate = Math.floor(date.getTime() / 1000);
        const day = 24 * 60 * 60;
        let oneDay;
        if (date.getDay() === 6) {
          oneDay = currentDate - 2 * day;
        } else if (date.getDay() === 0) {
          oneDay = currentDate - 3 * day;
        } else {
          oneDay = currentDate - day;
        }
        const oneWeek = currentDate - 7 * day;
        const oneYear = currentDate - 365 * day;
        const responses = await Promise.all([
          finhub.get("/stock/candle?", {
            params: {
              symbol: stock,
              resolution: 30,
              from: oneDay,
              to: currentDate,
            },
          }),
          finhub.get("/stock/candle?", {
            params: {
              symbol: stock,
              resolution: 60,
              from: oneWeek,
              to: currentDate,
            },
          }),
          finhub.get("/stock/candle?", {
            params: {
              symbol: stock,
              resolution: "D",
              from: oneYear,
              to: currentDate,
            },
          }),
          finhub.get("/stock/profile2?", { params: { symbol: stock } })
        ]);
        setChartData({
          day: format(responses[0].data),
          week: format(responses[1].data),
          year: format(responses[2].data),
        });
        setProfile(responses[3].data);
      } catch (err) {}
    };
    fetchData();
  }, []);

  return (
    <div>
      {chartData && profile && (
        <div>
            <div className="mt-3">
            <a href="/" className="btn btn-secondary">Back</a></div>
          <CandleStickChart
            chartData={chartData}
            symbol={stock}
            chartType={chartType}
            company={profile.name}
          />
          <div>
            <ChartPicker chartType={chartType} setChartType={setChartType} />
          </div>
          <div><StockItemDetails profile={profile}/></div>
          <div><NewsArticles symbol={stock}/></div>
        </div>
      )}
    </div>
  );
}
