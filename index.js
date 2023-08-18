const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "rgb(0,0,0)"
ctx.fillRect(0, 0, canvas.width, canvas.height);
const max = canvas.height;
const min = 1;
let stopSort = false;
let currentlySelected = "bogo";
let size = 10;

function generateRandomArray(max, min, size) {
  const array = [];
  for (let i = 0; i < size; i++) {
    const element = Math.floor(Math.random() * (max - min + 1) + min);
    array.push(element);
    // const node = document.createElement("div");
    // const textnode = document.createTextNode(element);
    // node.appendChild(textnode);
    // document.body.appendChild(node);
  }
  console.log(array);
  return array;
}
async function draw(array, comparePoints=[], sortedPoints=[]) {
  
  ctx.fillStyle = "rgb(0,0,0)"
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const rectWidth = canvas.width/size;
  if (canvas.getContext) {
    for(let i = 0; i < array.length; i++) {
      if (comparePoints.includes(i)) ctx.fillStyle = 'yellow';
      else if (sortedPoints.includes(i)) ctx.fillStyle = 'green';
      else ctx.fillStyle = 'white';
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      ctx.strokeRect(i * rectWidth + ctx.lineWidth / 2, canvas.height - array[i] + ctx.lineWidth / 2, rectWidth - ctx.lineWidth, array[i] - ctx.lineWidth);
      ctx.fillRect(i * rectWidth + ctx.lineWidth / 2 + 1, canvas.height - array[i] + ctx.lineWidth / 2 + 1, rectWidth - ctx.lineWidth - 1, array[i] - ctx.lineWidth - 1);
    }
    await wait(100);
  }
}

function sort() {
  let button = document.getElementById("sort");
  button.onclick = () => {
    stopSort = true;
  }
  button.textContent = "Stop";
  switch(currentlySelected){
    case "bogo":
      bogoSort();
  } 
}

function stopExecution() {
  ctx.fillStyle = "rgb(0,0,0)"
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  let button = document.getElementById("sort");
  button.onclick = sort;
  button.textContent = "Sort";
  stopSort = false;
}

async function bogoSort() {
  let array = generateRandomArray(max, min, size);
  await draw(array);
  while(!(await isSorted(array))) {
    if (stopSort) return stopExecution();
    array = await shuffle(array)
    await draw(array);
  }
  await draw(array, [], Array.from(Array(array.length).keys()))
  console.log(array);
}

async function isSorted(array) {
  for (let i = 1; i < array.length; i++) {
    await draw(array, [i-1,i])
    if (array[i] < array[i-1]) {
      return false;
    }
  }
  return true;
}
// fisher-yates
async function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}