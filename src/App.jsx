//CSS
import './App.css'

//React
import { useCallback, useEffect, useState } from 'react'

//data
import {wordsList} from './data/words'

//components
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'


const stages = [
  {id:1, name: "start"},
  {id:2, name: "game"},
  {is:3, name: "end"},
];

const guessesQty =3;

function App() {
  const [gameStage, setGameStage]= useState(stages[0].name);
  const [words] = useState(wordsList);


  const[pickedWord, setPickedWord]= useState("");
  const[pickedCategory, setPickedCategory]= useState("");
  const[letters, setLetters]= useState([]);

  const[guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters ] = useState([]);
  const[score, setScore] = useState(0);
  const[guesses, setGuesses] = useState(guessesQty);



const pickWordAndCategory = useCallback(() => {
  
  //pick random category
  const categories = Object.keys(words);
  const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

  console.log(category);

  //pick a random word
  const word = words[category][Math.floor(Math.random() * words[category].length )];

  console.log(word)

  return {word, category}

}, [words])



//starts the game
const starGame = useCallback(() =>{
  //clear all letters
  clearLetterStates();



  // pick word and pick category
 const {word, category} =  pickWordAndCategory();

//create a array of letters

let wordLetters = word.split("");

wordLetters = wordLetters.map((l) => l.toLowerCase());

 console.log(wordLetters);

 //fil States
 setPickedWord(word);
 setPickedCategory(category);
 setLetters(wordLetters);

  setGameStage(stages[1].name)
}, [pickWordAndCategory])


//proccess the letter input
const verifyLetter =(letter) => {
  
  const normalizedLetter = letter.toLowerCase();

  //check if letter has already been utilized
  if(
    guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)
  ){
    return;
  }

  //push guesse letter or remove a guess
  if( letters.includes(normalizedLetter)){
    setGuessedLetters((actualGuessedLetters) =>[
      ...actualGuessedLetters, normalizedLetter
    ])
  }else {
    setWrongLetters((actualWrongLetters) =>[
      ...actualWrongLetters, normalizedLetter
    ])
    setGuesses((actualGuesses) => actualGuesses -1);
  }
};

const clearLetterStates = () => {
  setGuessedLetters([]);
  setWrongLetters([]);
}

//check if guesses ended
useEffect(()=>{
if(guesses <= 0){
//RESET ALL STATES
clearLetterStates()

  setGameStage(stages[2].name)
}
},[guesses])

//check win conditions
useEffect(() =>{

  const uniqueLetters = [... new Set(letters)];

  //win conditions
  if(guessedLetters.length === uniqueLetters.length){
    setScore((actualScore) => (actualScore += 100));
  
    //restart game with new word
    starGame();

  }




},[guessedLetters, letters, starGame])



//restart game
const retry = () => {
  setScore(0);
  setGuesses(guessesQty);
  setGameStage(stages[0].name)
}

  return (
    <div className='App'>
     {gameStage === "start" && <StartScreen startGame = {starGame}/> }
      {gameStage === "game" && <Game  verifyLetter = {verifyLetter}
      pickedWord={pickedWord}
      pickedCategory={pickedCategory}
      letters={letters}
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}
      guesses={guesses}
      score={score} /> }
      {gameStage === "end" && <GameOver retry = {retry} score={score}/>  }
      
    </div>
  )
}

export default App
