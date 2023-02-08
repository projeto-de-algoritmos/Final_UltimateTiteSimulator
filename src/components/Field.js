import Player from './Player';
import TouchLine from './TouchLine';
import fieldSvg from '../assets/svg/field.svg';

const Field = (props) => {
  const { lineup, result } = props;

  function getPlayerByNumber(playerId) {
    const player = lineup?.players.find(player => player.id === Number(playerId));
    return player;
  }

  const renderAllPossibleTouches = () =>
    lineup?.players.map(playerA =>
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
    if (result === null || result === undefined) return null;

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
          mode="result"
        />
      )
    });
  }

  const renderPlayers = () => lineup?.players.map(player =>
    <Player
      key={`player${player.id}`}
      number={player.number}
      positionX={player.positionX}
      positionY={player.positionY}
      status='normal'
    />
  );

  return (
    <div className='field' style={{ backgroundImage: `url(${fieldSvg})` }}>
      <div className='field-touches'>
        {renderAllPossibleTouches()}
        {renderFinalTouches()}
      </div>
      <div className={`field-players`}>
        {renderPlayers()}
      </div>
    </div>
  );
}

export default Field;