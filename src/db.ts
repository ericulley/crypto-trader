import postgres from "postgres";
import config from "./config";

const sql = postgres(config.db.url, { ssl: "require" }) as postgres.Sql;

export default sql;

export const insertInto = async (crypto: string, currency: string, buyPrice: number, sellPrice: number, spotPrice: number, time: number) => {
  const row = await sql`
    INSERT INTO crypto_trader
        (crypto, currency, buy_price, sell_price, spot_price, timestamp)
    VALUES
        (${crypto}, ${currency}, ${buyPrice}, ${sellPrice}, ${spotPrice}, ${time})
    RETURNING crypto, currency, buy_price, sell_price, spot_price, timestamp;
    `;
  return row;
};
