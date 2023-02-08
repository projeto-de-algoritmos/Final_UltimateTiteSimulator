import PlayersTable from "../components/PlayersTable";

const InitialPage = (props) => {
  const { setMode, players, setPlayers } = props;

  const handleResultBtn = () => setMode('result');

  return (
    <div className="home">
      <div className='container'>
        <section className="text-center">
          <h1>Tite Simulator</h1>
          <p>Depois de vergonhosamente perder a copa do mundo para a Croácia, Tite quer buscar a vingança virtual de sua derrota e precisa da sua ajuda para escalar o melhor time possível com os mesmos jogadores que convocou.</p>
          <p>Dessa vez, ele está disposto a manter os jogadores em suas posições e contar com a ajuda do algoritmo de Dijkstra para calcular a melhor jogada considerando as habilidades dos jogadores com a melhor precisão de passes.</p>
        </section>
        <section className='actions-section d-flex justify-content-center'>
          <button type="button" className="btn btn-primary" onClick={handleResultBtn}>Ver resultado</button>
        </section>
        <section>
          <PlayersTable players={players} setPlayers={setPlayers} />
        </section>
      </div>
    </div>
  );
}

export default InitialPage;