const fs = require('fs');
const path = require('path');

function setupDirectories() {
  const screenshotsDir = path.join(__dirname, '../reports/screenshots');
  
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
    console.log('Created screenshots directory');
  }
}

// Run setup when this file is executed directly
if (require.main === module) {
  setupDirectories();
}

module.exports = { setupDirectories };