// Puppeteer sample to login to HRIS and extract a table.
// WARNING: This is a template. Update selectors and credentials stored in env vars.
const puppeteer = require('puppeteer');
(async()=>{
  const browser = await puppeteer.launch({headless:true, args:['--no-sandbox']});
  const page = await browser.newPage();
  await page.goto(process.env.HRIS_URL || 'http://hris.prangroup.com:8686/Pages/Attendance/OTReport.aspx', {waitUntil:'networkidle2'});
  // Example: fill forms (change selectors)
  // await page.type('#username', process.env.HRIS_USER);
  // await page.type('#password', process.env.HRIS_PASS);
  // await page.click('#loginBtn');
  // await page.waitForNavigation();
  // Extract table rows example:
  const rows = await page.$$eval('table tr', trs => trs.map(tr => Array.from(tr.querySelectorAll('th,td')).map(cell => cell.innerText)));
  console.log(JSON.stringify(rows, null, 2));
  await browser.close();
})();
