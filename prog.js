// "use strict";

const multiply = function (a, b, ...rest) {
  return a * b * rest.reduce((acc, val) => acc * val, 1);
};

const substract = function (a, b, ...rest) {
  return a - b - rest.reduce((acc, val) => acc + val);
};

console.log(multiply(4, 4, 2, 2, 2));
console.log(substract(20, 2, 4, 1, 2));

//Using spread operatot.

const mergeArrays = function (arr1, arr2) {
  // arr1 = [...arr1, ...arr2];
  arr1.push(...arr2);
};

const arr1 = [1, 2, 3, 4];
const arr2 = [5, 6, 7, 8];

mergeArrays(arr1, arr2);
console.log(arr1);

const obj2 = {
  name: "Abdullah",
  age: 22,
  instructor: { instName: "Yousra", instAge: 30 },
};

const obj1 = { ...obj2 };

obj1.name = "Mohamed";
obj1.instructor.instAge = 31;
console.log(obj1);
console.log(obj2);

//Swapping 2 elements using destructor.

const [x = 10, , y, z, , , , , , t = 10, f] = arr1;

console.log(x, y, z, t, f);

const mulArr = [
  [1, 2, 3],
  [4, 5, 6],
];

const [[, x1]] = mulArr;
console.log(x1);

const { name: xx } = obj1;
console.log(xx);
