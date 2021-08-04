const puppeteer = require("puppeteer");
const fs = require("fs/promises");

const user = {
  fname: "ahmed",
  lname: "khalid",
  phone: "01155362632",
  email: "ahmedkhalid@test.com",
  password: "P@ssword1",
};

const login = async () => {
  try {
    const broswer = await puppeteer.launch({ headless: false });
    const page = await broswer.newPage();
    await page.goto("http://tailor-s.herokuapp.com/login");
    await page.type("input[formcontrolname=email]", user.email);
    await page.type("input[formcontrolname=password]", user.password);
    await page.click("button[type=submit]");
    await page.waitForNavigation({ waitUntil: "networkidle2" });
    await page.screenshot({ path: "screens/tailors.jpg", fullPage: true });
    const names = await page.$$eval(".tailor-name", (names) => {
      return names.map((name) => JSON.stringify({ name: name.innerText }));
    });
    await fs.writeFile("text/tailorsNames.json", `[${names.join(",\r\n")}]`);
  } catch (error) {
    console.log(error);
  }
};

const signUp = async () => {
  const broswer = await puppeteer.launch({ headless: false });
  const page = await broswer.newPage();
  await page.goto("http://tailor-s.herokuapp.com/signup");
  await page.type("input[name=fname]", user.fname);
  await page.type("input[name=lname]", user.lname);
  await page.type("input[formcontrolname=phone]", user.phone);
  await page.type("input[formcontrolname=email]", user.email);
  await page.type("input[formcontrolname=password]", user.password);
  await page.click("button[type=submit]");
  await page.waitForNavigation();
  await login();
  await broswer.close();
};

login();
