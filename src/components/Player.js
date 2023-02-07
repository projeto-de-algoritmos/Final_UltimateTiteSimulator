const Player = (props) => {
  const { number, positionX, positionY, status } = props;
  return (
    <div className={`player ${status}`} style={{ left: `${positionX}px`, top: `${positionY}px` }}>
      <p className='mb-0'>{number}</p>
    </div>
  );
}
export default Player;