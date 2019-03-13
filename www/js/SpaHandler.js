class SpaHandler {
 
    constructor(){
      // on initial page load
      this.onchange();
      // for every change "soft page load"
      window.onhashchange = this.onchange;
    }
   
    async onchange(){
      // the hash with the #-sign removed
      let hash = window.location.hash.slice(1);
      // if the hash is empty then set it to "start";
      if(hash === ''){ hash = 'start'; }
      // calculate file name from hash
      let file = '/pages/' + hash + '.html';
      // load content from the file
      let content = await $.get(file);
      // put the content inside the main element
      $('main').html(content);
    }
   
  }
  