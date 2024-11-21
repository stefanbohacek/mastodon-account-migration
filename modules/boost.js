export default async (account, status) => {
  console.log(`boosting ${status} with @${account[0]}...`);
  const statusSplit = status.split("/");
  const response = await fetch(
    `https://${statusSplit[2]}/api/v1/statuses/${statusSplit[4]}/reblog`,
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
