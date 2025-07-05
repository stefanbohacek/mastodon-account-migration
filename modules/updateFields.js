import puppeteer from "puppeteer";
import getAccountInfo from "./getAccountInfo.js";

export default async (account, options) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(120000);
    const accountData = await getAccountInfo(account, options.server);
    let needsSaving = false;

    if (accountData.fields) {
      console.log(
        `checking profile fields for @${account[1]}@${options.server}...`
      );

      for (const [index, field] of accountData.fields.entries()) {
        console.log(field);
        if (
          field.value &&
          field.value.includes("stefans-creative-bots.glitch.me")
        ) {
          needsSaving = true;
        }
      }
    }

    if (needsSaving) {
      console.log(`logging into ${options.server} as ${account[1]}...`);

      await page.goto(`https://${options.server}/auth/sign_in`);
      await page.locator("#user_email").fill(account[1]);
      await page.locator("#user_password").fill(account[3]);
      await page.locator(".actions button[type='submit']").click();
      await page.locator("[href='/settings/preferences']").waitHandle();

      console.log(`opening https://${options.server}/settings/profile`);
      await page.goto(`https://${options.server}/settings/profile`);

      for (const [index, field] of accountData.fields.entries()) {
        console.log(field);
        if (
          field.value &&
          field.value.includes("stefans-creative-bots.glitch.me")
        ) {
          await page
            .locator(`[name="account[fields_attributes][${index}][value]"]`)
            .fill("https://bots.stefanbohacek.com");
        }
      }

      console.log(`submitting profile changes...`);
      await page.locator(".actions button[type='submit']").click();
      await page.waitForNavigation();
      await browser.close();
      console.log(`done!`);
    } else {
      console.log("fields not updated...");
    }
  } catch (error) {
    console.log("error updating account", error);
  }

  return account;
};
