/**
 * A static class containing various sorting algorithms.
 */
class Algorithms {

/**
 * Start the sorting process based on the selected algorithm.
 */
static async startSort() {
  await CanvasManager.draw()
  switch (Options.selectedAlgorithm) {
    case "selection":
      await this.#selectionSort();
      break;
    case "bubble":
      await this.#bubbleSort();
      break;
    case "insertion":
      await this.#insertionSort();
      break;
    case "merge":
      await this.#mergeSort();
      break;
    case "quick":
      // await this.#quickSort();
      break;
    case "heap":
      // await this.#heapSort();
      break;
    case "shell":
      // await this.#shellSort();
      break;
    case "bogo":
      await this.#bogoSort();
      break;
    default:
      console.warn("No valid algorithm selected.");
  }
  await CanvasManager.draw({forceGreen: true})
  console.log(ArrayData.array);
}



  /**
   * Performs the Bogo Sort algorithm.
   * @async
   */
  static async #bogoSort() {
    while (true) {
      if (await Utils.isSorted()) break;
      ArrayData.array = await Utils.shuffle();
      await CanvasManager.draw(ArrayData.array);
    }
  }

  /**
   * Performs the Selection Sort algorithm.
   * @async
   */
  static async #selectionSort() {
    for (let i = 0; i < ArrayData.array.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < ArrayData.array.length; j++) {
        if (await Utils.compare(minIndex, j) > 0) minIndex = j;
      }
      // array[minIndex] > array[j]
      await Utils.swap(minIndex, i);
      CanvasManager.addCorrectPositions([i]);
    }
  }

  /**
   * Performs the Bubble Sort algorithm.
   * @async
   */
  static async #bubbleSort() {
    for (let i = 0; i < ArrayData.array.length; i++) {
      for (let j = 0; j < ArrayData.array.length - i - 1; j++) {
        if (await Utils.compare(j, j + 1) > 0) await Utils.swap(j, j + 1);
      }
      CanvasManager.addCorrectPositions([ArrayData.array.length - i - 1]);
    }
  }

  /**
   * Performs the Insertion Sort algorithm.
   * @async
   */
  static async #insertionSort() {
    let i;
    let j;
    for (i = 1; i < ArrayData.array.length; i++) {
      j = i - 1;
      while (j >= 0) {
        if (await Utils.compare(j, j + 1) > 0) {
          await Utils.swap(j, j + 1);
        }
        if (i == ArrayData.array.length - 1) {
          CanvasManager.addCorrectPositions([j + 1]);
        }
        j--;
      }
    }
  }
  /**
   * Performs the Merge Sort algorithm.
   * @async
   */
  static async #mergeSort() {
    const temp = new Array(ArrayData.arraySize);
    let lastMerge = false;
    for (let size = 1; size < ArrayData.arraySize; size *= 2) {
      for (let leftStart = 0; leftStart < ArrayData.arraySize - size; leftStart += size * 2) {
        const mid = leftStart + size - 1;
        const rightEnd = Math.min(leftStart + size * 2 - 1, ArrayData.arraySize - 1);
        if (size*2 > ArrayData.arraySize) lastMerge = true;
        await this.#merge(temp, leftStart, mid, rightEnd, lastMerge);
      }
    }
  }

/**
 * Merges two sorted subarrays into a single sorted array.
 * @param {Array} temp - Temporary array to store values during merging.
 * @param {number} left - The left index of the subarray.
 * @param {number} mid - The middle index of the subarray.
 * @param {number} right - The right index of the subarray.
 */
  static async #merge(temp, left, mid, right, lastMerge) {
    CanvasManager.subArrayPositions = Utils.generateRangedArray(left, right);
    await CanvasManager.draw();

    let i = left;
    let j = mid + 1;
    
    for (let k = left; k <= right; k++) {
      temp[k] = ArrayData.array[k];
    }

    for (let k = left; k <= right; k++) {
      if (i > mid) {
        ArrayData.array[k] = temp[j];
        await CanvasManager.draw();
        j++;
      }
      else if (j > right) {
        ArrayData.array[k] = temp[i];
        await CanvasManager.draw();
        i++;
      }
      else if (temp[j] < temp[i]) {
        ArrayData.array[k] = temp[j];
        await CanvasManager.draw();
        j++;
      } else {
        ArrayData.array[k] = temp[i];
        await CanvasManager.draw();
        i++;
      }
      if (lastMerge) CanvasManager.addCorrectPositions([k]);
    }

    // Clear subarray highlights after merging
    CanvasManager.subArrayPositions = [];
    await CanvasManager.draw();
  }

}
