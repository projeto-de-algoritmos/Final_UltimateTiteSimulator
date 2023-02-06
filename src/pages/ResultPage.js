import { useEffect } from 'react';

const ResultPage = (props) => {
  const { setMode, players } = props;

  const handleReturnBtn = () => setMode('initial');

  useEffect(() => {
    console.log(players)
  }, [])

  return (
    <div className="home">
      <div className='container'>
        <section className="text-center">
          <h1>Tite Simulator</h1>
        </section>
        <section className='button-list text-center'>
          <button type="button" className="btn btn-primary" onClick={handleReturnBtn}>Retornar</button>
        </section>
      </div>
    </div>
  );
}

export default ResultPage;