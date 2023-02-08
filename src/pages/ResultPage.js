import { useState, useEffect } from 'react';
import Field from '../components/Field';
import PlayersTableResult from '../components/PlayersTableResult';
import { formationData } from '../assets/formations';
import { getLineup } from '../utils/players';
import dijkstra, { getWeightedGraph } from '../utils/dijkstra';

const ResultPage = (props) => {
  const { setMode, players } = props;
  const [result, setResult] = useState(null);
  const [lineup, setLineup] = useState(null);

  useEffect(() => {
    let playersCopy = [...players].filter(player => player.selected);
    const newLineup = getLineup(playersCopy, formationData);
    setLineup(newLineup);
  }, [])

  useEffect(() => {
    if (!!lineup) {
      const graph = getWeightedGraph(lineup.players);
      const result = dijkstra(graph, lineup.firstPlayer.toString(), lineup.lastPlayer.toString());
      setResult(result);
    }
  }, [lineup])

  const handleReturnBtn = () => setMode('initial');

  return (
    <div className="home">
      <div className='container'>
        <section className="text-center">
          <h1>Tite Simulator</h1>
          <p>Abaixo temos a lista de jogadores titulares baseados na melhor classificação geral e a rota onde há a média de maior precisão de passe <br />(baseado na medida de habilidade em passe de cada jogador escalado)</p>
        </section>
        <section className='actions-section d-flex justify-content-center align-items-center'>
          <button type="button" className="btn btn-primary" onClick={handleReturnBtn}>Retornar</button>
          <h5 className="ml-4 mb-1">Classificação do time: {lineup?.overall}</h5>
          <h5 className="ml-4 mb-1">Média de precisão dos passes: {Math.round(result?.passingAvg)}</h5>
        </section>
        <section className='fields-section text-nowrap'>
          <PlayersTableResult players={lineup?.players} />
          <div className='field-container'>
            <Field mode={'init'} lineup={lineup} result={result?.path} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default ResultPage;