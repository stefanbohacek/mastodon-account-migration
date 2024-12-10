import commandLineArgs from "command-line-args";
import getAccountInfo from "../modules/getAccountInfo.js";
import loadAccounts from "../modules/loadAccounts.js";
import follow from "../modules/follow.js";
import sleep from "../modules/sleep.js";

const options = commandLineArgs([
  { name: "server", type: String },
  { name: "account", type: String },
]);

(async function () {
  console.log(options);
  if (!options.server || !options.account) {
    console.log(
      "usage: npm run follow -- --server=SERVER.SOCIAL --account=@USER@SERVER.SOCIAL"
    );
  } else {
    const accountToFollow = options.account;
    const accountToFollowData = await getAccountInfo(
      [accountToFollow],
      options.server
    );
    const accounts = await loadAccounts();

    for (let [index, account] of accounts.entries()) {
      if (index > 0) {
        await follow(account, accountToFollowData, options.server);
        await sleep(1000);
      }
    }
    console.log("finished!");
    return true;
  }
})();
