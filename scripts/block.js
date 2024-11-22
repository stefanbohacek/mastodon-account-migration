import commandLineArgs from "command-line-args";
import getAccountInfo from "../modules/getAccountInfo.js";
import loadAccounts from "../modules/loadAccounts.js";
import block from "../modules/block.js";
import sleep from "../modules/sleep.js";

const options = commandLineArgs([
  { name: "server", type: String },
  { name: "account", type: String },
]);

(async function () {
  console.log(options);
  if (!options.server || !options.account) {
    console.log(
      "usage: npm run block -- --server=SERVER.SOCIAL --account=@USER@SERVER.SOCIAL"
    );
  } else {
    const accountToBlock = options.account;
    const accountToBlockData = await getAccountInfo(
      [accountToBlock],
      options.server
    );
    const accounts = await loadAccounts();

    for (let [index, account] of accounts.entries()) {
      if (index > 0) {
        await block(account, accountToBlockData, options.server);
        await sleep(1000);
      }
    }
  }
})();
