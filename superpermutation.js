module.exports = (() => {
  function calc(val) {
    let i = 1;
    const a = Array.from({length: val}, () => i++);
    const products = permutations(a).map((x) => x.join('')); // ["12", "21"]
    const permutationsOfProducts = permutations(products); // [['12', '21'], ['21', '12']]
    let shortestString = null;
    let testString = '';

    permutationsOfProducts.forEach((products) => { // ['12', '21']
      testString = products.reduce((sum, product) => { // '12'
        if (sum.search(product) > -1) {
          // string already contains combination - do nothing
          return sum;
        } else {
          // concat new pattern
          sum = sum.concat(product);

          // remove adjacent dups
          let sumArray = sum.split(''); // ['1','2','2','1']
          let uniqueArray = [];
          let previousVal = null;

          sumArray.forEach((x) => {
            if (previousVal !== x) {
              uniqueArray.push(x);
            }
            previousVal = x;
          });
          sum = uniqueArray.join(''); // '121'
        }
        return sum;
      }, '');

      if (shortestString == null || (shortestString.length > testString.length)) {
        shortestString = testString;
      }
    });

    return shortestString;
  }

  function pretty(val) {
    return `Shortest string is '${calc(val)}'`;
  }

  // https://gist.github.com/viebel/5cc67a97903f04036b569c0eb0436e5f
  function permutations(arr) {
    var permArr = [],
      usedChars = [];

    function permute(input) {
      var i, ch;
      for (i = 0; i < input.length; i++) {
        ch = input.splice(i, 1)[0];
        usedChars.push(ch);
        if (input.length == 0) {
          permArr.push(usedChars.slice());
        }
        permute(input);
        input.splice(i, 0, ch);
        usedChars.pop();
      }
      return permArr;
    };
    return permute(arr);
  };

  return {
    calc: calc,
    pretty: pretty
  }
})();