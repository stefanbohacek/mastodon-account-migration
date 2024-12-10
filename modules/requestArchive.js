import puppeteer from "puppeteer";

export default async (account, options) => {
  console.log(
    `requesting archive for @${account[0]}@${options.server}...`
  );

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(120000);

    console.log(`logging into ${options.server}...`);

    await page.goto(`https://${options.server}/auth/sign_in`);
    await page.locator("#user_email").fill(account[1]);
    await page.locator("#user_password").fill(account[2]);
    await page.locator(".actions button[type='submit']").click();
    await page.locator("#data").waitHandle();

    console.log(`opening https://${options.server}/settings/export`);
    await page.goto(`https://${options.server}/settings/export`);

    console.log(`requesting export file for @${account[0]}...`);
    await page.locator("a[data-method='post']").click();
    await page.waitForNavigation();
    await browser.close();
    console.log(`done!`);
  } catch (error) {
    console.log("error migrating account", error);
  }

  return account;
};
