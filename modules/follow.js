export default async (account, accountToFollowData, server) => {
  console.log(
    `following account ${accountToFollowData.acct} by @${account[0]}@${server}...`
  );
  const response = await fetch(
    `https://${server}/api/v1/accounts/${accountToFollowData.id}/follow`,
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
