module.exports = (() => {
  function calc(val) {

    const cluster = require('cluster');

    if (cluster.isMaster) {
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

      // Worker setup
      const numCPUs = require('os').cpus().length;

      // Fork workers.
      for (let i = 0; i < numCPUs; i++) {
        let worker = cluster.fork();

        // Receive message from workers
        worker.on('message', (testString) => {
          // console.log(`From worker ${testString}`);
          if (shortestString == null || (shortestString.length > testString.length)) {
            shortestString = testString;
            console.log(`New shortest superpermutation: '${shortestString}'`);
          }
        });
      }
      // End worker setup

      // Send message to workers
      while ((p = generator2.next().value) != undefined) { // ['12', '21']
        let id = Math.floor(Math.random() * numCPUs) + 1;
        cluster.workers[id].send(p);
      };

      for (const id in cluster.workers) {
        cluster.workers[id].kill();
      }
      // return `Final result ${shortestString}`;

    } else {
      process.on('message', (p) => {
        let data = buildTestString(p);
        process.send(data);
      });
      // cluster.worker.kill();
      return 'Worker exiting';
    }
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

  function buildTestString(p) {
    return(p.reduce((sum, product) => { // '12'
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
    }, ''));
  };

  return {
    calc: calc,
    pretty: pretty,
  }
})();