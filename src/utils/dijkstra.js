function getWeightedGraph(players) {
  let graph = {};
  players.forEach(player => {
    let touchOptions = {};
    player.touchOptions.forEach(touchOption => {
      touchOptions = { ...touchOptions, [touchOption.id.toString()]: player.passing }
    })
    graph = { ...graph, [player.id.toString()]: touchOptions }
  });

  // console.log(graph);
  return graph;
}

function dijkstra(graph, startNode, endNode) {
  const passes = new Map(); // guarda a melhor média de precisão para chegar em um determinado jogador
  const previousPlayers = new Map(); // guarda o último jogador que gerou a melhor média de precisão para chegar em um determinado jogador
  const unvisitedPlayers = new Set();

  // Inicializa os passes e os jogadores não visitados
  for (const player of Object.keys(graph)) {
    passes.set(player, { sum: Number.NEGATIVE_INFINITY, qty: 0 });
    unvisitedPlayers.add(player);
  }
  passes.set(startNode, { sum: 0, qty: 0 });

  while (unvisitedPlayers.size > 0) {
    let currentPlayer = null;
    let currentMaxAvg = Number.NEGATIVE_INFINITY;

    // Encontra o jogador não visitado com a maior média de precisão
    for (const player of unvisitedPlayers) {
      const playerStatus = passes.get(player);
      const playerAvg = playerStatus.qty === 0 ? 0 : playerStatus.sum / playerStatus.qty;

      if (playerAvg > currentMaxAvg) {
        currentPlayer = player;
        currentMaxAvg = playerAvg;
      }
    }

    // Para caso não haja mais nós a serem visitados
    if (currentPlayer === null) {
      break;
    }

    unvisitedPlayers.delete(currentPlayer);

    // Atualiza a média da precisão dos passes nós adjacentes
    for (const neighbor of Object.keys(graph[currentPlayer])) {
      const currentPlayerStatus = passes.get(currentPlayer);
      const currentPlayerSum = currentPlayerStatus.sum + graph[currentPlayer][neighbor];
      const currentPlayerQty = currentPlayerStatus.qty + 1;
      const currentPlayerAvg = currentPlayerSum / currentPlayerQty;

      const neighborStatus = passes.get(neighbor);
      const neighborAvg = neighborStatus.qty === 0 ? 0 : neighborStatus.sum / neighborStatus.qty;

      if (currentPlayerAvg > neighborAvg) { // nova média X média dos dados do neighbor
        passes.set(neighbor, { sum: currentPlayerSum, qty: currentPlayerQty });
        previousPlayers.set(neighbor, currentPlayer);
      }
    }
  }

  // Encontra o caminho através dos nós anteriores
  let currentPlayer = endNode;
  const path = [];
  while (currentPlayer !== startNode) {
    path.unshift(currentPlayer);
    currentPlayer = previousPlayers.get(currentPlayer);
  }
  path.unshift(startNode);

  //return path;
  return {
    passingAvg: passes.get(endNode).sum / passes.get(endNode).qty,
    path: path
  }
}

export default dijkstra;
export { getWeightedGraph };