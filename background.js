async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

function getArrayByTagNameObject(obj, name) {
  return new Array(...obj.getElementsByTagName(name));
}

function getArrayByTagName(name) {
  return getArrayByTagNameObject(document, name);
}

function determineOwnerFromUrl(url) {
  if (url.includes("americanexpress")) {
    return "amex";
  }
  if (url.includes("chase")) {
    return "chase";
  }
  if (url.includes("capitalone")) {
    return "capitalone";
  }
  return null;
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.directive) {
      case "run":
        getCurrentTab().then(tab => {
          const owner = determineOwnerFromUrl(tab.url);
          if (owner) {
            chrome.scripting.executeScript({
              target: {tabId: tab.id},
              files: [`handlers/${owner}.js`]
            });
          }
        });

        sendResponse({}); // sending back empty response to sender
        break;
      default:
        // helps debug when request directive doesn't match
        alert("Unmatched request of '" + request + "' from script to background.js from " + sender);
    }
  }
);