const puppeteer = require('puppeteer');

async function setupBrowser(options = {}) {
  const defaultOptions = {
    headless: false,
    defaultViewport: { width: 1366, height: 768 },
    slowMo: 50,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  };

  const mergedOptions = { ...defaultOptions, ...options };
  return await puppeteer.launch(mergedOptions);
}

async function createPage(browser) {
  const page = await browser.newPage();
  
  // Add custom console logging
  page.on('console', message => {
    if (message.type() === 'error') {
      console.error(`Browser Console Error: ${message.text()}`);
    }
  });

  // Add request/response error logging
  page.on('requestfailed', request => {
    console.error(`Request failed: ${request.url()}`);
  });

  return page;
}

async function closeBrowser(browser) {
  await browser.close();
}

// Create directory for screenshots if it doesn't exist
const fs = require('fs');
const path = require('path');

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

module.exports = {
  setupBrowser,
  createPage,
  closeBrowser,
  ensureDirectoryExists
};