import Player from './Player';
import TouchLine from './TouchLine';
import fieldSvg from '../assets/svg/field.svg';

const Field = (props) => {
  const { mode, lineup, result } = props;

  function getPlayerByNumber(playerId) {
    const player = lineup.formationPlayers.find(player => player.id === playerId);
    return player;
  }

  const renderAllPossibleTouches = () =>
    lineup.formationPlayers.map(playerA =>
      playerA.touchOptions.map(touchOption => {
        const playerB = getPlayerByNumber(touchOption.id);

        return (
          <TouchLine
            key={`line${playerA.id}-${playerB.id}`}
            playerA={playerA}
            playerB={playerB}
          />
        );
      })
    );

  const renderFinalTouches = () => {
    if (result === null) return null;

    let touches = [];
    for (let i = 0; i < result.length - 1; i++) {
      const playerA = getPlayerByNumber(result[i]);
      const playerB = getPlayerByNumber(result[i + 1]);

      touches.push({ playerA: playerA, playerB: playerB });
    }

    return touches.map(touch => {
      return (
        <TouchLine
          key={`line${touch.playerA.id}-${touch.playerB.id}`}
          playerA={touch.playerA}
          playerB={touch.playerB}
        />
      )
    });
  }

  const renderPlayers = () => lineup.formationPlayers.map(player =>
    <Player
      key={`player${player.id}`}
      number={player.id}
      positionX={player.positionX}
      positionY={player.positionY}
      status='normal'
    />
  );

  return (
    <div className='field' style={{ backgroundImage: `url(${fieldSvg})` }}>
      <div className='field-touches'>
        {mode === 'init' ? renderAllPossibleTouches() : renderFinalTouches()}
      </div>
      <div className={`field-players field${lineup}`}>
        {renderPlayers()}
      </div>
    </div>
  );
}

export default Field;