import { useState, useEffect } from 'react';
import Field from '../components/Field';
import PlayersTableResult from '../components/PlayersTableResult';
import { formationData } from '../assets/formations';
import { getTeam } from '../utils/selectTeam';
import dijkstra, { getWeightedGraphFromData } from '../utils/dijkstra';

const ResultPage = (props) => {
  const { setMode, players } = props;
  const [result, setResult] = useState(null);

  const [team, setTeam] = useState([]);

  useEffect(() => {
    let playersCopy = [...players];
    playersCopy.filter(player => player.selected);
    const newTeam = getTeam(players, formationData);
    setTeam(newTeam);
  }, [])

  useEffect(() => {
    const graph = getWeightedGraphFromData(team);
    const result = dijkstra(graph, formationData.firstPlayer, formationData.lastPlayer);
    setResult(result);
  }, [team])

  const handleReturnBtn = () => setMode('initial');

  return (
    <div className="main-page">
      <section className="text-center">
        <h1>Tite Simulator</h1>
        <p>Depois de vergonhosamente perder a copa do mundo para a Croácia, Tite quer buscar a vingança virtual de sua derrota e precisa da sua ajuda para escalar o melhor time possível com os mesmos jogadores que convocou.</p>
        <p>Dessa vez, ele está disposto a experimentar novas táticas e considerar o entrosamento dos jogadores.</p>
      </section>
      <section className='actions-section d-flex justify-content-center'>
        <button type="button" className="btn btn-primary" onClick={handleReturnBtn}>Retornar</button>
      </section>
      <section className='d-flex justify-content-center text-nowrap'>
        <PlayersTableResult players={team} />
      </section>
      <section className='fields-section'>
        <div className='field-container'>
          <Field mode={'init'} lineup={formationData} result={result} />
        </div>
        <div className='field-container'>
          <Field mode={'result'} lineup={formationData} result={result} />
        </div>
      </section>
    </div >
  );
}

export default ResultPage;