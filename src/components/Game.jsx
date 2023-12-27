import { useState, useRef } from "react";
import "./Game.css";

const Game = ({
  verifyLetter,
  pickedWord,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
  pickedCategory,
}) => {
  const [letter, setLetter] = useState("");
  const letterInput = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);
    setLetter("");

    letterInput.current.focus();
  }

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação : {score}</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className="tip">
        {" "}
        Dica sobre a palavra <span>{pickedCategory}</span>
      </h3>
      <p>Ainda tem {guesses} tentativa(s)</p>
      <div className="wordContainer">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p> Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInput}
          />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLetterContainer">
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, i) => 
          <span key={i}>{letter}, </span>
        )}
      </div>
    </div>
  );
};

export default Game;
