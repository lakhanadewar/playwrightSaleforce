module.exports = {
  baseUrl: 'https://orgfarm-9798e33592-dev-ed.develop.my.salesforce.com/',
  users: {
    standard: {
      username: 'lakhanadewar254@agentforce.com',
      password: 'Sales@2025',
      description: 'Standard Salesforce user'
    }
  },
  selectors: {
    loginPage: {
      usernameInput: 'input[name="username"]',
      passwordInput: 'input[name="pw"]',
      loginButton: 'input[name="Login"]',
      rememberMeCheckbox: 'input[name="rememberUn"]',
      forgotPasswordLink: 'a[href*="forgotpassword"]',
      errorMessage: '#error'
    },
    navigation: {
      appLauncher: 'div.slds-icon-waffle',
      searchApps: 'input.slds-input'
    }
  },
  timeouts: {
    default: 10000,
    pageLoad: 30000
  }
};