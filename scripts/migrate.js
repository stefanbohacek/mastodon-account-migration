import fs from "fs";
import commandLineArgs from "command-line-args";
import loadAccounts from "../modules/loadAccounts.js";
import migrateAccount from "../modules/migrateAccount.js";

const options = commandLineArgs([
  { name: "from", type: String },
  { name: "to", type: String },
  { name: "delete_old_posts", type: Boolean, defaultOption: false },
]);

(async function () {
  console.log(options);
  if (!options.from || !options.to) {
    console.log(
      "usage: npm run migrate -- --from=SERVER1.SOCIAL --to=SERVER2.SOCIAL"
    );
  } else {
    const accounts = await loadAccounts();

    for (let [index, account] of accounts.entries()) {
      if (index > 0) {
        account = await migrateAccount(account, options);
        if (account) {
          console.log("saving...");
          fs.writeFileSync("./accounts.csv", accounts.join("\n"));
        }
      }
    }
  }
})();
