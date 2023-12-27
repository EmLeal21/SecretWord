import './GameOver.css'

const GameOver = ({retry, score}) => {
  return (
    <div>
        <h1>Game Over</h1>
        <h2>A pontuação foi de: {score}</h2>
        <button onClick={retry}>Restart Game</button>
    </div>
  )
}

export default GameOver