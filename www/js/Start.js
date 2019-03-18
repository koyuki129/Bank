class Start {

    constructor() {
    }

    showLastTransactions() {
        if (!App.user) { return; }

        let numberOfTransactions = 5;
        let html = '';

        // loop through the logged in users accounts and create html
        for (let account of App.user.accounts) {
            
            if (numberOfTransactions > account.history.length) {
               numberOfTransactions = account.history.length;
             }
             for (let i = 0; i < numberOfTransactions ; i++) {
               let history = account.history[i];
               html += `<tr>
                   <th scope="row">${history.label}</th>
                   <td>${history.amount}</td>
                   <td class="text-right">${history.time}</td>
               </tr>`;
             }
         }

        // create an empty array
       
        // put the html in the DOM
        $('.start-history tbody').html(html);
      }
}