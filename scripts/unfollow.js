import commandLineArgs from "command-line-args";
import getAccountInfo from "../modules/getAccountInfo.js";
import loadAccounts from "../modules/loadAccounts.js";
import unfollow from "../modules/unfollow.js";
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
      "usage: npm run unfollow -- --server=SERVER.SOCIAL --account=@USER@SERVER.SOCIAL"
    );
  } else {
    const skipAccounts = options?.skip?.split(",") || [];
    const accountToUnfollow = options.account;
    const accountToUnfollowData = await getAccountInfo(
      [accountToUnfollow],
      options.server
    );
    const accounts = await loadAccounts();

    for (let [index, account] of accounts.entries()) {
      if (index > 0) {
        if (skipAccounts.length === 0 || !skipAccounts.includes(account[0])) {
          // console.log(account);
          await unfollow(account, accountToUnfollowData, options.server);
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
