class Start {

    updateDisplay() {
        this.showLastTransactions();
        this.updateAccountDisplay();
    }

    async showLastTransactions() {
        let loggedIn = App.user;
        $('.only-if-logged-in')[loggedIn ? 'show' : 'hide']();
        $('.only-if-not-logged-in')[loggedIn ? 'hide' : 'show']();
        if (!loggedIn) { return; }

        let numberOfTransactions = 5;
        let html = '';

        // create an empty array
        let transactionsByTime = new Array();
        // collect all transactions in the new array
        for (let account of App.user.accounts) {
            for (let h of account.history) {
                let newH = Object.assign(h, { accountName: account.name });
                transactionsByTime.push(newH);
            }
        }
        // order the transactions by time attribute
        transactionsByTime.sort(
            // compare function
            (transactionA, transactionB) => (
                transactionA.time > transactionB.time) ? -1 :
                ((transactionA.time < transactionB.time) ? 1 : 0)
        );
        // console.log(transactionsByTime);
        if (transactionsByTime.length < numberOfTransactions) {
            numberOfTransactions = transactionsByTime.length;
        }

        for (let i = 0; i < numberOfTransactions; i++) {
            let history = transactionsByTime[i];
            html += `<tr>
            <th scope="row">${history.accountName}</th>
              <th scope="row">${history.label}</th>
              <td>${history.amount}</td>
              <td class="text-right">${this.formatTime(history.time)}</td>
          </tr>`;
        }

        // put the html in the DOM
        $('.start-history tbody').html(html);
    }

    updateAccountDisplay() {
        if (!App.user) { return; }
        let html = '';
        // loop through the logged in users accounts and create html
        for (let account of App.user.accounts) {
            html += `<tr>
            
              <th scope="row">${account.name}</th>
              <td>${account.accountNumber}</td>
              <td class="text-right">${this.toSwedishFormat(account.balance)}</td>
              
            
          </tr>`;
        }
        // put the html in the DOM
        $('.accounts-start tbody').html(html);



    }


    formatTime(aTime) {
        return new Intl.DateTimeFormat(
            'se-SV', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            }).format(new Date(aTime));
    }

    toSwedishFormat(num) {
        return new Intl.NumberFormat('sv', {
            style: 'currency',
            currency: 'SEK',
        }).format(num);
    }


}