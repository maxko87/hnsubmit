// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

$(document).ready(function () {

  var current = $('td.title:first')
  current.addClass('selected');
  current.removeClass('title');
  current.text("|" + current.text());

  $(window).keypress(function(e) {
    var key = e.which;
    if (key == 106){
      var next = current.parent().next().next().next().children()[0];
      current.addClass('title');
      current.removeClass('selected');
      current.text(current.text().substring(1,current.text().length));
      next.addClass('selected');
      next.removeClass('title');
      next.text("|" + current.text());
      current = next;
    }
    else if (key == 107){
      alert(key);
    }

  });
});

/*
var req = new XMLHttpRequest();
req.open(
    "GET",
    "http://api.flickr.com/services/rest/?" +
        "method=flickr.photos.search&" +
        "api_key=90485e931f687a9b9c2a66bf58a3861a&" +
        "text=wild%20animal&" +
        "safe_search=1&" +  // 1 is "safe"
        "content_type=1&" +  // 1 is "photos only"
        "sort=relevance&" +  // another good one is "interestingness-desc"
        "per_page=20",
    true);
req.onload = showPhotos;
req.send(null);

function showPhotos() {
  var photos = req.responseXML.getElementsByTagName("photo");

  for (var i = 0, photo; photo = photos[i]; i++) {
    var img = document.createElement("image");
    img.src = constructImageURL(photo);
    document.body.appendChild(img);
  }
}

// See: http://www.flickr.com/services/api/misc.urls.html
function constructImageURL(photo) {
  return "http://farm" + photo.getAttribute("farm") +
      ".static.flickr.com/" + photo.getAttribute("server") +
      "/" + photo.getAttribute("id") +
      "_" + photo.getAttribute("secret") +
      "_s.jpg";
}
*/