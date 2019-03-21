class RegisterUser {

  constructor(form = '.register-form') {
    this.form = form;
    // add the submit handler
    $(document).on('submit', this.form, e => this.onsubmit(e));
  }

  async onsubmit(e) {
    // Don't send the form
    e.preventDefault();
    // Collect the form data
    this.collectFormdata();
    // Calculate file names
    this.calculateFileNames();
    // Errorchecking
    await this.checkForErrors();
    // If no errors save the user
    if (Object.keys(this.formdata.errors).length === 0) {
      await this.createUser();
    }
  }

  collectFormdata() {
    let formdata = { errors: {} };
    $(this.form).find('input').each(function () {
      formdata[this.id] = $(this).val();
    });
    this.formdata = formdata;
  }

  calculateFileNames() {
    let f = this.formdata;
    let encoded = encodeURIComponent(f.username).replace(/%/g, 'x');
    let encodedPass = encodeURIComponent(f.password).replace(/%/g, 'x');
    this.file1 = 'usernames/' + encoded;
    this.file2 = 'users/' + encoded + '-' + encodedPass;
  }

  async checkForErrors() {
    let f = this.formdata;
    if (f.username.length < 4) {
      f.errors.username = 'Användarnamnet måste vara minst 4 tecken långt.';
    }
    if (f.password.length < 6) {
      f.errors.password = 'Lösenordet måste vara minst 6 tecken långt.';
    }
    if (f.passwordRepeated !== f.password) {
      f.errors.passwordRepeated = 'Du upprepade inte lösenordet korrekt.';
    }
    await this.checkIfUsernameIsTaken();
    this.displayErrors();
  }

  async fileExists(file) {
    let exists = true;
    try { await JSON._load(file); }
    catch (e) { exists = false; }
    return exists;
  }

  async checkIfUsernameIsTaken() {
    let taken = await this.fileExists(this.file1);
    if (taken) {
      this.formdata.errors.username = 'Användarnamnet är upptaget.';
    }
  }

  displayErrors() {
    let e = this.formdata.errors;
    $(this.form + ' .error').empty();
    for (let key in e) {
      $(this.form + ' #' + key).siblings('.error').text(e[key]);
    }
  }

  async createUser() {
    let f = this.formdata;
    // File 1 is just used to check if the username exists
    await JSON._save(this.file1, 1);
    // Create the user and save it
    let user = new User(f.username, this.file2);
    await user.save();
    // empty form fields
    $(this.form + ' input').val('');
    // login (this also changes the page to my account)
    App.login.file2 = this.file2;
    App.login.login();
  }

} 