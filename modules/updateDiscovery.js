import puppeteer from "puppeteer";
import sleep from "./sleep.js";

export default async (account, options) => {
  console.log(
    `updating discovery options for @${account[0]}@${options.server}...`
  );

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(120000);

    console.log(`logging into ${options.server}...`, account);

    await page.goto(`https://${options.server}/auth/sign_in`);
    await page.locator("#user_email").fill(account[1]);
    await page.locator("#user_password").fill(account[3]);
    await page.locator(".actions button[type='submit']").click();
    await page.waitForNavigation({ waitUntil: "networkidle2" });

    console.log(`opening https://${options.server}/settings/privacy`);
    await page.goto(`https://${options.server}/settings/privacy`);

    const checkboxes = [
      "#account_discoverable",
      "#account_indexable",
      "#account_settings_indexable",
    ];

    console.log(`enabling discovery options for @${account[0]}...`);

    for (let checkboxSelector of checkboxes) {
      const checkbox = await page.$(checkboxSelector);
      console.log(checkboxSelector, checkbox);
      const isChecked = await (
        await checkbox.getProperty("checked")
      ).jsonValue();

      if (!isChecked) {
        await checkbox.click();
      }
    }

    await page.locator("button[type='submit']").click();
    await page.waitForNavigation();
    await browser.close();
    console.log(`done!`);
  } catch (error) {
    console.log("error updating discovery", error);
  }

  return account;
};
