class AccountDetails {

  constructor(){
    $(document).on('click', '#show-button', e => this.showMore(e));
    this.numberOfTransactions = 10;
  }
  
  showMore() {
    if (!App.user) { return; }
    this.numberOfTransactions+=10;
    
    let html = '';
    // loop through the logged in users accounts and create html
    for (let account of App.user.accounts) {

      if (account.name == this.accountName) {
        
        if (this.numberOfTransactions > account.history.length) {
          this.numberOfTransactions = account.history.length;
        }

        for (let i = 0; i < this.numberOfTransactions ; i++) {
          let history = account.history[i];
          html += `<tr>
              <th scope="row">${history.label}</th>
              <td>${history.amount}</td>
              <td class="text-right">${history.time}</td>
          </tr>`;
        }
      }
      

    }
    // put the html in the DOM
    $('.history tbody').html(html);
  }


  updateDisplay() {
    /*if (!App.user) { return; }
    $('#accountname').text(this.accountName);
    this.numberOfTransactions = 10;
    let html = '';
    // loop through the logged in users accounts and create html
    for (let account of App.user.accounts) {

      if (account.name == this.accountName) {
        for (let i = 0; i < 10; i++) {
          let history = account.history[i];
          html += `<tr>
              <th scope="row">${history.label}</th>
              <td>${history.amount}</td>
              <td class="text-right">${history.time}</td>
          </tr>`;
        }
      }

    }
    // put the html in the DOM
    $('.history tbody').html(html);*/
  }
  
  toSwedishFormat(num){
    return new Intl.NumberFormat('sv', {
      style: 'currency',
      currency: 'SEK',
    }).format(num);
  }

  addAccount(){
    if (!App.user) { return; }
    // Add the account
    let name = $('#newAccountName').val();
    App.user.addAccount(name);
    // Save the user data
    App.user.save();
    // Update the display
    this.updateDisplay();
  }

  emptyNewAccountNameField(){
    // empty the field when the modal closes
    $('#newAccountName').val('');
  }

}



