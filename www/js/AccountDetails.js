class AccountDetails {

  constructor(){
  }

  updateDisplay() {
    if (!App.user) { return; }
    $('#accountname').text(this.accountName);
    let html = '';
    // loop through the logged in users accounts and create html
    for (let account of App.user.accounts) {

      if (account.name == this.accountName) {
        for (let history of account.history) {
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