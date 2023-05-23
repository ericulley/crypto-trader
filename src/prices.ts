import axios from "axios";

const crypto: string[] = ["BTC", "ETH"];
const currency: string[] = ["USD"];
const cbPricesUrl: string = "https://api.coinbase.com/v2/prices";

export const getBuyPrice = async (currencyPair: string): Promise<number> => {
  const res = await axios.get(`${cbPricesUrl}/${currencyPair}/buy`);
  return res.data.data.amount as number;
};

export const getSellPrice = async (currencyPair: string): Promise<number> => {
  const res = await axios.get(`${cbPricesUrl}/${currencyPair}/sell`);
  return res.data.data.amount;
};

export const getSpotPrice = async (currencyPair: string): Promise<number> => {
  const res = await axios.get(`${cbPricesUrl}/${currencyPair}/spot`);
  return res.data.data.amount;
};

export const getPrices = async (): Promise<number[]> => {
  let buyPrice: number;
  let sellPrice: number;
  let spotPrice: number;
  return ([buyPrice, sellPrice, spotPrice] = await Promise.all([getBuyPrice(`BTC-USD`), getSellPrice(`BTC-USD`), getSpotPrice(`BTC-USD`)]));
};
