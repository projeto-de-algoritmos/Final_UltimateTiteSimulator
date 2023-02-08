const TouchLine = (props) => {
  const { playerA, playerB, mode } = props;

  const getClassByMode = mode === 'result' ? 'line-result' : '';

  return (
    <svg className={`touch-line`}>
      <polyline className={getClassByMode} points={`${playerA.positionX},${playerA.positionY} ${playerB.positionX},${playerB.positionY}`} />
    </svg>
  );
}
export default TouchLine;