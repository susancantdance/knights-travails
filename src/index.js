function square(x, y) {
  const mapped = [];
  const array = [
    [1, 2],
    [2, 1],
    [1, -2],
    [2, -1],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
  ];
  array.forEach((item) => {
    item[0] = item[0] + x;
    item[1] = item[1] + y;
    // console.log(item);
    if (item[0] < 8 && item[0] >= 0 && item[1] < 8 && item[1] >= 0) {
      mapped.push(item);
    }
  });
  return { x, y, mapped };
}

function makeBoard(k) {
  let board = new Map();
  for (let x = 0; x < k + 1; x++) {
    for (let y = 0; y < k + 1; y++) {
      let myKey = JSON.stringify([x, y]);
      board.set(myKey, square(x, y).mapped);
    }
  }

  const knightMoves = (
    start,
    end,
    queue = [],
    visited = [],
    path = new Map(),
    original = []
  ) => {
    if (visited.length == 0) {
      //this is the first iteration
      original = start.slice();
      console.log(`original is below`);
      console.log(original);
    }
    visited.push(start);
    if (start[0] == end[0] && start[1] == end[1]) {
      //does start == end
      console.log(`we found a match and it's ${end}`);
      console.log(`path is`);
      console.log(path);
      getPath(path, end, original);
      return;
    } else {
      //else, add all the edges to the queue
      let edges = board.get(JSON.stringify(start));
      for (let i = 0; i < edges.length; i++) {
        if (!visited.includes(edges[i]) && !queue.includes(edges[i])) {
          queue.push(edges[i]);
          if (path.get(JSON.stringify(edges[i])) == undefined) {
            path.set(JSON.stringify(edges[i]), start);
          }
        }
      }
      console.log(`queue ${JSON.stringify(queue)}`);
      console.log(`visisted ${JSON.stringify(visited)}`);

      if (queue.length != 0) {
        let next = queue.shift();
        return knightMoves(next, end, queue, visited, path, original);
      }
    }
  };

  const getPath = (map, end, original) => {
    let finalPath = [end];
    let node = end;
    console.log(`me map is`);
    console.log(map);
    console.log(`node is ${JSON.stringify(node)}`);
    console.log(`parent is ${map.get(JSON.stringify(node))}`);
    console.log(map.get(JSON.stringify(node)));

    while (node[0] != original[0] || node[1] != original[1]) {
      //   console.log(`node is ${JSON.stringify(node)}`);
      //   console.log(`parent is ${JSON.stringify(map.get(node))}`);
      let parent = map.get(JSON.stringify(node));
      finalPath.unshift(parent);
      node = parent;
    }
    console.log("FINAL PATH");
    console.log(finalPath);
  };

  //   function knightMoves(start, end, queue = [start], path = []) {
  //     console.log(`start, end, queue [${start}], [${end}], ${queue}`);

  //     if (queue[0][0] == end[0] && queue[0][1] == end[1]) {
  //       console.log(`found it it's ${queue[0]}`);
  //       return;
  //     } else {
  //       //console.log(queue);
  //       let x = queue[0][0];
  //       let y = queue[0][1];
  //       let point = square(x, y);
  //       let edges = point.mapped;
  //       queue = queue.concat(edges);
  //       let parent = queue.shift();
  //       knightMoves(queue[0], end, queue, path);
  //     }
  //   }

  return { board, knightMoves, getPath };
}

//TESTING
let myBoard = makeBoard(7);
let myMap = myBoard.board;
myBoard.knightMoves([3, 3], [4, 3]);
