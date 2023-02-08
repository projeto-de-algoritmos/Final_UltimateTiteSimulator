const positionOrder = [
  { position: 'GK', order: 1 },
  { position: 'CB', order: 2 },
  { position: 'LB', order: 3 },
  { position: 'RB', order: 4 },
  { position: 'CM', order: 5 },
  { position: 'CAM', order: 6 },
  { position: 'LW', order: 7 },
  { position: 'RW', order: 8 },
  { position: 'ST', order: 9 },
]
const getOrderByPosition = (position) => positionOrder.filter(p => p.position === position)[0].order;

export const sortPlayers = (players, key, order) => {
  const newPlayers = [...players];
  const dataType = typeof newPlayers[0][key];

  if (key === 'position') newPlayers.sort((a, b) => getOrderByPosition(a[key]) - getOrderByPosition(b[key]))
  else if (dataType === 'number') newPlayers.sort((a, b) => a[key] - b[key])
  else if (dataType === 'string') {
    newPlayers.sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    })
  };

  order === "desc" && newPlayers.reverse();

  return newPlayers;
}

export const getLineup = (players, formation) => {
  const orderedPlayers = sortPlayers(players, 'overall', 'desc');

  let overall = 0;
  const playersList = formation.formationPlayers.map(slot => {
    const selectedPlayer = orderedPlayers.filter(p => p.position === slot.position)[0];

    const index = orderedPlayers.indexOf(selectedPlayer);
    orderedPlayers.splice(index, 1);

    overall += selectedPlayer.overall;

    return {
      ...selectedPlayer,
      ...slot,
    };
  });

  const lineup = {
    overall: Math.round(overall / playersList.length),
    firstPlayer: formation.firstPlayer,
    lastPlayer: formation.lastPlayer,
    players: [...playersList]
  }

  return lineup;
}