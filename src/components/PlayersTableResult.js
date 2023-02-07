const PlayersTable = (props) => {
  const { players } = props;

  const columns = [
    { key: "position", label: "Posição" },
    { key: "name", label: "Nome" },
    { key: "overall", label: "Geral" },
  ]

  const renderHeader = columns.map(({ key, label }) => <th key={key}>{label}</th>);

  const renderPlayers = players?.map((player, index) => (
    <tr key={`player-${index}`}>
      <td className="col-3">{player.position}</td>
      <td className="col-6">{player.name}</td>
      <td className="col-3">{player.overall}</td>
    </tr>
  ));

  return (
    <table className="table-result">
      <thead>
        <tr>
          {renderHeader}
        </tr>
      </thead>
      <tbody>
        {renderPlayers}
      </tbody>
    </table>
  )
}

export default PlayersTable;