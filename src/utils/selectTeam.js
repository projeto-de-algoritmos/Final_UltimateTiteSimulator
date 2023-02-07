export const getTeam = (players, formation) => {
  console.log(players);
  players.sort((a, b) => a.overall - b.overall);

  const team = formation.formationPlayers.map(slot => {
    const selectedPlayer = players.filter(p => p.position === slot.position)[0];

    const index = players.indexOf(selectedPlayer);
    players.splice(index, 1);

    return {
      ...selectedPlayer,
      ...slot,
    };
  });

  return team;
}