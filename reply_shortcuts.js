$(document).ready(function () {

  $(window).keypress(function(e) {

    //if focus not on text box
    if (!$("*:focus").is("textarea")){
      var key = e.which;
      //focus on text box
      if (key == "/".charCodeAt(0)){
        $('textarea').focus();
        e.preventDefault();
      }
    }

  });

});