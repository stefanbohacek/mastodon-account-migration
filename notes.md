```sh
tootctl accounts create USERNAME --email EMAIL --confirmed
tootctl accounts create southpoleviews --email stefan.bohacek+southpoleviews@gmail.com --confirmed
```

| USER                                     | PASSWORD                            |
| ---------------------------------------- | ----------------------------------- |
| stefan.bohacek+trains@gmail.com          | 2bc95a2607338bff2e872c69679d25df    |
| stefan.bohacek+southpoleviews@gmail.com  | 56945cd618f09991ccda35e51d71c21d    |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
| stefan.bohacek+USERNAME@gmail.com        | ******                              |
                                  
       


```js

const from_server = "botsin.space";
const to_server = "botsin.space";

const accounts = [
  {
    from_id: "trains",
    to_id: "trains",
    token: "TOKEN"
  },
  {
    from_id: "southpoleviews",
    to_id: "southpoleviews",
    token: "TOKEN"
  }
];


(async function () {
  for await (const account of accounts) {
    const url = `https://${server}/api/v1/accounts/lookup?acct=${account.from_id}@${server}`;
    const resp = await fetch(url);
    const respJSON = await resp.json();

  }
})();



```