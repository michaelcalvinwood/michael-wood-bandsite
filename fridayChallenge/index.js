// ================== findSmallestInteger =====================
// Question:
// Given an --array of integers--, find the --smallest integer--.
// ============================================================

// Input: array of integers
// Output: the smallest integer in that array

// InputExample:[6, 10, 12, 3, 56, 2]
// Output Example: 2

// Write function that takes an array
// Sort the array in ascending order
// Output the first element in the array

function smallestInteger (array) {
    const sortedArray = array.sort ((a, b) => {
        return a - b;
    })

    return sortedArray[0];
}

const gArray = [3, 10, 1, 4];

const smallestNumber = smallestInteger(gArray);

console.log (smallestNumber)


const gurpreetsSmallestNumber = gArray.findSmallestInteger();

console.log (gurpreetsSmallestNumber);