const puppeteer = require("puppeteer");
const fs = require("fs/promises");

const start = async () => {
  try {
    const broswer = await puppeteer.launch({ headless: true });
    const page = await broswer.newPage();
    await page.goto("https://learnwebcode.github.io/practice-requests/");
    const photos = await page.$$eval("img", (imgs) => {
      return imgs.map((img) => img.src);
    });
    for (const photo of photos) {
      const imagePage = await page.goto(photo);
      fs.writeFile(
        `photos/${photo.split("/").pop()}`,
        await imagePage.buffer()
      );
    }
    await broswer.close();
  } catch (err) {
    console.log(err);
  }
};

start();
