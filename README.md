# Sorting Algorithms Visualizer

### [Visit the website](https://frociac.github.io/Sorting-Algorithms-Visualizer "Sorting Algorithms Visualizer")

### Explore Sorting Algorithms Through Visualization
This website employs JavaScript canvas to provide a display of some of the most widely used sorting algorithms in modern programming. The purpose of this visualization is to simplify the inner workings of these algorithms by using color-coded elements at a human-understable simulation speed.

### Color Legend
- **Yellow:** Comparisons between elements
  - In the sorting process, comparisons with other elements are important to determine the correct arrangement of items.
- **Blue:** Elements to be Swapped
  - Often in sorting algorithms, we want to rearrange elements into a more desierable position. Blue indicates elements that are currently being moved or swapped.
- **Green:** Sorted Elements
  - Many sorting algorithms optimize their efficiency by placing elements in their appropriate positions early on. Various strategies exist to achieve this. Once an element is placed correctly, it turns green and is never compared again.
 
### Sorting Algorithms to be Implemented
- [x] Selection Sort
- [x] Bubble Sort
- [ ] Insertion Sort
- [ ] Merge Sort
- [ ] Quick Sort
- [ ] Heap Sort
- [ ] Shell Sort
- [x] Bogo Sort

### TODO
- [ ] Implement other sorting algorithms (and add to the list)
- [ ] Asynchronous Stop
  - Multiple bugs if you attempt to prematurely end sort
  - One option is to just force a refresh to the page
- [ ] Detailed Explanation on each algorithm
  - Lorem ipsum placeholder on the right
- [ ] More control over simulation speed
  - Individually change comparison, swap, and sorted speeds
