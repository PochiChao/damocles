// This calls NewsAPI to provide the latest breaking news.

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import {JSDOM} from "jsdom";
import { Readability } from "@mozilla/readability";

const getBreaking = async( req: NextApiRequest, res: NextApiResponse) => {
    const url =
      "https://newsapi.org/v2/top-headlines?" +
      "country=us&" +
      `apiKey=${process.env.NEWS_API_KEY}`;

    // changed implementation to axios.get instead of fetch
    // const newsReq = new Request(url);
    await axios.get(url).then((response) => {
        res.send(response.data)})
    
    // changed implementation to axios.get instead of fetch
    // }).then((data) => {
    //     res.send(data);
    // })

    // code to get the full HTML of an article, but doesn't work
    // axios.get(url).then((r1) => {
    //     let firstResult = r1.data.articles[2];
    //     axios.get(firstResult.url).then((r2) => {
    //         let dom = new JSDOM(r2.data, {
    //             url: firstResult.url,
    //         });
    //         let article = new Readability(dom.window.document).parse();
    //         if (!article) {
    //             return;
    //         }
    //         console.log(article.textContent);
    //         return article;
    //     })
    // })
}

export default getBreaking;