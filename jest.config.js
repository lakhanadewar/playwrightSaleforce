module.exports = {
  testMatch: ["**/tests/**/*.test.js"],
  testTimeout: 30000,
  reporters: [
    "default",
    [
      "./node_modules/jest-html-reporter",
      {
        pageTitle: "Sauce Demo Test Report",
        outputPath: "./reports/test-report.html",
      },
    ],
  ],
};