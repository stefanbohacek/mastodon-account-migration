export default async (account, accountToBlock, server) => {
  console.log(
    `blocking account ${accountToBlock.acct} by @${account[0]}@${server}...`
  );
  const response = await fetch(
    `https://${server}/api/v1/accounts/${accountToBlock.id}/block `,
    {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + account[5],
      },
    }
  );

  const responseData = await response.json();
  console.log("responseData", responseData);
};
