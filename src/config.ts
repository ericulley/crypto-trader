import dotenv from "dotenv";
dotenv.config();

const CB_API_KEY = process.env.CB_API_KEY as string;
const CB_API_SECRET = process.env.CB_API_SECRET as string;
const PG_URL = process.env.PG_URL as string;

export default {
  cb: {
    apiKey: CB_API_KEY,
    apiSecret: CB_API_SECRET,
  },
  db: {
    url: PG_URL,
  },
};
