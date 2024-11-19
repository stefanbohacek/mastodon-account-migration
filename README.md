# Mastodon Account Migration Tool

1. Create your new acconts. If you're an admin of the server, you can use the [tootctl](https://docs.joinmastodon.org/admin/tootctl/) command line tool to create the account, and also approve it.

```sh
tootctl accounts create USERNAME --email EMAIL --confirmed
tootctl accounts modify USERNAME --approve
```

If necessary, you can also reset the account's password.

```sh
tootctl accounts modify USERNAME --reset-password
```

2. Rename `accounts-example.csv` to `accounts.csv` and update the list of accounts with usernames and passwords for "migrating from" and "migrating to" servers. You can leave the MIGRATED and TOKEN columns empty, the migration script will fill these out for you.

```
ACCOUNT,EMAIL,PASSWORD_FROM,PASSWORD_TO,MIGRATED,TOKEN
bot1,bot1@gmail.com,*****,*****,,
bot2,bot2@gmail.com,*****,*****,,
bot3,bot3@gmail.com,*****,*****,,
```

This file will be overwritten during the migration process, marking each bot as migrated, so you will be able to resume later if needed. Please also consider making a backup of your `accounts.csv` file before you begin.

3. Install project dependencies.

```sh
npm install
```

4. Finally, run the migration script. This will copy the name, description, and profile fields between each of the migrating accounts.

```sh
npm run migrate -- --from=SERVER1.SOCIAL --to=SERVER2.SOCIAL
```

For example, if you're migrating your bots from `botsin.space` to `stefanbohacek.online`, you'd run:

```sh
npm run migrate -- --from=botsin.space --to=stefanbohacek.online
```

Optionally you you can also pass the `--delete_old_posts` parameter to set up automatic deletion of old posts.

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

