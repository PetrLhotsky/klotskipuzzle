import './App.css';
//import Canvas from './modelCanvas/Canvas';
import Puzzle from './modelPuzzle/Puzzle';

function App() {
  return (
    <Puzzle
      width="501"
      height="501"
      color="red"
      image="http://petrlhotsky.wz.cz/falls.jpg"
      grid="3">
    </Puzzle>
  )
}

export default App
