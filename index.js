document.addEventListener("DOMContentLoaded", () => {
  // starts canvas in utils.js and stores context
  setUpCanvas();

  /** slider handler */
  const slider = document.getElementById("size");
  const valueDisplay = document.getElementById("value-display");

  // update the value display when the slider value changes
  slider.addEventListener("input", () => {
    valueDisplay.textContent = slider.value;
    setSize(slider.value);
  });
  /** end of slider handler */

  /** sorting buttons handler */
  const buttonContainer = document.getElementById("left");
  const startButton = document.getElementById("start");
  const stopButton = document.getElementById("stop");
  // adds an event listener to the div containing buttons
  buttonContainer.addEventListener("click", (event) => {
    // ensures the button was pressed and not the div
    let target = event.target;
    if (target.classList.contains("choice-button")) {
      startButton.classList.remove("disabled");
      if (target.id == "random") {
        target = buttonContainer.children[Math.floor(Math.random() * (buttonContainer.children.length -1))];
        console.log(target);
      }
      sortSelect(target.id);
      target.classList.add("clicked");
      // removes clicked class from previously clicked button (makes all other buttons turn red)
      for (let i = 0; i < buttonContainer.children.length; i++) {
        let childButton = buttonContainer.children[i];
        if (childButton.id != target.id) {
          childButton.classList.remove("clicked");
        }
      }
    }
  });
  /** end of sorting buttons handler */

  /** input handler */
  const elementsInput = document.getElementById("elements");
  const speedInput = document.getElementById("speed");
  startButton.addEventListener("click", (event) => {
    verifyArrayInput(elementsInput.value)
    setSpeed(speedInput.value);
    startButton.classList.add("disabled");
    stopButton.classList.remove("disabled");
    for (let i = 0; i < buttonContainer.children.length; i++) {
      let childButton = buttonContainer.children[i];
      childButton.classList.add("disabled");
    }
    startSort();
  })
  stopButton.addEventListener("click", (event) => {
    setUpCanvas();
    startButton.classList.remove("disabled");
    stopButton.classList.add("disabled");
    for (let i = 0; i < buttonContainer.children.length; i++) {
      let childButton = buttonContainer.children[i];
      childButton.classList.remove("disabled");
    }
  })
  /** end of input handler */
});
