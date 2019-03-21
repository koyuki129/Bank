class Login extends RegisterUser {

  constructor() {
    super('.login-form');
    $(document).on('click', '[href="#logout"]', e => this.logout(e));
    this.loginFromSessionStorage();
  }

  async onsubmit(e) {
    // Don't send the form
    e.preventDefault();
    // Remove error message
    $(this.form + ' .error').addClass('d-none');
    // Collect the form data
    this.collectFormdata();
    // Calculate file names
    this.calculateFileNames();
    await this.login();
  }

  async login() {
    if (await this.fileExists(this.file2)) {
      // Remove error message
      $(this.form + ' .error').addClass('d-none');
      // Save user
      App.user = (await JSON._load(this.file2)).data;
      // Empty form fields
      $(this.form + ' input').val('');
      // Show and hide elements
      $('.only-if-logged-in').show();
      $('.only-if-not-logged-in').hide();
      $('.username').text(App.user.username);
      // Goto the my accounts page
      if (location.hash == '#login') {
        location.hash = '#start';
      }
      // Save the user file name in session storage as well
      // (so we can keep being login after hard page reloads)
      window.sessionStorage.userfile = this.file2;
      // Run the spaHandler onchange method to make sure
      // pages that are only allowed for logged in users
      // are shown after a hard page reload...
      App.spaHandler.onchange();
    }
    else {
      // Show not-logged-in elements
      $('.only-if-not-logged-in').show();
      // Empty password field
      $('#password').val('');
      // Show error message
      $(this.form + ' .error').removeClass('d-none');
    }
  }

  loginFromSessionStorage() {
    // try to login using stored user file
    this.file2 = window.sessionStorage.userfile;
    this.login();
  }

  logout() {
    // Show and hide elements
    $('.only-if-logged-in').hide();
    $('.only-if-not-logged-in').show();
    $('.username').empty();
    // Do the actual logout after a short wait (1 milliseconds)
    // since the spaHandler will refuse to show the logout page
    // if we are logged out ;)
    setTimeout(function () {
      delete App.user;
      delete window.sessionStorage.userfile;
    }, 1);

  }

}
