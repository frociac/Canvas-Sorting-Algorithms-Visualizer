class CanvasManager {
  static #stepSpeed = 250; // ms
  static #canvas = document.getElementById("canvas");
  static #ctx = this.#canvas.getContext("2d");
  static height = this.#canvas.height;
  static width = this.#canvas.width;

  /**
   * @param {number | string} speed
   */
  static set stepSpeed(speed) {
    if (speed) this.#stepSpeed = parseFloat(speed);
  }
  static setUpCanvas() {
    this.#ctx.fillStyle = "rgb(0,0,0)"
    this.#ctx.fillRect(0, 0, canvas.width, canvas.height);
    ArrayData.clearAll();
  }
  static async draw() {
    this.#ctx.fillStyle = "rgb(0,0,0)";
    this.#ctx.fillRect(0, 0, this.width, this.height);
    const rectWidth = this.width / ArrayData.arraySize;
    for(let i = 0; i < ArrayData.array.length; i++) {
      if (ArrayData.comparePositions.includes(i)) this.#ctx.fillStyle = 'yellow';
      else if (ArrayData.correctPositions.includes(i)) this.#ctx.fillStyle = 'green';
      else if (ArrayData.swapPositions.includes(i)) this.#ctx.fillStyle = 'blue';
      else this.#ctx.fillStyle = 'white';
      this.#ctx.fillRect(i * rectWidth + this.#ctx.lineWidth / 2, this.height - ArrayData.array[i], rectWidth, ArrayData.array[i]);
    }
    await Utils.wait(this.#stepSpeed);
  }
}