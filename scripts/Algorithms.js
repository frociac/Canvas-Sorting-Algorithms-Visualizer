/**
 * A static class containing various sorting algorithms.
 */
class Algorithms {
  /**
   * Performs the Bogo Sort algorithm.
   * @public
   * @async
   */
  static async bogoSort() {
    while (true) {
      if (await Utils.isSorted()) break;
      ArrayData.array = await Utils.shuffle();
      await CanvasManager.draw(ArrayData.array);
    }
    // creates and stores an array from 0 to ArrayData.array.length
    ArrayData.correctPositions = Array.from(Array(ArrayData.array.length).keys());
    await CanvasManager.draw();
    console.log(ArrayData.array);
  }

  /**
   * Performs the Selection Sort algorithm.
   * @public
   * @async
   */
  static async selectionSort() {
    for (let i = 0; i < ArrayData.array.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < ArrayData.array.length; j++) {
        if (await Utils.compare(minIndex, j) > 0) minIndex = j;
      }
      // array[minIndex] > array[j]
      await Utils.swap(minIndex, i);
      ArrayData.addCorrectPositions([i]);
    }
    ArrayData.addCorrectPositions([ArrayData.array.length - 1]);
    await CanvasManager.draw();
    console.log(ArrayData.array);
  }

  /**
   * Performs the Bubble Sort algorithm.
   * @public
   * @async
   */
  static async bubbleSort() {
    for (let i = 0; i < ArrayData.array.length; i++) {
      for (let j = 0; j < ArrayData.array.length - i - 1; j++) {
        if (await Utils.compare(j, j + 1) > 0) await Utils.swap(j, j + 1);
      }
      ArrayData.addCorrectPositions([ArrayData.array.length - i - 1]);
    }
    await CanvasManager.draw();
    console.log(ArrayData.array);
  }

  /**
   * Performs the Insertion Sort algorithm.
   * @public
   * @async
   */
  static async insertionSort() {
    let i;
    let j;
    for (i = 1; i < ArrayData.array.length; i++) {
      j = i - 1;
      while (j >= 0) {
        if (await Utils.compare(j, j + 1) > 0) {
          await Utils.swap(j, j + 1);
        }
        if (i == ArrayData.array.length - 1) {
          ArrayData.addCorrectPositions([j + 1]);
        }
        j--;
      }
    }
    ArrayData.addCorrectPositions([0]);
    await CanvasManager.draw();
    console.log(ArrayData.array);
  }
}
