import commandLineArgs from "command-line-args";
import loadAccounts from "../modules/loadAccounts.js";
import boost from "../modules/boost.js";
import sleep from "../modules/sleep.js";

const options = commandLineArgs([
  { name: "status", type: String },
  { name: "skip", type: String },
]);

(async function () {
  console.log(options);
  if (!options.status) {
    console.log(
      "usage: npm run announce -- --status=HTTPS://SERVER.SOCIAL/@USER/12345"
    );
  } else {
    const status = options.status;
    const accounts = await loadAccounts();
    const skipAccounts = options?.skip?.split(",") || [];

    for (let [index, account] of accounts.entries()) {
      if (index > 0) {
        if (skipAccounts.length === 0 || !skipAccounts.includes(account[0])) {
          // console.log(account);
          await boost(account, status);
          await sleep(1000);
        } else {
          console.log(`skipping ${account[0]}...`);
        }
      }
    }
  }
})();
