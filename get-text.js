const puppeteer = require("puppeteer");
const fs = require("fs/promises");

const start = async () => {
  try {
    const broswer = await puppeteer.launch();
    const page = await broswer.newPage();
    await page.goto("https://deals.souq.com/eg-ar/electronics/c/16892");
    const titles = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".title a")).map((a) => {
        return JSON.stringify({ title: a.title, link: a.href });
      });
    });
    await fs.writeFile("text/souq.json", `[${titles.join(",\r\n")}]`);
    await broswer.close();
  } catch (err) {
    console.log(err);
  }
};

start();
