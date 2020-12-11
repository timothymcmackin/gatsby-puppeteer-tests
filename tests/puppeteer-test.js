const puppeteer = require('puppeteer');
const assert = require('assert');
const fs = require('fs');

const screenshotPath = `tests/screenshots/`;
const basePath = 'http://localhost:8000';

// Expected values for tests
const siteTitle = 'My site';
const githubPath = 'https://github.com/timothymcmackin/gatsby-puppeteer-tests';

// An array of test cases for search; the test searches for the keyword 
// and verifies that the specified page appears in the results
const searchTestCases = [
  {
    "keyword": "ruxpin",
    "result": "/bears.html"
  },
  {
    "keyword": "dolphins",
    "result": "/cats.html"
  }
];

let browser;
let page;

before(async function () {
  browser = await puppeteer.launch({
    // https://github.com/puppeteer/puppeteer/issues/1837#issuecomment-534075536
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-sandbox',
      '--no-zygote',
      '--single-process',
    ],
  });
  page = await browser.newPage();
  // Make the window big enough to hit the full-size bootstrap breakpoint
  page.setViewport({
    width: 1024,
    height: 768,
  });
  // Create the folder for the screenshots
  if (!fs.existsSync(screenshotPath)) {
    fs.mkdirSync(screenshotPath, { recursive: true });
  }
});

describe('Testing home page', async function () {
  this.timeout(10000);
  
  it('loads in the browser', async function () {
    // Load the home page in the browser and take a screenshot
    await page.goto(basePath, { waitUntil: 'networkidle2' });
    await page.screenshot({ path: screenshotPath + '/homepage.png' });
  });

  it('has the correct home page link, site title, and Github link', async function () {
    assert(await verifyThatPageRenderedCorrectly(page));
  });

});

describe(`Testing Tags menu`, async function () {
  this.timeout(20000);

  it('has a Tags menu', async () => {
    // Load the home page in the browser and verify that the Tags menu is there
    await page.goto(basePath, { waitUntil: 'networkidle2' });
    const tagsDropdownText = await page.$eval('a.tagsDropdownLink', (element) => element.textContent);
    assert(tagsDropdownText === 'Tags');
  });

  it('has links that all lead to working pages', async () => {
    // Click the Tags dropdown
    await page.click('a.tagsDropdownLink');
    // Scrape the links in the dropdown
    const tagPaths = await page.evaluate(() => 
      Array.from(document.querySelectorAll('div.tagsDropdown div.dd-menu-items li > a'),
      (element) => element.href));
      // Verify that each link works, loading one page at a time
    for (var i = 0; i < tagPaths.length; i++) {
      await page.goto(tagPaths[i], { waitUntil: 'networkidle2' });
      assert(await verifyThatPageRenderedCorrectly(page), `Page ${tagPaths[i]} did not load correctly.`);
    };
  });

})

describe(`Testing search`, async function () {
  this.timeout(10000);

  it('loads in the browser', async () => {
    // Load the search page in the browser and take a screenshot
    await page.goto(`${basePath}/search.html`, { waitUntil: 'networkidle2' });
    await page.screenshot({ path: `${screenshotPath}/search.png` });
  });

  searchTestCases.forEach((testCase) => {
    // Use the search test cases to search for a term and verify that a matching page appears in the results
    it(`searching for "${testCase.keyword}" yields ${testCase.result}`, async () => {
      // Clear search field
      await page.$eval('#searchField', (field) => field.value = '');
      // Fill in search field and take screencap
      await page.type('input#searchField', testCase.keyword, { delay: 50 });
      await page.screenshot({ path: `${screenshotPath}/search_${testCase.keyword}.png` });
      // Get array of href values in results
      const searchResults = await page.evaluate(() => Array.from(document.querySelectorAll('ul#resultList >  li > a'),
        (element) => element.href));
      // Verify that at least one of the results contains the page in the test case
      assert(searchResults.some((result) => result.endsWith(testCase.result)));
    });
  });
});

// Generic function to verify that a page rendered correctly
async function verifyThatPageRenderedCorrectly(page) {
  // Test that the home page link exists and has the correct text
  const homePageLinkText = await page.$eval('a#homePageLink', el => el.textContent);
  // Verify that the link to the github repo has the correct path
  const githubLinkHref = await page.$eval('a#githubLink', el => el.href);
  return (
    homePageLinkText === siteTitle &&
    githubLinkHref === githubPath
  );
}

after(async () => {
  await browser.close()
    .catch((err) => {
      console.error(err)
    });
})
