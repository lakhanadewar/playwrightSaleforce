# Salesforce Automation Testing Framework

This project is an automated testing framework for Salesforce, built using Playwright and JavaScript. It provides a robust structure for creating and maintaining end-to-end tests for Salesforce applications.

## Project Structure

```
salesforce-automation/
├── config/               # Configuration files
│   └── testData.js      # Test data and environment configurations
├── pages/               # Page Object Models
├── tests/               # Test files
├── utils/               # Utility functions and helpers
├── reports/             # Test execution reports
└── node_modules/        # Dependencies
```

## Features

- Page Object Model design pattern
- Configuration management for multiple environments
- Salesforce-specific selectors and utilities
- Automated login and navigation
- Screenshot capture on test failure
- HTML report generation
- Cross-browser testing support

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- A Salesforce organization account
- Appropriate permissions in Salesforce

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd salesforce-automation
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add your Salesforce credentials:
```
SALESFORCE_USERNAME=your-username
SALESFORCE_PASSWORD=your-password
SALESFORCE_URL=your-salesforce-url
```

## Running Tests

Run all tests:
```bash
npm test
```

Run specific test file:
```bash
npm test -- tests/login.test.js
```

Run tests in headed mode:
```bash
npm run test:headed
```

## Test Reports

Test reports are generated in the `reports` directory after each test run. Open `reports/index.html` in a browser to view the detailed test results.

## Writing Tests

Example test structure:
```javascript
const { test } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

test('should login to Salesforce successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(process.env.SALESFORCE_USERNAME, process.env.SALESFORCE_PASSWORD);
  // Add assertions here
});
```

## Best Practices

1. Use Page Object Model for better maintainability
2. Keep selectors in separate configuration files
3. Use meaningful test descriptions
4. Add appropriate assertions
5. Handle dynamic elements properly
6. Use environment variables for sensitive data

## Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## Troubleshooting

Common issues and solutions:
- **Login Failures**: Verify credentials and URL in environment variables
- **Element Not Found**: Check selectors and timing issues
- **Test Timeouts**: Adjust timeout settings in configuration

## License

This project is licensed under the MIT License - see the LICENSE file for details.
