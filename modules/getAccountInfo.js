import { stripHtml } from "string-strip-html";

export default async (account, fromServer) => {
  console.log(`fetching account info for @${account[0]}@${fromServer}...`);
  let accountData = {};

  try {
    const url = `https://${fromServer}/api/v1/accounts/lookup?acct=${account[0]}@${fromServer}`;
    // console.log(url);
    const resp = await fetch(url);
    accountData = await resp.json();
    accountData.note = stripHtml(
      accountData.note.replaceAll("</p><p>", "\n\n")
    ).result;
    if (accountData.fields) {
      for (let field of accountData.fields) {
        field.value = stripHtml(field.value).result;
      }
    }
  } catch (error) {
    console.log("getAccountInfo error", error);
  }

  return accountData;
};
