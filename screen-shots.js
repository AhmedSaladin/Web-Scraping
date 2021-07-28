const puppeteer = require("puppeteer");

const start = async () => {
  const broswer = await puppeteer.launch();
  const page = await broswer.newPage();
  await page.goto(
    "https://github.com/puppeteer/puppeteer"
  );
  await page.screenshot({ path: "screens/Puppeteer.jpg", fullPage: true });
  await broswer.close();
};

start();
