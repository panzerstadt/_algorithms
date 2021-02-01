// b1, b2, g
// g must not be in the middle

// --------
// trial 1
// --------
// --------

// const trial = (input) => {
//   // needs to keep track of what it has tried
//   // what is the previous value
//   // what is the next value

//   // return false to trigger backtracking

//   if (input === false) {
//     // backtrack
//   }

//   // else
//   // try this method

//   // track array of items to explore
//   let items = ["b1", "b2", "g"];

//   // track starting item
//   let startingItemPos = 0;
//   let startingItem = items[startingItemPos]; // starts from b1, then b2, then g

//   // track position of current item
//   let pos = 0;
//   let currentItem = items[pos];

//   // if we have exhausted all items
//   // backtrack

//   const boundingFunction = (pos) => {
//     // g cannot be in position 1 (items[1])
//     if (pos === 1) return false;
//     return true;
//   };

//   // start placing item on array
//   /*
//   start explore
//   have 1 array
//   at the beginning
//   pop first item (shift)
//   for remainder, explore
//     - pop first item
//   */
// };

// --------
// trial 2
// --------
// --------

// const explore = (inputArray, nth, boundingFunction) => {
//   const arrayCopy = [...inputArray];

//   const first = arrayCopy.shift();
//   const rest = arrayCopy;

//   if (!rest.length) return true; // done

//   console.log("this is the first item", first);

//   return rest.map((item, i) => explore(rest, i, boundingFunction));
// };

// const testArray = ["b1", "b2", "g"];
// const result = explore(testArray, (item) => item !== "g");
// console.log(result);

// --------
// trial 3
// --------
// --------

// const INCEPTION_LEVEL_VIEW = 1;
// const givenArray = ["b1", "b2", "g"];
// const explore = (total, current, nth = 0, final = []) => {
//   if (nth === 1) {
//     // run boundary function
//     if (current === "g") {
//       console.log("boundary function hit!");
//       return false;
//     }
//   }

//   if (nth === INCEPTION_LEVEL_VIEW) {
//     console.log(`
// top level
// ---------`);
//     console.log("inception level", nth);
//     console.log(current, total);
//     console.log("previous total", final);
//   }

//   // each loop is a 'branch' off the state tree
//   total.map((_, index) => {
//     const totalCopy = [...total];
//     const nthItem = totalCopy.splice(index, 1)[0];

//     if (nth === INCEPTION_LEVEL_VIEW) {
//       console.log(`
// loop level
// -----------`);
//       console.log("loop number", index);
//       // console.log("at item number", index, nth);
//       console.log("current", nthItem);
//       console.log("rest", totalCopy);
//       console.log("current total", [...final, nthItem]);
//     }

//     if (!nthItem) {
//       console.log("end!", final);
//       // end of array
//       return final;
//     }

//     explore(totalCopy, nthItem, nth + 1, [...final, nthItem]);
//   });

//   // const totalCopy = [...total];
//   // const nthItem = totalCopy.splice(index, 1);
//   // if (!nthItem.length) {
//   //   console.log("end!", final);
//   //   // end of array
//   //   return final;
//   // } else {
//   // iterate top level
//   // explore(total, nthItem, nth + 1, [...final, nthItem]);

//   // // iterate the rest
//   // return explore(total, undefined, nth + 1); // treat as if repeating from top
//   // }
// };

// --------
// trial 4
// --------
// --------

// sketching happened, and then

// const explore = (inputArrayOrLeftovers, final = []) => {
//   // boundary function here

//   const results = inputArrayOrLeftovers.map((_, index) => {
//     let newFinal = [...final];

//     // add to result
//     const leftovers = [...inputArrayOrLeftovers];
//     const currentItem = leftovers.splice(index, 1)[0];
//     newFinal.push(currentItem);

//     // if nothing in leftovers, we're done
//     if (!leftovers.length) return newFinal;

//     // otherwise, test all the combinations of the rest
//     return explore(leftovers, newFinal);
//   });
//   console.log("got my results!", results);
//   return results;
// };

// --------
// trial 5 (with boundary function)
// --------
// --------

const explore = (inputArrayOrLeftovers, final = []) => {
  // boundary function here

  const results = inputArrayOrLeftovers.map((_, index) => {
    let newFinal = [...final];

    // add to result
    const leftovers = [...inputArrayOrLeftovers];
    const currentItem = leftovers.splice(index, 1)[0];

    if (currentItem === "g" && newFinal.length === 1) {
      // if we're looking at g, and it's the second item in the array
      return false;
      // TODO: maybe just check last item, it's cleaner?
    }
    newFinal.push(currentItem);

    // if nothing in leftovers, we're done
    if (!leftovers.length) return newFinal;

    // otherwise, test all the combinations of the rest
    return explore(leftovers, newFinal).map((arr) => arr.flat());
  });
  return results.filter((cond) => cond !== false);
};

const givenArray = ["b1", "b2", "g"];
const results = explore(givenArray).flat();

console.log(results);

/*
should return
-------------
[
  ['b1', 'b2', 'g']
  ['b2', 'b1', 'g']
  ['g', 'b1', 'b2']
  ['g', 'b2', 'b1']
]
*/
