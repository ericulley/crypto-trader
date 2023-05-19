import dotenv from 'dotenv';
dotenv.config()

const testURL = process.env.MONGO_URL
console.log("test: ", testURL);
