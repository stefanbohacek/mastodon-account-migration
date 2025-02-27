import commandLineArgs from "command-line-args";
import getAccountInfo from "../modules/getAccountInfo.js";
import loadAccounts from "../modules/loadAccounts.js";
import follow from "../modules/follow.js";
import sleep from "../modules/sleep.js";

const options = commandLineArgs([
  { name: "server", type: String },
  { name: "account", type: String },
  { name: "skip", type: String },
]);

(async function () {
  console.log(options);
  if (!options.server || !options.account) {
    console.log(
      "usage: npm run follow -- --server=SERVER.SOCIAL --account=@USER@SERVER.SOCIAL"
    );
  } else {
    const skipAccounts = options?.skip?.split(",") || [];
    const accountToFollow = options.account;
    const accountToFollowData = await getAccountInfo(
      [accountToFollow],
      options.server
    );
    const accounts = await loadAccounts();

    for (let [index, account] of accounts.entries()) {
      if (index > 0) {
        if (skipAccounts.length === 0 || !skipAccounts.includes(account[0])) {
          // console.log(account);
          await follow(account, accountToFollowData, options.server);
          await sleep(2000);
        } else {
          console.log(`skipping ${account[0]}...`);
        }
      }
    }
    console.log("finished!");
    return true;
  }
})();
