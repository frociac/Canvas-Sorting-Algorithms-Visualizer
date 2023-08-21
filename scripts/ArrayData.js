/**
 * A class for managing array data and various positions.
 */
class ArrayData {
  static #array = [];
  static #arraySize = 5;
  static #comparePositions = [];
  static #swapPositions = [];
  static #correctPositions = [];

  /**
   * Clears all data fields.
   * @private
   */
  static #unsetAll() {
    this.#array = [];
    this.#comparePositions = [];
    this.#swapPositions = [];
    this.#correctPositions = [];
  }

  /**
   * Clears the array and positions.
   * @public
   */
  static clearAll() {
    this.#unsetAll();
  }

  /**
   * Gets the main array.
   * @returns {number[]} The main array data.
   * @public
   */
  static get array() {
    return this.#array;
  }

  /**
   * Sets the main array data and array size.
   * Attempts to convert string to array (if not valid uses randomly generated array)
   * @param {number[] | string} newArray - The new array data ().
   * @public
   */
  static set array(newArray) {
    if (typeof newArray === 'string') {
      if (this.#verifyArrayInput(newArray)) {
        this.#array = Utils.normalizeArrayToCanvas(newArray.split(" ").map(Number));
        this.#arraySize = this.#array.length;
      } else {
        this.#array = Utils.normalizeArrayToCanvas(Utils.generateRandomArray(Options.user_array_size));
        this.#arraySize = Options.user_array_size;
      }
    } else {
      this.#array = newArray;
      this.#arraySize = newArray.length;
    }
  }

  /**
   * Verifies if the input string contains only numbers separated by spaces.
   * @param {string} arrayString - The input string representing an array.
   * @returns {boolean} True if the input is valid, false otherwise.
   * @private
   */
  static #verifyArrayInput(arrayString) {
    return /^(\d+\s*)+$/.test(arrayString);
  }  

  /**
   * Gets the array size.
   * @returns {number} The array size.
   * @public
   */
  static get arraySize() {
    return this.#arraySize;
  }

  /**
   * Gets the comparison positions.
   * @returns {number[]} The comparison positions.
   * @public
   */
  static get comparePositions() {
    return this.#comparePositions;
  }
  /**
   * Gets the swap positions.
   * @returns {number[]} The swap positions.
   * @public
   */
  static get swapPositions() {
    return this.#swapPositions;
  }
  /**
   * Gets the correct positions.
   * @returns {number[]} The correct positions.
   * @public
   */
  static get correctPositions() {
    return this.#correctPositions;
  }

  /**
   * Adds comparison positions.
   * @param {number[]} newPositions - The new comparison positions to add.
   * @public
   */
  static addComparePositions(newPositions) {
    if (this.#isValidIntArray(newPositions)) {
      this.#comparePositions.push(...newPositions);
    } else {
      console.error('Invalid input for comparePositions. Expecting an array of integers.');
    }
  }

  /**
   * Adds swapping positions.
   * @param {number[]} newPositions - The new swapping positions to add.
   * @public
   */
  static addSwapPositions(newPositions) {
    if (this.#isValidIntArray(newPositions)) {
      this.#swapPositions.push(...newPositions);
    } else {
      console.error('Invalid input for swapPositions. Expecting an array of integers.');
    }
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
}
