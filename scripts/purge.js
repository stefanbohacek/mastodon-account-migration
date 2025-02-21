import commandLineArgs from "command-line-args";
import getAccountInfo from "../modules/getAccountInfo.js";
import loadAccounts from "../modules/loadAccounts.js";
import follow from "../modules/follow.js";
import sleep from "../modules/sleep.js";

const options = commandLineArgs([
  { name: "account", type: String },
  { name: "server", type: String },
  { name: "search", type: String },
  { name: "replace", type: String },
]);

(async function () {
  console.log(options);
  if (!options.account || !options.server) {
    console.log(
      "usage: npm purge -- --account=ACCOUNT --server=SERVER --skip=POSTID1,POSTID2,POSTID3"
    );
  } else {
    const accounts = await loadAccounts();
    let account;
    try {
      account = accounts.filter((account) => account[0] === options.account)[0];
      // console.log(account);

      const accountInfo = await getAccountInfo([account[0]], options.server);
      console.log(accountInfo);

      let hasStatuses = true;

      while (hasStatuses) {
        const statusesRequest = await fetch(
          `https://${options.server}/api/v1/accounts/${accountInfo.id}/statuses?limit=100&exclude_reblogs=true`
        );
        const statuses = await statusesRequest.json();
        if (statuses && statuses.length) {
          for (let status of statuses) {
            if (status.id !== "113857965664684569" && status.id !== "113857965020297136" ){
              console.log(`deleting status ${status.id}...`);
              const statusDeleteRequest = await fetch(
                `https://${options.server}/api/v1/statuses/${status.id}`,
                {
                  method: "DELETE",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + account[5],
                  },
                }
              );
              const statusDeleteRequestJSON = await statusDeleteRequest.json();
              console.log(statusDeleteRequestJSON);
              await sleep(500);
            } else {
              console.log(`skipping status ${status.id}...`);
            }
          }
        } else {
          console.log(`no more statuses...`);
          hasStatuses = false;
        }
      }

      console.log(statuses);
    } catch (error) {
      console.log("account not found");
    }

    // for (let [index, account] of accounts.entries()) {
    //   if (index > 0) {
    //     if (skipAccounts.length === 0 || !skipAccounts.includes(account[0])) {
    //       // console.log(account);
    //       await follow(account, accountToFollowData, options.server);
    //       await sleep(2000);
    //     } else {
    //       console.log(`skipping ${account[0]}...`);
    //     }
    //   }
    // }
    console.log("finished!");
    return true;
  }
})();
