export default async (account, accountToUnfollowData, server) => {
  console.log(
    `unfollowing account ${accountToUnfollowData.acct} by @${account[0]}@${server}...`
  );
  const response = await fetch(
    `https://${server}/api/v1/accounts/${accountToUnfollowData.id}/unfollow`,
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
