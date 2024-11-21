# Mastodon Account Migration Tool

1. Register accounts on the new server for each of the accounts you're migrating. If you're an admin of the server to which you're migrating, you can use the [tootctl](https://docs.joinmastodon.org/admin/tootctl/) command line tool to create the account, and also approve it.

```sh
tootctl accounts create USERNAME --email EMAIL --confirmed
tootctl accounts modify USERNAME --approve
```

If necessary, you can also reset an account's password.

```sh
tootctl accounts modify USERNAME --reset-password
```

2. Rename `accounts-example.csv` to `accounts.csv` and update the list of accounts with usernames and passwords for "migrating from" and "migrating to" servers. You can leave the MIGRATED and TOKEN columns empty, the migration script will fill these out for you.

```
ACCOUNT,EMAIL,PASSWORD_FROM,PASSWORD_TO,MIGRATED,TOKEN
account1,account1@gmail.com,*****,*****,,
account2,account2@gmail.com,*****,*****,,
account3,account3@gmail.com,*****,*****,,
```

This file will be overwritten during the migration process, marking each account as migrated, so you will be able to resume later if needed. Please also consider making a backup of your `accounts.csv` file before you begin.

3. Install project dependencies.

```sh
npm install
```

4. Finally, run the migration script. This will

- copy the name, description, and profile fields between each of the migrating accounts
- set up a new app with `write` permission for each of the accounts and save the token in the `accounts.csv` file

```sh
npm run migrate -- --from=SERVER1.SOCIAL --to=SERVER2.SOCIAL
```

For example, if you're migrating your accounts from `botsin.space` to `stefanbohacek.online`, you'd run:

```sh
npm run migrate -- --from=botsin.space --to=stefanbohacek.online
```

Optionally you you can also pass the `--delete_old_posts` parameter to set up automatic deletion of old posts for the new accounts. (The old accounts from which you're migrating will not be affected.)

```sh
npm run migrate -- --from=SERVER1.SOCIAL --to=SERVER2.SOCIAL --delete_old_posts
```

This will delete all posts older than 2 weeks, other than:

- pinned posts
- direct messages
- favorites
- bookmarks
- polls
- posts with at least 3 favorites or 3 boosts

To customize these options, look for `if (options.delete_old_posts)` inside the `modules/migrateAccount.js` file.


## Extras

### Mass-follow a specific account

```sh
npm run follow -- --server=stefanbohacek.online --account=@bsky.brid.gy@bsky.brid.gyss
```

### Boost a post as an announcement to all bot followers

Note: This feature is experimental and currently works only if the status you're boosting is on the same server as all your bots.

```sh
npm run announce -- --status=https://stefanbohacek.online/@stefan/113516500422769407 
```