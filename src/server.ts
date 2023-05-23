import config from "./config";
import axios from "axios";
import sql, { insertInto } from "./db";
import postgres from "postgres";

import { getPrices } from "./prices";

const delay = async (time: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (isNaN(time)) {
      reject(new Error("Argument is not a number"));
    } else {
      setTimeout(resolve, time);
    }
  });
};

const mainLoop = async () => {
  // Fetch price
  const [buyPrice, sellPrice, spotPrice] = await getPrices();
  console.log([buyPrice, sellPrice, spotPrice]);

  // Insert data into DB
  let row = await insertInto("BTC", "USD", buyPrice, sellPrice, spotPrice, Date.now());
  console.log("DB INSERT INTO: ", row);
  //   const row = await sql`
  //   INSERT INTO crypto_trader
  //       (crypto, currency, buy_price, sell_price, spot_price, timestamp)
  //   VALUES
  //       ('btc-usd', ${btcBuyPrice})
  //   returning currency, value
  //   `;
  // console.log(intertion);

  const timeInterval = 10 * 1000;
  await delay(timeInterval);
  mainLoop();
};

export const start = async () => {
  mainLoop();
};

start();
