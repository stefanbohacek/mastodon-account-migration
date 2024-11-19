import fs from "fs";
import { parse } from "csv-parse";

export default async () => {
  const records = [];
  try {
    const parser = fs.createReadStream("./accounts.csv").pipe(parse());
    for await (const record of parser) {
      records.push(record);
    }
  } catch (error) {
    console.log("loadAccounts error", error);
  }
  return records;
};
