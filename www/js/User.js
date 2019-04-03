class User {

  constructor(username, myFile) {
    this.username = username;
    this.myFile = myFile;
    this.accounts = [];
    // add one account initially
    this.addAccount('Lönekonto');
    
  }

  addAccount(name) {
    let newAccount = new Account(name);
    this.accounts.push(newAccount);
    return newAccount;
  }

  async save(){
    // Wrapping the user in {data: user}
    // because of a bug in JSON._save
    // (it can't recreate instances from top level objects)
    await JSON._save(this.myFile, {data: this});
  }

}