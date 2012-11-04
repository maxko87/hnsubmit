
//listens for messages to open link in a new tab
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.tabs.create({"url":request.link,"selected":false});
  });