function clickHandler(e) {
  chrome.runtime.sendMessage({directive: "run"}, function(response) {
    this.close(); // close the popup when the background finishes processing request
  });
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('activateRewards').addEventListener('click', clickHandler);
})