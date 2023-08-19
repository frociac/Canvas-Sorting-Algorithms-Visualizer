const ArrayData = {
  array: [],
  comparePoints: [],
  sortedPoints: [],
  swapPoints: []
}
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const max = canvas.height;
const min = 1;
let useSliderSize = false;
let runtimeSize = 5;
let size = 5;
let speed = 250;
let currentlySelected = "";

const verifyArrayInput = (arrayString) => {
  if (!arrayString) {
    ArrayData.array = generateRandomArray(size);
    useSliderSize = true;
    return false;
  }
  let arr = arrayString.split(" ");
  for (let i = 0; i < arr.length; i++) {
    if (isNaN(arr[i])) {
      ArrayData.array = generateRandomArray(size);
      useSliderSize = true;
      return false;
    }
    // truncates to max canvas size
    arr[i] = Math.min(arr[i], max);
  }
  useSliderSize = false;
  ArrayData.array = arr;
  runtimeSize = ArrayData.array.length;
  console.log(ArrayData.array);
  return true;
}

const startSort = () => {
  if (useSliderSize) runtimeSize = size;
  switch(currentlySelected) {
    case "selection":
      selectionSort();
      break;
    case "bubble":
      bubbleSort();
      break;
    case "insertion":
    case "merge":
    case "quick":
    case "heap":
    case "shell":
      break;
    case "bogo":
      bogoSort();
      break;
    default:
       console.error("invalid sorting algorithm");
  }
}

const setSpeed = (speedString) => {
  if (speedString) speed = parseInt(speedString);
  else return false;
}

const sortSelect = (choice) => {
  currentlySelected = choice;
}

const setSize = (sizeString) => {
  size = parseInt(sizeString);
}

const setUpCanvas = () => {
  ctx.fillStyle = "rgb(0,0,0)"
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ArrayData.array = [];
  ArrayData.comparePoints = [];
  ArrayData.sortedPoints = [];
  ArrayData.swapPoints = [];
}

const generateRandomArray = (size) => {
  const array = [];
  for (let i = 0; i < size; i++) {
    const element = Math.floor(Math.random() * (max - min + 1) + min);
    array.push(element);
  }
  console.log(array);
  return array;
}
const draw = async () => {
  ctx.fillStyle = "rgb(0,0,0)"
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const rectWidth = canvas.width/runtimeSize;
  if (canvas.getContext) {
    for(let i = 0; i < ArrayData.array.length; i++) {
      if (ArrayData.comparePoints.includes(i)) ctx.fillStyle = 'yellow';
      else if (ArrayData.sortedPoints.includes(i)) ctx.fillStyle = 'green';
      else if (ArrayData.swapPoints.includes(i)) ctx.fillStyle = 'blue';
      else ctx.fillStyle = 'white';
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      ctx.strokeRect(i * rectWidth + ctx.lineWidth / 2, canvas.height - ArrayData.array[i] + ctx.lineWidth / 2, rectWidth - ctx.lineWidth, ArrayData.array[i] - ctx.lineWidth);
      ctx.fillRect(i * rectWidth + ctx.lineWidth / 2 + 1, canvas.height - ArrayData.array[i] + ctx.lineWidth / 2 + 1, rectWidth - ctx.lineWidth - 1, ArrayData.array[i] - ctx.lineWidth - 1);
    }
    await wait(speed);
  }
}

const swap = async (i1, i2) => {
  ArrayData.swapPoints = [i1, i2];
  const temp = ArrayData.array[i1];
  ArrayData.array[i1] = ArrayData.array[i2];
  ArrayData.array[i2] = temp;
  await draw();
  ArrayData.swapPoints = [];
}
/**returns -1, 0, 1
 * -1: i2 > i1 
 * 0: i2 == i1
 * 1: i2 < i1
 */
const compare = async (i1, i2) => {
  ArrayData.comparePoints = [i1, i2];
  await draw();
  ArrayData.comparePoints = [];
  if (ArrayData.array[i2] > ArrayData.array[i1]) return -1;
  else if (ArrayData.array[i2] === ArrayData.array[i1]) return 0;
  else return 1;
}

const isSorted = async () => {
  for (let i = 1; i < ArrayData.array.length; i++) {
    if (await compare(i, i-1) == -1) {
      return false;
    }
  }
  return true;
}
// fisher-yates shuffle
const shuffle = async () => {
  var m = ArrayData.array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = ArrayData.array[m];
    ArrayData.array[m] = ArrayData.array[i];
    ArrayData.array[i] = t;
  }
  return ArrayData.array;
}

const wait = (ms) => {
  return new Promise((resolve, reject) => {
    let timeoutId = setTimeout(() => {
      if (false) {
        clearTimeout(timeoutId);
        resolve();
      } else {
        resolve();
      }
    }, ms);
  });
}
// algorithms
async function bogoSort() {
  while(true) {
    if (await isSorted()) break;
    ArrayData.array = await shuffle();
    await draw(ArrayData.array);
  }
  // creates and stores an array from 0 to ArrayData.array.length
  ArrayData.sortedPoints = Array.from(Array(ArrayData.array.length).keys())
  await draw();
  console.log(ArrayData.array);
}
async function selectionSort() {
  for (let i = 0; i < ArrayData.array.length-1; i++) {
    let minIndex = i;
    for (let j = i+1; j < ArrayData.array.length; j++) {
      ArrayData.comparePoints = [minIndex];
      await draw()
      if (await compare(minIndex, j) > 0) minIndex = j;
    }
    //array[minIndex] > array[j]
    await swap(minIndex, i);
    ArrayData.sortedPoints.push(i);
  }
  ArrayData.sortedPoints.push(ArrayData.array.length -1);
  await draw();
  console.log(ArrayData.array);
}
async function bubbleSort() {
  for (let i = 0; i < ArrayData.array.length; i++) {
    for (let j = 0; j < ArrayData.array.length - i - 1; j++) {
      if (await compare(j, j+1) > 0) await swap(j, j+1);
    }
    ArrayData.sortedPoints.push(ArrayData.array.length - i - 1);
  }
  await draw();
  console.log(ArrayData.array);
}