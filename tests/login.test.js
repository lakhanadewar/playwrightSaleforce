const LoginPage = require('../pages/LoginPage');
const { setupBrowser, createPage, closeBrowser, ensureDirectoryExists } = require('../utils/testHelper');
const testData = require('../config/testData');

describe('Sauce Demo Login Tests', () => {
  let browser;
  let page;
  let loginPage;

  beforeAll(async () => {
    // Ensure screenshots directory exists
    ensureDirectoryExists('./reports/screenshots');
    browser = await setupBrowser();
  });

  beforeEach(async () => {
    page = await createPage(browser);
    loginPage = new LoginPage(page);
    await loginPage.navigate(testData.baseUrl);
  });

  afterEach(async () => {
    await page.close();
  });

  afterAll(async () => {
    await closeBrowser(browser);
  });

  // Test Case 1: Successful login with standard user
  test('TC001: Should login successfully with standard_user', async () => {
    const user = testData.users.standard;
    await loginPage.login(user.username, user.password);
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBe(true);
  });

  // Test Case 2: Failed login with locked_out_user
  test('TC002: Should show error message with locked_out_user', async () => {
    const user = testData.users.lockedOut;
    await loginPage.login(user.username, user.password);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Sorry, this user has been locked out');
    await loginPage.takeScreenshot('locked_out_error');
  });

  // Test Case 3: Login with problem_user
  test('TC003: Should login with problem_user but may have UI issues', async () => {
    const user = testData.users.problem;
    await loginPage.login(user.username, user.password);
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBe(true);
    await loginPage.takeScreenshot('problem_user_dashboard');
  });

  // Test Case 4: Login with performance_glitch_user
  test('TC004: Should login with performance_glitch_user but may experience delays', async () => {
    const user = testData.users.performanceGlitch;
    const startTime = Date.now();
    await loginPage.login(user.username, user.password);
    const loadTime = Date.now() - startTime;
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBe(true);
    console.log(`Performance glitch user login took ${loadTime}ms`);
    // We can add an assertion for slowness, but it might be environment-dependent
    // For now, just logging the time
  });

  // Test Case 5: Login with error_user
  test('TC005: Should login with error_user', async () => {
    const user = testData.users.error;
    await loginPage.login(user.username, user.password);
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBe(true);
    await loginPage.takeScreenshot('error_user_dashboard');
  });

  // Test Case 6: Login with visual_user
  test('TC006: Should login with visual_user', async () => {
    const user = testData.users.visual;
    await loginPage.login(user.username, user.password);
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBe(true);
    await loginPage.takeScreenshot('visual_user_dashboard');
  });

  // Test Case 7: Login with invalid username
  test('TC007: Should not login with invalid username', async () => {
    const credentials = testData.invalidCredentials.invalidUsername;
    await loginPage.login(credentials.username, credentials.password);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(credentials.errorMessage);
  });

  // Test Case 8: Login with invalid password
  test('TC008: Should not login with invalid password', async () => {
    const credentials = testData.invalidCredentials.invalidPassword;
    await loginPage.login(credentials.username, credentials.password);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(credentials.errorMessage);
  });

  // Test Case 9: Login with empty username
  test('TC009: Should show error for empty username', async () => {
    const credentials = testData.invalidCredentials.emptyUsername;
    await loginPage.login(credentials.username, credentials.password);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(credentials.errorMessage);
  });

  // Test Case 10: Login with empty password
  test('TC010: Should show error for empty password', async () => {
    const credentials = testData.invalidCredentials.emptyPassword;
    await loginPage.login(credentials.username, credentials.password);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(credentials.errorMessage);
  });

  // Test Case 11: Login with empty username and password
  test('TC011: Should show error for empty username and password', async () => {
    const credentials = testData.invalidCredentials.emptyBoth;
    await loginPage.login(credentials.username, credentials.password);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe(credentials.errorMessage);
  });

  // Test Case 12: Case sensitivity check for username
  test('TC012: Username should be case sensitive', async () => {
    // Using uppercase for username to test case sensitivity
    const username = testData.users.standard.username.toUpperCase();
    const password = testData.users.standard.password;
    
    await loginPage.login(username, password);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match');
  });

  // Test Case 13: Case sensitivity check for password
  test('TC013: Password should be case sensitive', async () => {
    const username = testData.users.standard.username;
    // Using uppercase for password to test case sensitivity
    const password = testData.users.standard.password.toUpperCase();
    
    await loginPage.login(username, password);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match');
  });

  // Test Case 14: Special characters in credentials
  test('TC014: Should handle special characters in credentials properly', async () => {
    const username = 'user@#$%^';
    const password = 'pass@#$%^';
    
    await loginPage.login(username, password);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match');
  });

  // Test Case 15: XSS attempt in login form
  test('TC015: Should sanitize inputs against XSS attempts', async () => {
    const xssScript = '<script>alert("XSS")</script>';
    await loginPage.login(xssScript, xssScript);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBeTruthy(); // There should be an error message
  });

  // Test Case 16: Login button functionality
  test('TC016: Login button should be clickable and perform form submission', async () => {
    const user = testData.users.standard;
    await page.type(loginPage.usernameInput, user.username);
    await page.type(loginPage.passwordInput, user.password);
    
    // Check if the button is visible and clickable
    const button = await page.$(loginPage.loginButton);
    expect(button).toBeTruthy();
    
    await button.click();
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBe(true);
  });

  // Test Case 17: Multiple login attempts with incorrect credentials
  test('TC017: System behavior after multiple failed login attempts', async () => {
    const invalidCreds = testData.invalidCredentials.invalidUsername;
    
    // Attempt login 3 times with invalid credentials
    for (let i = 0; i < 3; i++) {
      await loginPage.login(invalidCreds.username, invalidCreds.password);
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).toBe(invalidCreds.errorMessage);
      await loginPage.clearInputs();
    }
    
    // Try with valid credentials after 3 failed attempts
    const validUser = testData.users.standard;
    await loginPage.login(validUser.username, validUser.password);
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBe(true);
  });

  // Test Case 18: Check login page UI elements
  test('TC018: Login page should display all required UI elements', async () => {
    // Check username field
    const usernameField = await page.$(loginPage.usernameInput);
    expect(usernameField).toBeTruthy();
    
    // Check password field
    const passwordField = await page.$(loginPage.passwordInput);
    expect(passwordField).toBeTruthy();
    
    // Check login button
    const loginButton = await page.$(loginPage.loginButton);
    expect(loginButton).toBeTruthy();
    
    // Check page title
    const title = await page.title();
    expect(title).toBe('Swag Labs');
    
    // Take screenshot for visual verification
    await loginPage.takeScreenshot('login_page_ui');
  });
});