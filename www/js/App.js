class App {

  constructor() {

    // Register classes used with JSON-flex
    JSON._classes(User, Account);

    // Instances that we need to be able to reach anywhere
    App.spaHandler = new SpaHandler();
    App.myAccounts = new MyAccounts();
    App.simulate = new Simulate();
    App.login = new Login();

    // Instances that we don't need to reach/communicate with
    new RegisterUser();

  }

}