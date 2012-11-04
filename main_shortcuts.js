$(document).ready(function () {

  $('.title').each(function(i, node) {
    if ($(this).text().length == 2){
      $(this).text("0" + $(this).text());
    }
  });

  //initialization
  var first = $('td.title:first');
  var last = $('td.title:last').parent().prev().prev().prev().prev().children('.title:first');

  var current = first;
  current.addClass('selected');
  current.removeClass('title');
  current.text("|" + current.text());

  var keys = new Array();

  $(window).keypress(function(e) {
    var key = e.which;

    // array already exists, number was pressed
    if(key >= "0".charCodeAt(0) && key <= "9".charCodeAt(0)) {
      keys.push(key - "0".charCodeAt(0));
      //if we have two numbers exactly, goto that item
      if (keys.length == 2){
        var goto_el = String(keys[0]) + String(keys[1]) + '.';
        var next = $('td.title:contains("' + goto_el + '"):first');
        console.log(next);
        if(next.length != 0){
          move_selector(current, next);
          current = next;
          scroll(current);
        }
        keys = new Array();
      }
    }
    else {
      keys = new Array();
      /*
      //goto
      if (key == "g".charCodeAt(0)){
        //create array for tracking goto: numbers
        
      }*/

      //move down
      if (key == "j".charCodeAt(0)){
        if (current.text() != last.text()){
          var next = current.parent().next().next().next().children('td.title:first');
          move_selector(current, next);
          current = next;
          scroll(current);
        }
      }

      //move up
      else if (key == "k".charCodeAt(0) ){
        if (current.text() != first.text()){
          var prev = current.parent().prev().prev().prev().children('.title:first');
          move_selector(current, prev);
          current = prev;
          scroll(current);
        }
      }

      //open link in same window
      else if (key == "n".charCodeAt(0)  ){
        var link = current.next().next().children('a').attr('href');
        open_link(link);
      }

      //open link in new tab
      else if (key == "N".charCodeAt(0) ){
        var link = current.next().next().children('a').attr('href');
        open_link_new_tab(link);
      }

      //open comments in same window
      else if (key == "c".charCodeAt(0)  ){
        var link = current.parent().next().children('td.subtext').children('a:last').attr('href');
        open_link(link);
      }

      //open comments in new tab
      else if (key == "C".charCodeAt(0) ){
        var link = current.parent().next().children('td.subtext').children('a:last').attr('href');
        open_link_new_tab("http://news.ycombinator.com/" + link);
      }

      //upvote
      else if (key == "v".charCodeAt(0) ){
        current.next().children('center').children('a:first').click();
      }
    }

  });

  //accounts for scrolling both up and down
  function scroll(current){

    //scroll down if element goes below window
    var drop = current.height() + current.next().height() + current.next().next().height();   
    if (current.offset().top + drop > $(window).scrollTop() + window.innerHeight){       
      $('body').animate({
        scrollTop: current.offset().top - window.innerHeight + drop
      }, 0);
    }

    //scroll up if element goes above window
    else if (current.offset().top < $(window).scrollTop()){
      //var drop = current.height() + current.next().height() + current.next().next().height();          
      $('body').animate({
        scrollTop: current.offset().top
      }, 0);
    }

  }

  //moves cursor up or down
  function move_selector(current, node) {
    current.addClass('title');
    current.removeClass('selected');
    current.text(current.text().substring(1,current.text().length));

    node.addClass('selected');
    node.removeClass('title');
    node.text("|" + node.text().substring(0,node.text().length));
  }

  //opens the link currently selected in same window
  function open_link(link) {
    window.location.href = link;
  }

  //opens the link currently selected in new tab
  function open_link_new_tab(link) {
    chrome.extension.sendMessage({link: link});
  }

  function isScrolledIntoView(elem)
  {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }

});