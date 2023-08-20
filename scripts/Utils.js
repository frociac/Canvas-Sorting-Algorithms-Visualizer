/**
 * A utility class containing various helper functions.
 */
class Utils {

/**
 * Start the sorting process based on the selected algorithm.
 */
static startSort() {
  switch (Options.selectedAlgorithm) {
    /**
     * Selection sort algorithm.
     * @case "selection"
     */
    case "selection":
      Algorithms.selectionSort();
      break;
    
    /**
     * Bubble sort algorithm.
     * @case "bubble"
     */
    case "bubble":
      Algorithms.bubbleSort();
      break;

    /**
     * Insertion sort algorithm.
     * @case "insertion"
     */
    case "insertion":
      Algorithms.insertionSort();
      break;

    /**
     * Merge sort algorithm.
     * @case "merge"
     */
    case "merge":
      Algorithms.mergeSort();
      break;

    /**
     * Quick sort algorithm.
     * @case "quick"
     */
    case "quick":
      Algorithms.quickSort();
      break;

    /**
     * Heap sort algorithm.
     * @case "heap"
     */
    case "heap":
      Algorithms.heapSort();
      break;

    /**
     * Shell sort algorithm.
     * @case "shell"
     */
    case "shell":
      Algorithms.shellSort();
      break;

    /**
     * Bogo sort algorithm.
     * @case "bogo"
     */
    case "bogo":
      Algorithms.bogoSort();
      break;

    default:
      console.warn("No valid algorithm selected.");
  }
}

  /**
   * Generates a random array of the given size containing float numbers.
   * @param {number} size - The size of the array to generate.
   * @param {number} min - The minimum value of the elements.
   * @param {number} max - The maximum value of the elements.
   * @returns {number[]} The generated random array.
   */
  static generateRandomArray(size) {
    const array = [];
    for (let i = 0; i < size; i++) {
      const element = Math.random() * CanvasManager.height;
      array.push(element);
    }
    return array;
  }

  /**
   * Swaps two elements in the array and updates swap points.
   * @param {number} i1 - The index of the first element.
   * @param {number} i2 - The index of the second element.
   * @returns {Promise<void>} A Promise that resolves after the swap.
   */
  static async swap(i1, i2) {
    if (i1 == i2) return;
    ArrayData.swapPositions = [i1, i2];
    const temp = ArrayData.array[i1];
    ArrayData.array[i1] = ArrayData.array[i2];
    ArrayData.array[i2] = temp;
    await CanvasManager.draw();
    ArrayData.swapPositions = [];
  }

  /**
   * Compares two elements in the array and updates compare points.
   * @param {number} i1 - The index of the first element.
   * @param {number} i2 - The index of the second element.
   * @returns {Promise<number>} The comparison result: -1, 0, or 1.
   */
  static async compare(i1, i2) {
    ArrayData.comparePositions = [i1, i2];
    await CanvasManager.draw();
    ArrayData.comparePositions = [];
    if (ArrayData.array[i2] > ArrayData.array[i1]) return -1;
    else if (ArrayData.array[i2] === ArrayData.array[i1]) return 0;
    else return 1;
  }

  /**
   * Checks if the array is sorted in non-decreasing order.
   * @returns {Promise<boolean>} True if the array is sorted, false otherwise.
   */
  static async isSorted() {
    for (let i = 1; i < ArrayData.array.length; i++) {
      if (await this.compare(i, i - 1) < 0) {
        return false;
      }
    }
    return true;
  }

  /**
   * Shuffles the array using the Fisher-Yates algorithm.
   * @returns {Promise<number[]>} A Promise that resolves with the shuffled array.
   */
  static async shuffle() {
    var m = ArrayData.array.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = ArrayData.array[m];
      ArrayData.array[m] = ArrayData.array[i];
      ArrayData.array[i] = t;
    }
    return ArrayData.array;
  }

  /**
   * Creates a promise that resolves after the given amount of time.
   * @param {number} ms - The time in milliseconds to wait.
   * @returns {Promise<void>} A Promise that resolves after the delay.
   */
  static wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}