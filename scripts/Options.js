/**
 * A class for managing application options and state.
 */
class Options {
  static selectedAlgorithm = "";
  static random_click_count = 0;
  static #user_array_size = 5;
  static has_started = false;
  static is_randomly_generated = false;
  static is_paused = false;

  /**
   * Sets the user-defined array size.
   * @param {number|string} size - The new array size.
   */
  static set user_array_size(size) {
    if (size) this.#user_array_size = parseInt(size);
  }

  /**
   * Gets the user-defined array size.
   */
  static get user_array_size() {
    return this.#user_array_size;
  }
}
