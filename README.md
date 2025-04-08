# Sauce Demo Test Automation

This project contains automated tests for the Sauce Demo website (https://www.saucedemo.com/) using Puppeteer and Jest.

## Project Structure

```
saucedemo-testing/
│
├── config/              # Configuration files
│   └── testData.js      # Test data and user credentials
│
├── pages/               # Page Object Models
│   └── LoginPage.js     # Login page interactions
│
├── tests/               # Test files
│   └── login.test.js    # Login functionality tests
│
├── utils/               # Utility helper functions
│   ├── setupDirectories.js  # Directory setup utility
│   └── testHelper.js    # Browser and page setup helpers
│
├── reports/             # Test reports
│   └── screenshots/     # Screenshots captured during tests
│
├── jest.config.js       # Jest configuration
└── package.json         # Project dependencies
```

## Test Cases for Login Functionality

1. TC001: Successful login with standard_user
2. TC002: Failed login with locked_out_user
3. TC003: Login with problem_user (may have UI issues)
4. TC004: Login with performance_glitch_user (may experience delays)
5. TC005: Login with error_user
6. TC006: Login with visual_user
7. TC007: Login with invalid username
8. TC008: Login with invalid password
9. TC009: Login with empty username
10. TC010: Login with empty password
11. TC011: Login with empty username and password
12. TC012: Case sensitivity check for username
13. TC013: Case sensitivity check for password
14. TC014: Special characters in credentials handling
15. TC015: XSS attempt in login form
16. TC016: Login button functionality
17. TC017: Multiple login attempts behavior
18. TC018: Login page UI elements verification

## Available Users

| Username | Password | Description |
|----------|----------|-------------|
| standard_user | secret_sauce | Standard user with all features |
| locked_out_user | secret_sauce | User that has been locked out |
| problem_user | secret_sauce | User with UI issues while using the app |
| performance_glitch_user | secret_sauce | User that experiences performance issues |
| error_user | secret_sauce | User that encounters errors |
| visual_user | secret_sauce | User that experiences visual glitches |

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the tests:
   ```
   npm test
   ```
4. View the test report in the `reports` directory

## Environment Setup

- Node.js 14 or higher
- NPM or Yarn

## Notes

- Screenshots are automatically taken for error scenarios and some test cases
- Reports are generated in HTML format in the reports directory
- Tests run with visible browser by default (headless mode can be enabled in testHelper.js)
