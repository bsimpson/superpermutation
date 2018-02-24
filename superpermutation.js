module.exports = (() => {
  function calc(val) {
    let i = 1;
    const a = Array.from({length: val}, () => i++);
    let products = [];
    let generator1 = permutations(a);
    while((p = generator1.next().value) !== undefined) {
      products.push(p);
    }
    products = products.map((x) => x.join('')); // ["12", "21"]

    let generator2 = permutations(products); // [['12', '21'], ['21', '12']]
    let shortestString = null;
    let testString = '';

    while ((p = generator2.next().value) != undefined) { // ['12', '21']
      testString = p.reduce((sum, product) => { // '12'
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
        console.log(`New shortest superpermutation: '${shortestString}'`);
        shortestString = testString;
      }
    };

    return shortestString;
  }

  function pretty(val) {
    return `Shortest string is '${calc(val)}'`;
  }

  // https://lowrey.me/permutation-with-an-es6-javascript-generator-2/
  function* permutations(elements) {
    if (elements.length === 1) {
      yield elements;
    } else {
      let [first, ...rest] = elements;
      for (let perm of permutations(rest)) {
        for (let i = 0; i < elements.length; i++) {
          let start = perm.slice(0, i);
          let rest = perm.slice(i);
          yield [...start, first, ...rest];
        }
      }
    }
  };

  return {
    calc: calc,
    pretty: pretty,
  }
})();