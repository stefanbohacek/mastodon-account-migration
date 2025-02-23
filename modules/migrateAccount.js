import puppeteer from "puppeteer";
import getAccountInfo from "./getAccountInfo.js";
import downloadImages from "./downloadImages.js";

export default async (account, options) => {
  console.log(
    `migrating @${account[0]}@${options.from} to @${account[0]}@${options.to}...`
  );

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(120000);

    console.log(`logging into ${options.to}...`);

    await page.goto(`https://${options.to}/auth/sign_in`);
    await page.locator("#user_email").fill(account[1]);
    await page.locator("#user_password").fill(account[3]);
    await page.locator(".actions button[type='submit']").click();
    await page.locator("[href='/settings/preferences']").waitHandle();

    if (!account[4]) {
      const accountData = await getAccountInfo(account, options.from);
      const images = await downloadImages(accountData, options.from);

      console.log(`opening https://${options.to}/settings/profile`);
      await page.goto(`https://${options.to}/settings/profile`);

      console.log(`updating @${account[0]} account profile page...`);
      await page
        .locator("#account_display_name")
        .fill(accountData.display_name);
      await page.locator("#account_note").fill(accountData.note);

      if (images.avatar) {
        const filePicker = await page.$("#account_avatar");
        console.log(`uploading profile image...`);
        await filePicker.uploadFile(images.avatar);
      }

      if (images.header) {
        const filePicker = await page.$("#account_header");
        console.log(`uploading header image...`);
        await filePicker.uploadFile(images.header);
      }

      if (accountData.fields) {
        console.log(`updating profile fields...`);

        for (const [index, field] of accountData.fields.entries()) {
          await page
            .locator(`[name="account[fields_attributes][${index}][name]"]`)
            .fill(field.name);
          await page
            .locator(`[name="account[fields_attributes][${index}][value]"]`)
            .fill(field.value);
        }
      }

      console.log(`marking account as automated...`);
      await page.locator("#account_bot").click();

      console.log(`submitting profile changes...`);
      await page.locator(".actions button[type='submit']").click();
      await page.waitForNavigation();
    }

    if (options.delete_old_posts) {
      await page.goto(`https://${options.to}/statuses_cleanup`);
      const checkbox = await page.$("#account_statuses_cleanup_policy_enabled");
      const isChecked = await (
        await checkbox.getProperty("checked")
      ).jsonValue();

      if (isChecked) {
        console.log(`automatic post deletion already set...`);
      } else {
        console.log(`setting automatic post deletion...`);
        await checkbox.click();
        await page
          .locator(".account_statuses_cleanup_policy_keep_polls")
          .click();
        await page
          .locator("#account_statuses_cleanup_policy_min_favs")
          .fill("3");
        await page
          .locator("#account_statuses_cleanup_policy_min_reblogs")
          .fill("3");
        await page
          .locator(".content__heading__actions button[type='submit']")
          .click();
        await page.waitForNavigation();
      }
    }

    if (!account[5]) {
      console.log(`creating new app...`);

      await page.goto(`https://${options.to}/settings/applications/new`);
      await page.locator("#doorkeeper_application_name").fill(account[0]);
      await page.locator("#doorkeeper_application_scopes_write").click();
      await page.locator(".actions button[type='submit']").click();
      await page.waitForNavigation();

      console.log(`retrieving auth token...`);

      await page.locator("table tr td a").click();
      await page.waitForNavigation();

      const codes = await page.$$("table tr td code");
      token = await page.evaluate((code) => code.textContent, codes[2]);
    }

    if (!account[4]) {
      console.log(`setting up account alias...`);

      await page.goto(`https://${options.to}/settings/aliases`, {
        timeout: 60000,
      });
      await page
        .locator("#account_alias_acct")
        .fill(`${account[0]}@${options.from}`);
      await page.locator(".actions button[type='submit']").click();
      await page.waitForNavigation();

      console.log(`logging into ${options.from}...`);
      await page.setDefaultTimeout(180000);

      await page.goto(`https://${options.from}/auth/sign_in`, {
        timeout: 60000,
      });
      await page.locator("#user_email").fill(account[1]);
      await page.locator("#user_password").fill(account[2]);
      await page.locator(".actions button[type='submit']").click();
      await page.locator("[href='/settings/preferences']").waitHandle();

      console.log(`opening https://${options.from}/settings/migration`);

      await page.goto(`https://${options.from}/settings/migration`, {
        timeout: 60000,
      });

      console.log(`setting up new account for @${account[0]}...`);

      await page
        .locator("#account_migration_acct")
        .fill(`${account[0]}@${options.to}`);
      await page
        .locator("#account_migration_current_password")
        .fill(account[2]);

      await page.locator(".actions button[type='submit']").click();
      console.log(`moving @${account[0]} followers...`);
      await page.waitForNavigation();
    }

    await browser.close();
    console.log(`done!`);
  } catch (error) {
    console.log("error migrating account", error);
  }

  return account;
};
