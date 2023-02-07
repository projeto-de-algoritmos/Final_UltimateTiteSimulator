class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }
  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    let newNode = new Node(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }
  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element.priority >= parent.priority) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }
  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;
  }
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

function getWeightedGraphFromData(formationPlayersData) {
  var graph = new WeightedGraph();

  // adiciona os vertices do grafo
  formationPlayersData.forEach(playerData => {
    graph.addVertex(playerData.id);
  });
  // adiciona arestas do grafo com seus respectivos pesos
  formationPlayersData.forEach(playerData => {
    playerData.touchOptions.forEach(touchOption => {
      const weight = playerData.position === 'CF' | 'LW' | 'LW' ? playerData.finishing : playerData.passing;
      graph.addEdge(playerData.id, touchOption.id, weight); //TODO: no lugar de touchoption.weight, colocar valor do toque ou do chute, a depender da posição
    });
  });

  return graph;
}

function dijkstra(graph, start, finish) {
  const nodes = new PriorityQueue();
  const distances = {};
  const previous = {};
  let path = []; // para retornar ao fim
  let smallest;
  //fazer o "build" no estado inicial
  for (let vertex in graph.adjacencyList) {
    if (vertex === start) {
      distances[vertex] = 0;
      nodes.enqueue(vertex, 0);
    } else {
      distances[vertex] = Infinity;
      nodes.enqueue(vertex, Infinity);
    }
    previous[vertex] = null;
  }
  // enquanto tiver algo para visitar
  while (nodes.values.length) {
    smallest = nodes.dequeue().val;
    if (smallest === finish) {
      //Cria o caminho e vai para o fim
      while (previous[smallest]) {
        path.push(smallest);
        smallest = previous[smallest];
      }
      break;
    }
    if (smallest || distances[smallest] !== Infinity) {
      for (let neighbor in graph.adjacencyList[smallest]) {
        //encontrar o nó vizinho
        let nextNode = graph.adjacencyList[smallest][neighbor];
        //calcula a nova distancia do nó vizinho
        let candidate = distances[smallest] + nextNode.weight;
        let nextNeighbor = nextNode.node;
        if (candidate < distances[nextNeighbor]) {
          //atualiza a nova menor distancia até o nó vizinho
          distances[nextNeighbor] = candidate;
          //atualiza o nó anterior  - Como chegamos no vizinho
          previous[nextNeighbor] = smallest
          //adiciona na fila de prioridade a nova prioridade
          nodes.enqueue(nextNeighbor, candidate);
        }
      }
    }
  }
  if (path.length === 0) return null;
  return path.concat(smallest).reverse();
}

export default dijkstra;
export { getWeightedGraphFromData };