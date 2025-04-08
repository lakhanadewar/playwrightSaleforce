class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = 'input#user-name';
    this.passwordInput = 'input#password';
    this.loginButton = 'input#login-button';
    this.errorMessage = 'h3[data-test="error"]';
  }

  async navigate(url) {
    await this.page.goto(url);
  }

  async login(username, password) {
    await this.page.type(this.usernameInput, username);
    await this.page.type(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getErrorMessage() {
    try {
      await this.page.waitForSelector(this.errorMessage, { timeout: 3000 });
      return await this.page.$eval(this.errorMessage, el => el.textContent.trim());
    } catch (error) {
      return null;
    }
  }

  async isLoggedIn() {
    try {
      await this.page.waitForSelector('.inventory_list', { timeout: 3000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async clearInputs() {
    await this.page.$eval(this.usernameInput, el => el.value = '');
    await this.page.$eval(this.passwordInput, el => el.value = '');
  }

  async takeScreenshot(fileName) {
    await this.page.screenshot({ path: `./reports/screenshots/${fileName}.png` });
  }
}

module.exports = LoginPage;