class App {

  constructor() {

    // Register classes used with JSON-flex
    JSON._classes(User, Account);

    // Instances that we need to be able to reach anywhere
    App.spaHandler = new SpaHandler();
    App.myAccounts = new MyAccounts();
    App.autogiro = new Autogiro();
    App.simulate = new Simulate();
    App.transfer = new Transfer();
    App.accountDetails = new AccountDetails();
    App.login = new Login();
    App.start = new Start();
    App.transferme = new Transferme();
  

    // Instances that we don't need to reach/communicate with
    new RegisterUser();

  }

}