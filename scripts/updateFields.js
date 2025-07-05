import fs from "fs";
import commandLineArgs from "command-line-args";
import loadAccounts from "../modules/loadAccounts.js";
import updateFields from "../modules/updateFields.js";

const options = commandLineArgs([
  { name: "server", type: String }
]);

(async function () {
  console.log(options);
  if (!options.server) {
    console.log(
      "usage: npm run update_fields -- --server=SERVER.SOCIAL"
    );
  } else {
    const accounts = await loadAccounts();

    for (let [index, account] of accounts.entries()) {
      if (index > 0) {
        account = await updateFields(account, options);
      }
    }
    console.log("finished!");
    return true;
  }
})();
