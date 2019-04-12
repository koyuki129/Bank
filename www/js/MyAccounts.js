class MyAccounts {

  constructor(){
    $(document).on('click', '.add-account-btn', e => this.addAccount(e));
    $(document).on('click', '.account-details', this.clickOnDetails);
    $(document).on('hidden.bs.modal', '#addAccountModal', e => this.emptyNewAccountNameField(e));
    $(document).on('click', '.remove-account', this.removeAccount.bind(this));
    $(document).on('click', '.change-account-btn', this.changeAccountName.bind(this)); 
    $(document).on('click', '.changers', this.changeAccountClick.bind(this)); 
  }

  clickOnDetails(){
    App.accountDetails.accountName = $(this).text();
  }

  updateDisplay() {
    if (!App.user) { return; }
    let html = '';
    // loop through the logged in users accounts and create html
    for (let account of App.user.accounts) {
      html += `<tr>
        
          <th scope="row"><a class="account-details" href="#account-details">${account.name}</a></th>
          <td>${account.accountNumber}</td>
          <td class="text-right">${this.toSwedishFormat(account.balance)}</td>
          <td><button class="btn btn-primary remove-account">Ta bort</button></td>
          <td><button type="button" class="changers btn btn-primary" data-toggle="modal" data-target="#changeNameModal">
            Ändra Kontonamn
          </button></td>
      </tr>`;
    }
    // put the html in the DOM
    $('.accounts tbody').html(html);
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

  removeAccount(event){
    let theClickedRemoveButton = $(event.target);
    let accountDiv = theClickedRemoveButton.parent().parent();
    let accountIndex = accountDiv.index();
 
    App.user.accounts.splice(accountIndex, 1);
    this.updateDisplay();
    App.user.save();
  }

  changeAccountName(){
    App.user.accounts[this.accChangeIndex].name = $("#changeName").val();
    this.updateDisplay();
    App.user.save();
  }

  changeAccountClick(event){
    let theClickedRemoveButton = $(event.target);
    let accountDiv = theClickedRemoveButton.parent().parent();
    let accountIndex = accountDiv.index();
    this.accChangeIndex = accountIndex;
    $("#changeName").val('');
  }
  emptyNewAccountNameField(){
    // empty the field when the modal closes
    $('#newAccountName').val('');
  }

}

