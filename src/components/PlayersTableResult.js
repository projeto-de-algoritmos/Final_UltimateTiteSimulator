const PlayersTable = (props) => {
  const { players } = props;

  const columns = [
    { key: "number", label: "N°" },
    { key: "position", label: "POS" },
    { key: "name", label: "NOME" },
    { key: "overall", label: "GER" },
    { key: "passing", label: "PAS" },
  ]

  const renderHeader = columns.map(({ key, label }) => <th key={key}>{label}</th>);

  const renderPlayers = players?.map((player, index) => (
    <tr key={`player-${index}`}>
      <td className="col-1">{player.number}</td>
      <td className="col-1">{player.position}</td>
      <td className="col-8">{player.name}</td>
      <td className="col-1">{player.overall}</td>
      <td className="col-1">{player.passing}</td>
    </tr>
  ));

  return (
    <table className="table-result">
      <thead>
        <tr>{renderHeader}</tr>
      </thead>
      <tbody>{renderPlayers}</tbody>
    </table>
  )
}

export default PlayersTable;