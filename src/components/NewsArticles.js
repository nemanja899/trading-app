import React from "react";
import axios from "axios";
import NewsCard from "./NewsCard";
import { Grid, GridItem,Text } from "@chakra-ui/react";
import {nanoid} from "nanoid";
const NewsArticles = (props) => {
  const [news, setNews] = React.useState();

  React.useEffect(() => {
    const fetchNews = async () => {
      const encodedParams = new URLSearchParams();
      encodedParams.append("symbol", props.symbol);
      const options = {
        method: "POST",
        url: "https://yahoo-finance97.p.rapidapi.com/news",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key":
            "<your-rapid-API>",
          "X-RapidAPI-Host": "yahoo-finance97.p.rapidapi.com",
        },
        data: encodedParams,
      };

      const response = await axios.request(options);
      const responseData = response.data.data;
      console.log(responseData);
      const data = responseData.map((el) => ({
        link: el.link,
        title: el.title,
        thumbnail: el.thumbnail
          ? el.thumbnail.resolutions[0].url
          : "https://p0.pikrepo.com/preview/274/489/stock-market.jpg",
        publisher: el.publisher,
      }));

      setNews(data);
    };
    fetchNews();
  }, []);

  return (
    <div  style={{ backgroundColor: "rgba(145,158,171,0.04)" }}
    className="mt-5 p-4 shadow-sm bg-white">
        <div className="mt-2"><Text fontSize='2xl'>Related News Articles</Text></div>
      {news && (
        <Grid
          templateColumns="repeat(3,1fr)"
          templateRows={`repeat(${Math.ceil(news.length/3)},1fr)`}
          gap={9}
        >
          {news.map((n) => {
            return (
              <GridItem key={nanoid()}>
                <NewsCard key={nanoid()} news={n} />
              </GridItem>
            );
          })}
        </Grid>
      )}
    </div>
  );
};

export default NewsArticles;
