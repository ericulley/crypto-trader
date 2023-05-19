import postgres from "postgres";
import config from "./config";

const sql = postgres(config.db.url, { ssl: "require" }) as postgres.Sql;

export default sql;
