import config from "./config";
import axios from "axios";
import sql from "./db";
import postgres from "postgres";

const cbPricesUrl = "https://api.coinbase.com/v2/prices";

const getBuyPrice = async (currencyPair: string) => {
  const res = await axios.get(`${cbPricesUrl}/${currencyPair}/buy`);
  return res.data.data.amount as Number;
};

const getSellPrice = async (currencyPair: string) => {
  const res = await axios.get(`${cbPricesUrl}/${currencyPair}/sell`);
  return res.data.data.amount;
};

const getSpotPrice = async (currencyPair: string) => {
  const res = await axios.get(`${cbPricesUrl}/${currencyPair}/spot`);
  return res.data.data.amount;
};

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
  let btcBuyPrice = (await getBuyPrice("btc-usd")) as number;
  console.log("Buy Price", btcBuyPrice);
  let btcSellPrice = (await getSellPrice("btc-usd")) as number;
  console.log("Sell Price", btcSellPrice);
  let btcSpotPrice = (await getSpotPrice("btc-usd")) as number;
  console.log("Spot Price: ", btcSpotPrice);
  const timeInterval = 10 * 1000;
  await delay(timeInterval);
  mainLoop();
};

export const start = async () => {
  mainLoop();

  //   const intertion = await sql`
  //     insert into crypto_test
  //         (currency, value)
  //     values
  //         ('btc-usd', ${btcBuyPrice})
  //     returning currency, value
  //     `;
  //   console.log(intertion);
};

start();
