class Transfer {

  constructor() {
    this.form = '.transfer-form';
    $(document).on('submit', this.form, e => this.onsubmit(e));
  }
  updateDisplay() {
    if (!App.user) { return; }
    let html = '';
    // loop through the logged in users accounts and create html
    for (let account of App.user.accounts) {
      html += `<option value="${account.accountNumber}">${account.name} - ${account.accountNumber}</option>`;
    }
    // put the html in the DOM
    $(this.form).find('#fromAccountNumber').html(html);
    //   $(this.form).find('#toAccountNumber').html(html);
    $.datepicker.setDefaults($.datepicker.regional["sv"]);
$('#datepicker').datepicker();  
  }


  onsubmit(e) {
    // Don't send the form
    e.preventDefault();
    // Collect the form data
    this.collectFormdata();
    let f = this.formdata;
    // convert the sum to a number - if not possible set it to 0
    f.sum = isNaN(f.sum / 1) ? 0 : f.sum / 1;
    // Get the correct account
    let accountFrom = App.user.accounts.filter(account => account.accountNumber === f.fromAccountNumber)[0];
    this.checkForNegativeNumber();
    this.checkForAmount();

    this. checkTransferLimit();

    this.displayErrors();
      if (Object.keys(this.formdata.errors).length === 0) {
        // Deposit or withdraw
        accountFrom.withdraw(f.label, f.sum,  new Date($("#datepicker").val()));
        //   accountTo.deposit(f.label, f.sum);
        // account
        // Save the user data
        App.user.save();
        // Goto the my-accounts page
        location.hash = "#my-accounts";
      }
    }

    collectFormdata() {
      let formdata = { errors: {} };
      $(this.form).find('input, select').each(function () {
        formdata[this.id] = $(this).val();
      });
      this.formdata = formdata;
    }
    checkForNegativeNumber() {
      let f = this.formdata;
      if (f.sum < 0) {
        f.errors.sum = 'Du får inte skriva ett negativt nummer';
      }
    }
    checkForAmount() {
      let f = this.formdata;
      let accountFrom = App.user.accounts.filter(account => account.accountNumber === f.fromAccountNumber)[0];
      if (f.sum > accountFrom.balance) {
        f.errors.sum = 'Du har inte tillräckligt med pengar';
      }
    }

    checkTransferLimit() {
      let f = this.formdata;
      let accountFrom = App.user.accounts.filter(account => 
        account.accountNumber === f.fromAccountNumber)[0];
  
      var oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
      let allTransactions = accountFrom.history
      .filter(history => history.amount < 0)
      .filter(datefilter => new Date(datefilter.time) >= oneWeekAgo); 
   
      let last7DaysSum = (this.BalanceSum(allTransactions, 'amount') * -1);
      let currentTransactionLimit = 30000 - last7DaysSum;
      if(f.sum > currentTransactionLimit){
        f.errors.sum = 'Du kan inte överföra över 30000 under de senaste 7 dagarna';
      } 
  
    
      /*if (last7DaysSumWithCurrent > 30000) {
        f.errors.sum = 'Du kan inte överföra över 30000 under de senaste 7 dagarna';
      }*/
    }
  
    BalanceSum (items, prop){
      return items.reduce( function(a, b){
          return a + b[prop];
      }, 0);
    }

    displayErrors() {
      let e = this.formdata.errors;
      $(this.form + ' .error').empty();
      for (let key in e) {
        $(this.form + ' #' + key).siblings('.error').text(e[key]);
      }
    }
  }









