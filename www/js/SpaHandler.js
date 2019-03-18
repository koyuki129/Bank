class SpaHandler {

  constructor() {
    // on initial page load
    this.onchange();
    // for every change "soft page load"
    window.onhashchange =  e => this.onchange(e);
  }

  async onchange() {
    // the hash with the #-sign removed
    let hash = window.location.hash.slice(1);
    // if the hash is empty then set it to "start"
    // if it leads to a page the user is not allowed to see do the same
    if (hash === '' || !this.allowed(hash)) { hash = 'start'; }
    // set active on the nav link corresponding to the hash
    $('.nav-link').removeClass('active');
    $('.nav-link[href="#' + hash + '"]').addClass('active');
    // calculate file name from hash
    let file = '/pages/' + hash + '.html';
    // load content from the file
    let content = await $.get(file);
    // put the content inside the article element
    $('article').html(content);
    // run updates...
    this.runUpdates(hash);
  }


  allowed(hash) {
    // check if the user is allowed to see the page
    // we do this by assuming you are not allowed to see
    // - pages that have links with the parent css-class 
    //   only-if-not-logged-in, if you are logged in
    // - pages that have links with the parent css-class 
    //   only-if-logged-in, if you are not logged in
    let notAllowed = App.user ?
      $('.only-if-not-logged-in > [href="#' + hash + '"]').length > 0 :
      $('.only-if-logged-in > [href="#' + hash + '"]').length > 0;
    return !notAllowed;
  }

  runUpdates(hash){
    // update things depending on what "page"/hash
    // the user navigates to
    if(hash === 'my-accounts'){
      App.myAccounts.updateDisplay();
    }
    if(hash === 'simulate'){
      App.simulate.updateDisplay();
    }
    if(hash === 'account-details'){
      App.accountDetails.updateDisplay();
    }
    if(hash === 'transfer'){
      App.transfer.updateDisplay();
    }
    if(hash === 'transfermyaccount'){
      App.transferme.updateDisplay();
    }
  
    if(hash === 'autogiro'){
      App.autogiro.updateDisplay();
  }
}}
