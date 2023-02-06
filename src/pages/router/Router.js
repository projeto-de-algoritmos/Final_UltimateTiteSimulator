import { useState } from "react";
import { players } from "../../assets/players";
import InitialPage from "../InitialPage";
import ResultPage from "../ResultPage";


const Router = () => {
  const [mode, setMode] = useState('initial');

  const initPlayersList = players.map(player => ({ ...player, selected: true }));
  const [playersList, setPlayersList] = useState(initPlayersList);

  return mode === 'initial' ?
    <InitialPage setMode={setMode} players={playersList} setPlayers={setPlayersList} /> :
    <ResultPage setMode={setMode} players={playersList} />
}

export default Router;