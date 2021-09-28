function getArrayByTagNameObject(obj, name) {
  return new Array(...obj.getElementsByTagName(name));
}

function getArrayByTagName(name) {
  return getArrayByTagNameObject(document, name);
}

function activateRewards() {
  const buttons = getArrayByTagName("button");

  console.log(`found ${buttons.length} buttons`)

  const buttonsToClick = [];

  for (const button of buttons) {
    const spans = getArrayByTagNameObject(button, "span");

    if (spans.length && 'textContent' in spans[0] && spans[0].textContent === "Add to Card") {
      buttonsToClick.push(button);
    }
  }


  for (const i in buttonsToClick) {
    setTimeout(() => {
      buttonsToClick[i].click();
    }, 5000 * i);
  }
}

activateRewards();
