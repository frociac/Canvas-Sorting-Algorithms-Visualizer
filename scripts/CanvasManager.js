class CanvasManager {
  static #canvas = document.getElementById("canvas");
  static #ctx = this.#canvas.getContext("2d");
  static #comparePositions = []; // yellow
  static #swapPositions = []; // blue
  static #correctPositions = []; // green
  static #subArrayPositions = []; // red
  static height = this.#canvas.height;
  static width = this.#canvas.width;

  static setUpCanvas() {
    this.#ctx.fillStyle = "rgb(0,0,0)"
    this.#ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.#comparePositions = [];
    this.#swapPositions = [];
    this.#correctPositions = [];
    this.#subArrayPositions = [];
    ArrayData.clearArray();
  }
  static async draw({forceGreen = false} = {}) {
    this.#ctx.fillStyle = "rgb(0,0,0)";
    this.#ctx.fillRect(0, 0, this.width, this.height);
    const rectWidth = this.width / ArrayData.arraySize;
    for(let i = 0; i < ArrayData.array.length; i++) {
      if (this.#correctPositions.includes(i) || forceGreen) this.#ctx.fillStyle = 'green';
      else if (this.#comparePositions.includes(i)) this.#ctx.fillStyle = 'yellow';
      else if (this.#swapPositions.includes(i)) this.#ctx.fillStyle = 'blue';
      else if (this.#subArrayPositions.includes(i)) this.#ctx.fillStyle = 'red';
      else this.#ctx.fillStyle = 'white';
      this.#ctx.fillRect(i * rectWidth + this.#ctx.lineWidth / 2, this.height - ArrayData.array[i] * Options.normalize_scale, rectWidth, ArrayData.array[i] * Options.normalize_scale);
    }
    await Utils.wait(Options.step_speed);
  }

  /**
   * Adds correct positions.
   * @param {number[]} newPositions - The new correct positions to add.
   * @public
   */
  static addCorrectPositions(newPositions) {
    if (this.#isValidIntArray(newPositions)) {
      this.#correctPositions.push(...newPositions);
    } else {
      console.error('Invalid input for correctPositions. Expecting an array of integers.');
    }
  }
  /**
   * Sets the comparison positions.
   * @param {number[]} newPositions - The new comparison positions to set.
   * @public
   */
  static set comparePositions(newPositions) {
    if (this.#isValidIntArray(newPositions)) {
      this.#comparePositions = newPositions;
    } else {
      console.error('Invalid input for comparePositions. Expecting an array of integers.');
    }
  }

  /**
   * Sets the swapping positions.
   * @param {number[]} newPositions - The new swapping positions to set.
   * @public
   */
  static set swapPositions(newPositions) {
    if (this.#isValidIntArray(newPositions)) {
      this.#swapPositions = newPositions;
    } else {
      console.error('Invalid input for swapPositions. Expecting an array of integers.');
    }
  }

  /**
   * Sets the correct positions.
   * @param {number[]} newPositions - The new correct positions to set.
   * @public
   */
  static set correctPositions(newPositions) {
    if (this.#isValidIntArray(newPositions)) {
      this.#correctPositions = newPositions;
    } else {
      console.error('Invalid input for correctPositions. Expecting an array of integers.');
    }
  }

  /**
   * Sets the subarray positions.
   * @param {number[]} newPositions - The new subarray positions to set.
   * @public
   */
  static set subArrayPositions(newPositions) {
    if (this.#isValidIntArray(newPositions)) {
      this.#subArrayPositions = newPositions;
    } else {
      console.error('Invalid input for subarrayPositions. Expecting an array of integers.');
    }
  }
  
  static #isValidIntArray(input) {
    if (!Array.isArray(input)) {
      return false;
    }
    for (const value of input) {
      if (!Number.isInteger(value)) {
        return false;
      }
    }
  
    return true;
  }
  /**
   * Get the positions of elements being compared.
   * @returns {Array<number>} An array of indices representing the elements being compared.
   */
  static get comparePositions() {
    return this.#comparePositions;
  }

  /**
   * Get the positions of elements being swapped.
   * @returns {Array<number>} An array of indices representing the elements being swapped.
   */
  static get swapPositions() {
    return this.#swapPositions;
  }

  /**
   * Get the positions of elements that are in their correct sorted positions.
   * @returns {Array<number>} An array of indices representing the elements in their correct positions.
   */
  static get correctPositions() {
    return this.#correctPositions;
  }

  /**
   * Get the positions of subarrays during the merge sort process.
   * @returns {Array<number>} An array of indices representing subarray positions.
   */
  static get subArrayPositions() {
    return this.#subArrayPositions;
  }

}