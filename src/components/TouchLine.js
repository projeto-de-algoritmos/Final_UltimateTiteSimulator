const TouchLine = (props) => {
  const { playerA, playerB } = props;

  return (
    <svg className='touch-line'>
      <polyline points={`${playerA.positionX},${playerA.positionY} ${playerB.positionX},${playerB.positionY}`} />
    </svg>
  );
}
export default TouchLine;